import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentFormComponent } from "./CommentForm.js";
import { CommentThread } from "../services/CommentThread.js";
export class CommentComponent {
    constructor(currentUserName, avatar, timeStamp, date, text, id, votes, isAddedTofavourite, replyCount, storedUser = currentUserName, storedAvatar = avatar) {
        // variables to handle data flow
        this.formIsHidden = false;
        this.commentThread = new CommentThread();
        this.replyCount = 0;
        // variables to access DOM elements
        this.commentUserNameNode = null;
        this.commentUserAvatarNode = null;
        this.downVoteBtn = null;
        this.upVoteBtn = null;
        this.countNode = null;
        this.addToFavouriteBtn = null;
        this.replyBtn = null;
        this.commentFormParentNode = null;
        this.replyForm = null;
        this.textLenDisplayNode = null;
        this.inputNode = null;
        this.overlimitMsgNode = null;
        this.postButton = null;
        this.formUserAvatarNode = null;
        this.formUserNameNode = null;
        this.renderedComment = null;
        this.replyListNode = null;
        this.currentUserName = currentUserName;
        this.avatar = avatar;
        this.timeStamp = timeStamp;
        this.text = text;
        this.id = id;
        this.votes = votes;
        this.isAddedTofavourite = isAddedTofavourite;
        this.storedUser = storedUser;
        this.replyCount = replyCount;
        this.storedAvatar = storedAvatar;
        this.date = date;
    }
    createComment(parentNode) {
        const commentNode = DOMHelpsters.createElement("li", [
            "thread__item",
            "thread-item_layout",
        ]);
        commentNode.setAttribute("data-comment-id", `${this.id}`);
        commentNode.setAttribute("data-comment-date", `${this.date}`);
        commentNode.setAttribute("data-comment-fav", `${this.isAddedTofavourite}`);
        commentNode.setAttribute("data-comment-votes", `${this.votes}`);
        commentNode.setAttribute("data-comment-replycount", `${this.replyCount}`);
        commentNode.id = `comment-id-${this.id}`;
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
          class="btn-favourite btn-favourite__reply button-style-default o-text-18-op-4" id="btn-favourite-${this.id}"
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
        this.commentUserAvatarNode = document.getElementById(`comment-avatar-image-${this.id}`);
        this.commentUserNameNode = document.getElementById(`comment-username-${this.id}`);
        this.downVoteBtn = document.getElementById(`downvote-${this.id}`);
        this.upVoteBtn = document.getElementById(`upvote-${this.id}`);
        this.countNode = document.getElementById(`btn-rating__count-${this.id}`);
        this.addToFavouriteBtn = document.getElementById(`btn-favourite-${this.id}`);
        this.renderedComment = document.getElementById(`comment-id-${this.id}`);
        // upvote and downvote comments
        if (this.downVoteBtn &&
            this.upVoteBtn &&
            this.countNode &&
            this.commentUserNameNode &&
            this.commentUserAvatarNode) {
            this.commentUserAvatarNode.setAttribute("src", `${this.storedAvatar}`);
            this.commentUserNameNode.innerText = `${this.storedUser}`;
            this.downVoteBtn.addEventListener("click", (event) => {
                var _a;
                this.countVotes("down");
                (_a = this.renderedComment) === null || _a === void 0 ? void 0 : _a.setAttribute("data-comment-votes", `${this.votes}`);
            });
            this.upVoteBtn.addEventListener("click", (event) => {
                var _a;
                this.countVotes("up");
                (_a = this.renderedComment) === null || _a === void 0 ? void 0 : _a.setAttribute("data-comment-votes", `${this.votes}`);
            });
        }
        else
            throw new Error("voting elements not found");
        // add to and remove from favourites
        this.addToFavourite();
        this.btnFaveToggle();
        this.countVoteColorToggle();
        // post replies
        this.replyBtn = document.getElementById(`btn-reply-${this.id}`);
        this.commentFormParentNode = document.getElementById(`replies-${this.id}`);
        if (this.replyBtn && this.commentFormParentNode) {
            this.replyForm = new CommentFormComponent(this.id, this.currentUserName, this.avatar);
            const toggleInput = (event) => {
                var _a;
                if (this.formIsHidden === false) {
                    this.replyForm.createCommentForm(this.commentFormParentNode, "reply");
                    this.inputNode = DOMHelpsters.getElementOOClass(`comment-input-field-${this.id}`, "comment-form__input");
                    this.textLenDisplayNode = DOMHelpsters.getElementOOClass(`input-char-count-message-${this.id}`, "input-char-count-message");
                    this.overlimitMsgNode = DOMHelpsters.getElementOOClass(`overlimit-msg-${this.id}`, "char-overlimit-message");
                    this.postButton = DOMHelpsters.getElementOOClass(`post-comment-btn-${this.id}`, "button-style-default o-text-18-op-4 submit-button");
                    this.formUserAvatarNode = document.getElementById(`avatar-image-${this.id}`);
                    this.formUserNameNode = document.getElementById(`username-${this.id}`);
                    // add event listener to reply button to hide input field when clicking the button
                    (_a = this.postButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
                        DOMHelpsters.deletElementById(`comment-form-${this.id}`);
                        this.formIsHidden = false;
                    });
                    // pass data to updateCommentForm to create new reply
                    this.replyForm.updateCommentForm(this.inputNode, this.textLenDisplayNode, this.overlimitMsgNode, this.postButton, this.commentFormParentNode, this.formUserAvatarNode, this.formUserNameNode, "reply", this.storedUser, this.storedAvatar);
                    this.formIsHidden = true;
                }
                else {
                    this.formIsHidden = false;
                    DOMHelpsters.deletElementById(`comment-form-${this.id}`);
                }
            };
            this.replyBtn.addEventListener("click", toggleInput, false);
            this.formIsHidden = false;
        }
        // keep track of new replies, store their qty for sorting purposes
        this.replyListNode = document.getElementById(`replies-${this.id}`);
        if (this.replyListNode) {
            const observer = new MutationObserver((mutationsList) => {
                var _a;
                for (const mutation of mutationsList) {
                    if (mutation.type === "childList" &&
                        mutation.addedNodes.length > 0) {
                        for (const addedNode of mutation.addedNodes) {
                            if (addedNode instanceof HTMLLIElement &&
                                addedNode.classList.contains("reply")) {
                                this.replyCount = this.replyListNode.children.length;
                                (_a = this.renderedComment) === null || _a === void 0 ? void 0 : _a.setAttribute("data-comment-replycount", `${this.replyCount}`);
                                this.commentThread.updateStoredData(this.id, "replyCount", this.replyCount);
                            }
                        }
                    }
                }
            });
            observer.observe(this.replyListNode, { childList: true });
        }
        else {
            throw new Error("replyListNode not found");
        }
    }
    countVotes(vote) {
        if (vote === "up") {
            this.downVoteBtn.disabled = false;
            this.votes++;
            this.upVoteBtn.disabled = true;
            this.commentThread.updateStoredData(this.id, "votes", this.votes);
        }
        else if (vote === "down") {
            this.upVoteBtn.disabled = false;
            this.votes--;
            this.downVoteBtn.disabled = true;
            this.commentThread.updateStoredData(this.id, "votes", this.votes);
        }
        this.countVoteColorToggle();
    }
    countVoteColorToggle() {
        if (this.votes < 0) {
            this.countNode.style.color = "rgba(255, 0, 0, 1)";
        }
        else if (this.votes > 0) {
            this.countNode.style.color = "rgba(138, 197, 64, 1)";
        }
        else {
            this.countNode.style.color = "rgba(0, 0, 0, .4)";
            this.upVoteBtn.disabled = false;
            this.downVoteBtn.disabled = false;
        }
        this.countNode.textContent = `${this.votes}`;
    }
    btnFaveToggle() {
        if (this.isAddedTofavourite === true) {
            this.addToFavouriteBtn.innerHTML = `<img class="button-icon"
      src="../public/assets/interface-images/icon-saved.svg"
      alt="add to favourite"
      />
      В избранном`;
        }
        else if (this.isAddedTofavourite === false) {
            this.addToFavouriteBtn.innerHTML = `<img class="button-icon"
      src="../public/assets/interface-images/icon-save-to-fave.svg"
      alt="add to favourite"
      />
      В избранное`;
        }
    }
    addToFavourite() {
        if (this.addToFavouriteBtn) {
            this.addToFavouriteBtn.addEventListener("click", () => {
                if (this.isAddedTofavourite === false) {
                    this.isAddedTofavourite = true;
                    this.commentThread.updateStoredData(this.id, "addedTofavourite", this.isAddedTofavourite);
                    this.renderedComment.setAttribute("data-comment-fav", `${this.isAddedTofavourite}`);
                    this.btnFaveToggle();
                }
                else {
                    this.isAddedTofavourite = false;
                    this.commentThread.updateStoredData(this.id, "addedTofavourite", this.isAddedTofavourite);
                    this.renderedComment.setAttribute("data-comment-fav", `${this.isAddedTofavourite}`);
                    this.btnFaveToggle();
                }
            });
        }
        else
            throw new Error("addToFavouriteBtn not found");
    }
}
