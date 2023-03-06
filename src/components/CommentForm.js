import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentComponent } from "./Comment.js";
import { ReplyComponent } from "./Reply.js";
import { CommentThread } from "../services/CommentThread.js";
export class CommentFormComponent {
    constructor(id, currentUserName, avatar, text) {
        this.minTextLength = 1;
        this.maxTextLength = 1001;
        this.currentUserName = "";
        this.avatar = "../public/assets/interface-images/icon-default-avatar.png";
        this.text = "";
        this.id = id;
        this.comment = null;
        this.reply = null;
        if (currentUserName !== undefined) {
            this.currentUserName = currentUserName;
        }
        if (text !== undefined) {
            this.text = text;
        }
        if (avatar !== undefined) {
            this.avatar = avatar;
        }
    }
    createCommentForm(parentNode, commentType) {
        const commentFormNode = DOMHelpsters.createElement("div");
        commentFormNode.id = `comment-form-${this.id}`;
        const content = `<div class="comment-form comment-section__comment-form" id="comment-form-${this.id}">
    <div class="avatar comment-section__avatar">
      <img
        class="avatar-image"
        id="avatar-image-${this.id}"
        src="${this.avatar}"
        alt="Avatar"
      />
    </div>
    <div class="comment-info-container">
      <h4 class="username" id="username-${this.id}">${this.currentUserName}</h4>
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
        }
        else if (parentNode && commentType === "reply") {
            parentNode.insertBefore(commentFormNode, parentNode.firstChild);
            DOMHelpsters.renderElement(commentFormNode, content);
        }
    }
    updateCommentForm(inputFieldNode, textLenDisplayNode, overlimitMsgNode, postButton, commentParentNode, userAvatarNode, userNameNode, commentType, userFromStorage, avatarFromStorage) {
        let hasContent = false;
        // display current user's name and avatar on the input form
        if (userAvatarNode && userNameNode) {
            userAvatarNode.setAttribute("src", `${this.avatar}`);
            userNameNode.innerText = `${this.currentUserName}`;
        }
        if (inputFieldNode &&
            overlimitMsgNode &&
            textLenDisplayNode &&
            postButton &&
            commentParentNode) {
            postButton.disabled = true;
            inputFieldNode.addEventListener("input", (event) => {
                if (!!Services.getInputValue(event)) {
                    this.text = Services.getInputValue(event);
                    textLenDisplayNode.textContent = `${this.text.length.toString()}/1000`;
                    overlimitMsgNode.textContent = "";
                    textLenDisplayNode.style.color = "rgba(0, 0, 0)";
                    textLenDisplayNode.style.opacity = "0.4";
                    hasContent = true;
                    if (this.text.length > 1000) {
                        postButton.disabled = true;
                        overlimitMsgNode.textContent = "Слишком длинное сообщение";
                        textLenDisplayNode.style.color = "rgba(255, 0, 0, 1)";
                        textLenDisplayNode.style.opacity = "1";
                    }
                    else if (this.text.trim() === "") {
                        postButton.disabled = true;
                    }
                    else {
                        postButton.disabled = false;
                    }
                }
                else {
                    textLenDisplayNode.style.color = "rgba(0, 0, 0)";
                    textLenDisplayNode.style.opacity = "0.4";
                    textLenDisplayNode.textContent = "Макс. 1000 символов";
                    overlimitMsgNode.textContent = "";
                    postButton.disabled = true;
                    hasContent = false;
                }
            });
            // Post comments and replies
            postButton.addEventListener("click", (event) => {
                event.preventDefault();
                if (hasContent && commentType === "comment") {
                    let id = Services.generateId();
                    let timeStamp = Services.getCurrentTimeStamp("timestamp");
                    let date = Services.getCurrentTimeStamp("date");
                    let votes = 0;
                    let isAddedTofavourite = false;
                    let replyCount = 0;
                    this.comment = new CommentComponent(this.currentUserName, this.avatar, timeStamp, date, this.text, id, votes, isAddedTofavourite, replyCount);
                    this.comment.createComment(commentParentNode);
                    const storedComment = new CommentThread();
                    storedComment.storeMessage(this.comment.id, this.comment.currentUserName, this.comment.avatar, this.comment.timeStamp, this.comment.date, this.comment.text, this.comment.votes, this.comment.isAddedTofavourite, this.comment.replyCount);
                    this.comment.updateComment();
                    hasContent = false;
                    postButton.disabled = true;
                }
                else if (hasContent && commentType === "reply") {
                    let id = Services.generateId();
                    let timeStamp = Services.getCurrentTimeStamp("timestamp");
                    let date = Services.getCurrentTimeStamp("date");
                    let votes = 0;
                    let isAddedTofavourite = false;
                    this.reply = new ReplyComponent(this.currentUserName, this.avatar, timeStamp, date, this.text, id, votes, isAddedTofavourite, userFromStorage);
                    this.reply.createReply(commentParentNode);
                    // store new reply in localStorage
                    const storedReply = new CommentThread();
                    storedReply.storeMessage(this.reply.id, userFromStorage, avatarFromStorage, this.reply.timeStamp, this.reply.date, this.reply.text, this.reply.votes, this.reply.isAddedTofavourite, NaN, this.reply.currentUserName, this.reply.avatar, this.id);
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
    autoResizeInputfield(inputFieldNode) {
        if (inputFieldNode) {
            let offset = inputFieldNode.offsetHeight - inputFieldNode.clientHeight;
            inputFieldNode.addEventListener("input", (event) => {
                inputFieldNode.style.height = "auto";
                inputFieldNode.style.height =
                    inputFieldNode.scrollHeight + offset + "px";
                if (!Services.getInputValue(event)) {
                    inputFieldNode.style.height = "61px";
                }
            }, false);
        }
    }
}
