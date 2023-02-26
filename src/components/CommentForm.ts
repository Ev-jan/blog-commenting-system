// import { IComment, ICommentForm, IReply } from "../interfaces/Interfaces.js";
import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentComponent } from "./Comment.js";
import { ReplyComponent } from "./Reply.js";
import { CommentThread } from "../services/CommentThread.js";

export class CommentFormComponent {
  private minTextLength: number = 1;
  private maxTextLength: number = 1001;
  id: number;
  currentUser: string = "";
  avatar: string = "../public/assets/interface-images/icon-default-avatar.png";
  text: string = "";
  comment: CommentComponent;
  reply: ReplyComponent;

  constructor(id: number, currentUser?: string, avatar?: string, text?: string) {
    this.id = id;
    if (currentUser !== undefined) {
      this.currentUser = currentUser;
    }
    if (text !== undefined) {
      this.text = text;
    }
    if (avatar !== undefined) {
      this.avatar = avatar;
    }
    this.comment = new CommentComponent(this.currentUser, this.avatar);
    this.reply = new ReplyComponent(this.currentUser, this.avatar);
  }

  public createCommentForm(
    parentNode: HTMLElement | null,
    commentType: string
  ): void {
    const commentFormNode: HTMLElement = DOMHelpsters.createElement("div");
    const content: string = `<div class="comment-form comment-section__comment-form" id="comment-form-${this.id}">
    <div class="avatar comment-section__avatar">
      <img
        class="avatar-image"
        id="avatar-image-${this.id}"
        src="${this.avatar}"
        alt="Avatar"
      />
    </div>
    <div class="comment-info-container">
      <h4 class="username" id="username-${this.id}">${this.currentUser}</h4>
      <p class="input-char-count-message" id="input-char-count-message-${this.id}">Макс. 1000 символов</p>
    </div>
    <p class="char-overlimit-message" id="overlimit-msg-${this.id}"></p>
    <form action="" class="comment-form" id="comment-form-${this.id}">
      <textarea
        name="new-comment"
        maxlength="${this.maxTextLength}"
        minlength="${this.minTextLength}"
        class="comment-form__input"
        id="comment-input-field-${this.id}"
        form="comment-form"
        placeholder="Введите текст сообщения..."
      ></textarea>
    </form>
    <button
      type="submit"
      class="button-style-default o-text-18-op-4 submit-button"
      id="post-comment-btn-${this.id}"
      form="comment-form"
    >
      Отправить
    </button>
  </div>
`;
    if (parentNode && commentType === "comment") {
      parentNode.insertBefore(commentFormNode, parentNode.children[2]);
      DOMHelpsters.renderElement(commentFormNode, content);
    } else if (parentNode && commentType === "reply")
      parentNode.insertBefore(commentFormNode, parentNode.firstChild);
    DOMHelpsters.renderElement(commentFormNode, content);
  }

  public updateCommentForm(
    inputFieldNode: HTMLTextAreaElement | null | undefined,
    textLenDisplayNode: HTMLElement | null | undefined,
    overlimitMsgNode: HTMLElement | null | undefined,
    postButton: HTMLButtonElement | null,
    commentParentNode: HTMLElement | null,
    userAvatarNode: HTMLElement | null,
    userNameNode: HTMLElement | null,
    commentType: string,
    userFromStorage?: string,
    avatarFromStorage?: string
  ) {
    let hasContent = false;

// display current user's name and avatar on the input form

    if (userAvatarNode && userNameNode) {
      // this.currentUser = username;
      // this.avatar = avatar;
      userAvatarNode.setAttribute("src", `${this.avatar}`);
      userNameNode.innerText = `${this.currentUser}`;
    }
    if (
      inputFieldNode &&
      overlimitMsgNode &&
      textLenDisplayNode &&
      postButton &&
      commentParentNode
    ) {
      postButton.disabled = true;
      inputFieldNode.addEventListener("input", (event: Event) => {
        if (!!Services.getInputValue(event)) {
          this.text = Services.getInputValue(event) as string;
          textLenDisplayNode.textContent = `${this.text.length.toString()}/1000`;
          overlimitMsgNode.textContent = "";
          hasContent = true;
          if (this.text.length > 1000) {
            postButton.disabled = true;
            overlimitMsgNode.textContent = "Слишком длинное сообщение";
          } else if (this.text.trim() === "") {
            postButton.disabled = true;
          } else {
            postButton.disabled = false;
          }
        } else {
          textLenDisplayNode.textContent = "Макс. 1000 символов";
          overlimitMsgNode.textContent = "";
          postButton.disabled = true;
          hasContent = false;
        }
      });

      // Post comments and replies

      postButton.addEventListener("click", (event: Event) => {
        event.preventDefault();
        if (hasContent && commentType === "comment") {
          this.comment.id = Services.generateId();
          this.comment.timeStamp = Services.getCurrentTimeStamp();
          this.comment.currentUser = this.currentUser;
          this.comment.avatar = this.avatar;
          this.comment.text = this.text;
          this.comment.createComment(commentParentNode);
          const storedComment = new CommentThread();
          storedComment.storeMessage(
            this.comment.id,
            this.comment.currentUser,
            this.comment.avatar,
            this.comment.timeStamp,
            this.comment.text,
            this.comment.votes,
            this.comment.isAddedTofavourite,
          );
          this.comment.updateComment();
          hasContent = false;
          postButton.disabled = true;
        } else if (hasContent && commentType === "reply") {
          this.reply.id = Services.generateId();
          this.reply.timeStamp = Services.getCurrentTimeStamp();
          this.reply.currentUser = this.currentUser;
          this.reply.avatar = this.avatar;
          this.reply.text = this.text;

          // store new reply in localStorage
          const storedReply = new CommentThread();
          storedReply.storeMessage(
            this.reply.id,
            userFromStorage as string,
            avatarFromStorage as string,
            this.reply.timeStamp,
            this.reply.text,
            this.reply.votes,
            this.reply.isAddedTofavourite,
            this.reply.currentUser,
            this.reply.avatar,
            this.id
          );
          this.reply.createReply(commentParentNode);

          this.reply.updateReply();
          hasContent = false;
          postButton.disabled = true;
        }
        inputFieldNode.value = "";
        inputFieldNode.style.height = "61px";
        textLenDisplayNode.textContent = "Макс. 1000 символов";
      });
    }
    this.autoResizeInputfield(inputFieldNode);
  }

  private autoResizeInputfield(
    inputFieldNode: HTMLTextAreaElement | null | undefined
  ): void {
    if (inputFieldNode) {
      let offset = inputFieldNode.offsetHeight - inputFieldNode.clientHeight;
      inputFieldNode.addEventListener(
        "input",
        (event: Event) => {
          inputFieldNode.style.height = "auto";
          inputFieldNode.style.height =
            inputFieldNode.scrollHeight + offset + "px";
          if (!Services.getInputValue(event)) {
            inputFieldNode.style.height = "61px";
          }
        },
        false
      );
    }
  }
}
