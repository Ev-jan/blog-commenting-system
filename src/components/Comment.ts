import { IComment, ICommentForm } from "../interfaces/Interfaces.js";
import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentFormComponent } from "./CommentForm.js";

export class CommentComponent implements IComment {
  id: number = Services.generateId();
  text: string | null;
  author: string;
  timeStamp: string = Services.getCurrentTimeStamp();
  avatar: string;
  votes: number = 0;
  isAddedTofavourite: boolean = false;
  formIsHidden: boolean = false;

  constructor(author: string, text: string | null, avatar: string) {
    this.author = author;
    this.text = text;
    this.avatar = avatar;
  }

  public createComment(parentNode: HTMLElement): void {
    const commentNode: HTMLElement = DOMHelpsters.createElement("li", [
      "thread__item",
      "thread-item_layout",
    ]);

    const content: string = `
      <div class="avatar">
        <img
          class="avatar-image"
          src="${this.avatar}"
          alt="Avatar"
        />
      </div>
      <div class="comment-info-container">
        <h4 class="username">${this.author}</h4>
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

  public updateComment() {
    // upvoting/downvoting comments

    const downVoteBtn = document.getElementById(
      `downvote-${this.id}`
    ) as HTMLButtonElement;
    const upVoteBtn = document.getElementById(
      `upvote-${this.id}`
    ) as HTMLButtonElement;
    const countNode = document.getElementById(
      `btn-rating__count-${this.id}`
    ) as HTMLDivElement;
    const addToFavouriteBtn = document.getElementById(
      `btn-favourite-${this.id}`
    ) as HTMLButtonElement;

    if (downVoteBtn && upVoteBtn && countNode) {
      downVoteBtn.addEventListener("click", (event: Event) => {
        this.countVotes("down", countNode);
      });
      upVoteBtn.addEventListener("click", (event: Event) => {
        this.countVotes("up", countNode);
      });
    } else throw new Error("voting elements not found");

    // adding to /removing from favourites

    this.addToFavourite(addToFavouriteBtn, this.isAddedTofavourite);

    // posting replies

    const replyBtn = document.getElementById(
      `btn-reply-${this.id}`
    ) as HTMLButtonElement | null;
    const commentFormParentNode = document.getElementById(`replies-${this.id}`);
    if (replyBtn && commentFormParentNode) {
      const replyForm = new CommentFormComponent(this.author, this.id);
      const toggleInput = (event: Event) => {
        if (this.formIsHidden === false) {
          replyForm.createCommentForm(commentFormParentNode, "reply");
          const inputNode = DOMHelpsters.getElementOOClass(
            `comment-input-field-${this.id}`,
            "comment-form__input"
          ) as HTMLTextAreaElement;
          const textLenDisplayNode = DOMHelpsters.getElementOOClass(
            `input-char-count-message-${this.id}`,
            "input-char-count-message"
          );
          const overlimitMsgNode = DOMHelpsters.getElementOOClass(
            `overlimit-msg-${this.id}`,
            "char-overlimit-message"
          );
          const postButton = DOMHelpsters.getElementOOClass(
            `post-comment-btn-${this.id}`,
            "button-style-default o-text-18-op-4 submit-button"
          ) as HTMLButtonElement | null;

          // adding event listener to reply button to hide input field when clicking this button

          postButton?.addEventListener("click", (event: Event) => {
            DOMHelpsters.deletElementById(`comment-form-${this.id}`);
            this.formIsHidden = false;
          });

          replyForm.updateCommentForm(
            inputNode,
            textLenDisplayNode,
            overlimitMsgNode,
            postButton,
            commentFormParentNode,
            "reply"
          );

          this.formIsHidden = true;
        } else {
          this.formIsHidden = false;
          DOMHelpsters.deletElementById(`comment-form-${this.id}`);
        }
      };
      replyBtn.addEventListener("click", toggleInput, false);
      this.formIsHidden = false;
    }
  }

  public countVotes(vote: "up" | "down", countNode: HTMLDivElement): void {
    if (vote === "up") {
      this.votes++;
    } else if (vote === "down") {
      this.votes--;
    }
    if (this.votes < 0) {
      countNode.style.color = "rgba(255, 0, 0, 1)";
    } else if (this.votes > 0) {
      countNode.style.color = "rgba(138, 197, 64, 1)";
    } else {
      countNode.style.color = "rgba(0, 0, 0, 1)";
    }
    countNode.textContent = `${this.votes}`;
  }

  public addToFavourite(addToFavouriteBtn: HTMLButtonElement, isAddedTofavourite: boolean) {
    if (addToFavouriteBtn) {
      addToFavouriteBtn.addEventListener("click", () => {
        if (isAddedTofavourite === false) {
          addToFavouriteBtn.innerHTML = `<img class="button-icon"
                                        src="../public/assets/interface-images/icon-saved.svg"
                                        alt="add to favourite"
                                        />
                                        В избранном`;
          isAddedTofavourite = true;
        } else {
          addToFavouriteBtn.innerHTML = `<img class="button-icon"
                                        src="../public/assets/interface-images/icon-save-to-fave.svg"
                                        alt="add to favourite"
                                        />
                                        В избранное`;
          isAddedTofavourite = false;
        }
      });
    } else throw new Error("addToFavouriteBtn not found");
  }
}
