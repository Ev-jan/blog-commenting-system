import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentComponent } from "./Comment.js";
export class ReplyComponent extends CommentComponent {
    constructor(currentUserName, avatar, timeStamp, date, text, id, votes, isAddedTofavourite, storedUser, storedAvatar) {
        super(currentUserName, avatar, timeStamp, date, text, id, votes, isAddedTofavourite, 0, storedUser, storedAvatar);
        this.renderedReply = null;
        this.currentUserName = currentUserName;
        this.avatar = avatar;
        this.timeStamp = timeStamp;
        this.date = date;
        this.text = text;
        this.id = id;
        this.votes = votes;
        this.isAddedTofavourite = isAddedTofavourite;
        if (storedUser !== undefined) {
            this.storedUser = storedUser;
        }
        else
            this.storedUser = this.currentUserName;
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
        commentNode.setAttribute("data-reply-id", `${this.id}`);
        commentNode.setAttribute("data-reply-date", `${this.date}`);
        commentNode.setAttribute("data-reply-fav", `${this.isAddedTofavourite}`);
        commentNode.setAttribute("data-reply-votes", `${this.votes}`);
        commentNode.id = `reply-id-${this.id}`;
        const content = `
        <div class="avatar">
          <img
            class="avatar-image"
            id="reply-avatar-${this.id}"
            src="${this.avatar}"
            alt="Avatar"
          />
        </div>
        <div class="reply-info-container">
          <h4 class="username reply-username" id="username-${this.id}">${this.currentUserName}</h4>
          <div class="replied-user-info o-text-18-op-4">
            <img class="replied-user-info__icon" src="../public/assets/interface-images/icon-reply.svg" alt="Replied to">
            <div class="replied-user-info__text" id="replied-user-name-${this.id}">${this.storedUser}</div>
          </div>
          <time datetime="13:55 01-15" class="timestamp reply-timestamp"
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
        this.renderedReply = document.getElementById(`reply-id-${this.id}`);
        this.addToFavouriteBtn = document.getElementById(`btn-fav-${this.id}`);
        this.downVoteBtn = document.getElementById(`downvote-${this.id}`);
        this.upVoteBtn = document.getElementById(`upvote-${this.id}`);
        this.countNode = document.getElementById(`btn-rating__count-${this.id}`);
        if (this.downVoteBtn && this.upVoteBtn && this.countNode) {
            this.downVoteBtn.addEventListener("click", () => {
                var _a;
                this.countVotes("down");
                (_a = this.renderedReply) === null || _a === void 0 ? void 0 : _a.setAttribute("data-reply-votes", `${this.votes}`);
            });
            this.upVoteBtn.addEventListener("click", () => {
                var _a;
                this.countVotes("up");
                (_a = this.renderedReply) === null || _a === void 0 ? void 0 : _a.setAttribute("data-reply-votes", `${this.votes}`);
            });
        }
        this.btnFaveToggle();
        this.addToFavourite();
        this.countVoteColorToggle();
    }
    addToFavourite() {
        if (this.addToFavouriteBtn) {
            this.addToFavouriteBtn.addEventListener("click", () => {
                if (this.isAddedTofavourite === false) {
                    this.renderedReply.setAttribute("data-reply-fav", `${this.isAddedTofavourite}`);
                    this.isAddedTofavourite = true;
                    this.btnFaveToggle();
                    this.commentThread.updateStoredData(this.id, "addedTofavourite", this.isAddedTofavourite);
                }
                else {
                    this.renderedReply.setAttribute("data-reply-fav", `${this.isAddedTofavourite}`);
                    this.isAddedTofavourite = false;
                    this.btnFaveToggle();
                    this.commentThread.updateStoredData(this.id, "addedTofavourite", this.isAddedTofavourite);
                }
            });
        }
        else
            throw new Error("addToFavouriteBtn not found");
    }
}
