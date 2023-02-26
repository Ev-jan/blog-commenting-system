import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentComponent } from "./Comment.js";
export class ReplyComponent extends CommentComponent {
    constructor(currentUser, avatar, timeStamp, text, id, votes, isAddedTofavourite, storedUser, storedAvatar) {
        super(currentUser, avatar, timeStamp, text, id, votes, isAddedTofavourite, storedUser, storedAvatar);
        // id: number = Services.generateId();
        // currentUser: string = "";
        // avatar: string = "";
        // timeStamp: string  = Services.getCurrentTimeStamp();
        // text: string  = "";
        // votes: number = 0;
        // isAddedTofavourite: boolean = false;
        // interlocutor: string = "";
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
        else
            this.storedUser = this.currentUser;
        if (storedAvatar !== undefined) {
            this.storedAvatar = storedAvatar;
        }
        else
            this.storedAvatar = this.avatar;
    }
    createReply(parentNode) {
        const commentNode = DOMHelpsters.createElement("li", [
            "reply",
            "thread-item_layout",
        ]);
        const content = `
        <div class="avatar">
          <img
            class="avatar-image"
            id="reply-avatar-${this.id}"
            src="${this.avatar}"
            alt="Avatar"
          />
        </div>
        <div class="comment-info-container">
          <h4 class="username" id="username-${this.id}">${this.currentUser}</h4>
          <div class="replied-user-info o-text-18-op-4">
            <img class="replied-user-info__icon" src="../public/assets/interface-images/icon-reply.svg" alt="Replied to">
            <div class="replied-user-info__text" id="replied-user-name-${this.id}">${this.storedUser}</div>
          </div>
          <time datetime="13:55 01-15" class="timestamp"
            >${this.timeStamp}</time
          >
        </div>
          <p class="comment-body">
          ${this.text}
          </p>
          <div class="action-bar">
            <button
              class="btn-favourite button-style-default o-text-18-op-4"
              id="btn-fav-${this.id}"
            >
              <img
                class="button-icon"
                src="../public/assets/interface-images/icon-save-to-fave.svg"
                alt="reply"
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
      `;
        parentNode.insertBefore(commentNode, parentNode.firstChild);
        DOMHelpsters.renderElement(commentNode, content);
    }
    updateReply() {
        const addToFavouriteBtn = document.getElementById(`btn-fav-${this.id}`);
        const downVoteBtn = document.getElementById(`downvote-${this.id}`);
        const upVoteBtn = document.getElementById(`upvote-${this.id}`);
        const countNode = document.getElementById(`btn-rating__count-${this.id}`);
        if (downVoteBtn && upVoteBtn && countNode) {
            downVoteBtn.addEventListener("click", () => {
                this.countVotes("down", countNode);
            });
            upVoteBtn.addEventListener("click", () => {
                this.countVotes("up", countNode);
            });
        }
        this.addToFavourite(addToFavouriteBtn, this.isAddedTofavourite);
    }
}
