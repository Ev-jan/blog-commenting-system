import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentFormComponent } from "./CommentForm.js";
export class CommentComponent {
    constructor(currentUser, avatar, timeStamp, text, id, votes, isAddedTofavourite, storedUser = currentUser, storedAvatar = avatar) {
        this.formIsHidden = false;
        this.id = Services.generateId();
        this.timeStamp = Services.getCurrentTimeStamp();
        this.text = "";
        this.votes = 0;
        this.isAddedTofavourite = false;
        this.currentUser = currentUser;
        this.avatar = avatar;
        if (timeStamp !== undefined) {
            this.timeStamp = timeStamp;
        }
        if (text !== undefined) {
            this.text = text;
        }
        if (id !== undefined) {
            this.id = id;
        }
        if (votes !== undefined) {
            this.votes = votes;
        }
        if (isAddedTofavourite !== undefined) {
            this.isAddedTofavourite = isAddedTofavourite;
        }
        if (storedUser !== undefined) {
            this.storedUser = storedUser;
        }
        if (storedAvatar !== undefined) {
            this.storedAvatar = storedAvatar;
        }
    }
    createComment(parentNode) {
        const commentNode = DOMHelpsters.createElement("li", [
            "thread__item",
            "thread-item_layout",
        ]);
        const content = `
      <div class="avatar">
        <img
          class="avatar-image"
          id="comment-avatar-image-${this.id}"
          src="${this.storedAvatar}"
          alt="Avatar"
        />
      </div>
      <div class="comment-info-container">
        <h4 class="username" id="comment-username-${this.id}">${this.storedUser}</h4>
        <time datetime="13:55 01-15" class="timestamp"
          >${this.timeStamp}</time
        >
      </div>
      <p class="comment-body">${this.text}
      </p>
      <div class="action-bar">
        <button class="btn-reply button-style-default o-text-18-op-4" id="btn-reply-${this.id}">
          <img
            class="button-icon"
            src="../public/assets/interface-images/icon-reply.svg"
            alt="reply"
          />
          Ответить
        </button>
        <button
          class="btn-favourite button-style-default o-text-18-op-4" id="btn-favourite-${this.id}"
          id="btn-fav"
        >
          <img
            class="button-icon"
            src="../public/assets/interface-images/icon-save-to-fave.svg"
            alt="add to favourite"
          />
          В избранное
        </button>
        <div class="comment-rating">
          <button
            class="btn-rating__icon_downvote button-style-default"
            id="downvote-${this.id}"
          >
            <img
              src="../public/assets/interface-images/icon-downvote.svg"
              alt="vote down"
            />
          </button>
          <div class="btn-rating__count o-text-18-op-4" id="btn-rating__count-${this.id}">${this.votes}</div>
          <button
            class="btn-rating__icon_upvote button-style-default"
            id="upvote-${this.id}"
          >
            <img
              src="../public/assets/interface-images/icon-upvote.svg"
              alt="vote up"
            />
          </button>
        </div>
      </div>
      <ul class="replies" id="replies-${this.id}">      
      </ul>
      `;
        parentNode.insertBefore(commentNode, parentNode.firstChild);
        DOMHelpsters.renderElement(commentNode, content);
    }
    updateComment() {
        // upvote / downvote comments
        const userAvatarNode = document.getElementById(`comment-avatar-image-${this.id}`);
        const userNameNode = document.getElementById(`comment-username-${this.id}`);
        const downVoteBtn = document.getElementById(`downvote-${this.id}`);
        const upVoteBtn = document.getElementById(`upvote-${this.id}`);
        const countNode = document.getElementById(`btn-rating__count-${this.id}`);
        const addToFavouriteBtn = document.getElementById(`btn-favourite-${this.id}`);
        if (downVoteBtn &&
            upVoteBtn &&
            countNode &&
            userNameNode &&
            userAvatarNode) {
            userAvatarNode.setAttribute("src", `${this.storedAvatar}`);
            userNameNode.innerText = `${this.storedUser}`;
            downVoteBtn.addEventListener("click", (event) => {
                this.countVotes("down", countNode);
            });
            upVoteBtn.addEventListener("click", (event) => {
                this.countVotes("up", countNode);
            });
        }
        else
            throw new Error("voting elements not found");
        // add to and remove from favourites
        this.addToFavourite(addToFavouriteBtn, this.isAddedTofavourite);
        // post replies
        const replyBtn = document.getElementById(`btn-reply-${this.id}`);
        const commentFormParentNode = document.getElementById(`replies-${this.id}`);
        if (replyBtn && commentFormParentNode) {
            const replyForm = new CommentFormComponent(this.id, this.currentUser, this.avatar);
            const toggleInput = (event) => {
                if (this.formIsHidden === false) {
                    replyForm.createCommentForm(commentFormParentNode, "reply");
                    const inputNode = DOMHelpsters.getElementOOClass(`comment-input-field-${this.id}`, "comment-form__input");
                    const textLenDisplayNode = DOMHelpsters.getElementOOClass(`input-char-count-message-${this.id}`, "input-char-count-message");
                    const overlimitMsgNode = DOMHelpsters.getElementOOClass(`overlimit-msg-${this.id}`, "char-overlimit-message");
                    const postButton = DOMHelpsters.getElementOOClass(`post-comment-btn-${this.id}`, "button-style-default o-text-18-op-4 submit-button");
                    const userAvatarNode = document.getElementById(`avatar-image-${this.id}`);
                    const userNameNode = document.getElementById(`username-${this.id}`);
                    // adding event listener to reply button to hide input field when clicking this button
                    postButton === null || postButton === void 0 ? void 0 : postButton.addEventListener("click", (event) => {
                        DOMHelpsters.deletElementById(`comment-form-${this.id}`);
                        this.formIsHidden = false;
                    });
                    replyForm.updateCommentForm(inputNode, textLenDisplayNode, overlimitMsgNode, postButton, commentFormParentNode, userAvatarNode, userNameNode, "reply", this.storedUser, this.storedAvatar);
                    this.formIsHidden = true;
                }
                else {
                    this.formIsHidden = false;
                    DOMHelpsters.deletElementById(`comment-form-${this.id}`); // changed ID here
                }
            };
            replyBtn.addEventListener("click", toggleInput, false);
            this.formIsHidden = false;
        }
    }
    countVotes(vote, countNode) {
        if (vote === "up") {
            this.votes++;
        }
        else if (vote === "down") {
            this.votes--;
        }
        if (this.votes < 0) {
            countNode.style.color = "rgba(255, 0, 0, 1)";
        }
        else if (this.votes > 0) {
            countNode.style.color = "rgba(138, 197, 64, 1)";
        }
        else {
            countNode.style.color = "rgba(0, 0, 0, 1)";
        }
        countNode.textContent = `${this.votes}`;
    }
    addToFavourite(addToFavouriteBtn, isAddedTofavourite) {
        if (addToFavouriteBtn) {
            addToFavouriteBtn.addEventListener("click", () => {
                if (isAddedTofavourite === false) {
                    addToFavouriteBtn.innerHTML = `<img class="button-icon"
                                        src="../public/assets/interface-images/icon-saved.svg"
                                        alt="add to favourite"
                                        />
                                        В избранном`;
                    isAddedTofavourite = true;
                }
                else {
                    addToFavouriteBtn.innerHTML = `<img class="button-icon"
                                        src="../public/assets/interface-images/icon-save-to-fave.svg"
                                        alt="add to favourite"
                                        />
                                        В избранное`;
                    isAddedTofavourite = false;
                }
            });
        }
        else
            throw new Error("addToFavouriteBtn not found");
    }
}
