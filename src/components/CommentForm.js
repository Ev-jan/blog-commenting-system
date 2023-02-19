import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentComponent } from "./Comment.js";
import { ReplyComponent } from "./Reply.js";
export class CommentFormComponent {
    constructor(author, id) {
        this.minTextLength = 1;
        this.maxTextLength = 1001;
        this.id = Services.generateId();
        this.text = "";
        this.avatar = "../public/assets/interface-images/icon-default-avatar.png";
        this.votes = 0;
        this.favourite = false;
        this.author = author;
        this.id = id;
        this.comment = new CommentComponent(this.author, this.text, this.avatar);
        this.reply = new ReplyComponent(this.author, this.text, this.avatar, this.comment.author);
    }
    createCommentForm(parentNode, commentType) {
        const commentFormNode = DOMHelpsters.createElement("div");
        const content = `<div class="comment-form comment-section__comment-form" id="comment-form-${this.id}">
    <div class="avatar comment-section__avatar">
      <img
        class="avatar-image"
        src="${this.avatar}"
        alt="Avatar"
      />
    </div>
    <div class="comment-info-container">
      <h4 class="username" id="comment-input-field-${this.id}">${this.author}</h4>
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
        else if (parentNode && commentType === "reply")
            parentNode.insertBefore(commentFormNode, parentNode.firstChild);
        DOMHelpsters.renderElement(commentFormNode, content);
    }
    updateCommentForm(inputFieldNode, textLenDisplayNode, overlimitMsgNode, postButton, commentParentNode, commentType) {
        let hasContent = false;
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
                    hasContent = true;
                    if (this.text.length > 1000) {
                        postButton.disabled = true;
                        overlimitMsgNode.textContent = "Слишком длинное сообщение";
                    }
                    else if (this.text.trim() === "") {
                        postButton.disabled = true;
                    }
                    else {
                        postButton.disabled = false;
                    }
                }
                else {
                    textLenDisplayNode.textContent = "Макс. 1000 символов";
                    overlimitMsgNode.textContent = "";
                    postButton.disabled = true;
                    hasContent = false;
                }
            });
            // logic of posting comments and replying to comments
            postButton.addEventListener("click", (event) => {
                event.preventDefault();
                if (hasContent && commentType === "comment") {
                    const newComment = new CommentComponent(this.author, this.text, this.avatar);
                    newComment.text = this.text;
                    newComment.timeStamp = Services.getCurrentTimeStamp();
                    newComment.createComment(commentParentNode);
                    newComment.updateComment();
                    hasContent = false;
                    postButton.disabled = true;
                }
                else if (hasContent && commentType === "reply") {
                    const newReply = new ReplyComponent(this.author, this.text, this.avatar, this.comment.author);
                    newReply.text = this.text;
                    newReply.timeStamp = Services.getCurrentTimeStamp();
                    newReply.createReply(commentParentNode);
                    newReply.updateReply();
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
/*const resultNode = document.querySelector('.container-show-result');
const btnNode = document.querySelector('.btn-show-result');
let userInput = document.querySelectorAll('.input');
let userValues = [];

userInput.forEach(item => {
    item.addEventListener('input', event => {
        getUserValue();
        processUserValues();
    })
})

function processUserValues(a = userValues) {
    if (a.some((value) => { return value < 100 || value > 300; })) {
        document.querySelector('.container-show-result').innerHTML = `One of the numbers is out of range from 100 to 300. <br> Enter a valid number`;
        btnNode.style.display = 'none';
    }
    else {
        document.querySelector('.container-show-result').innerHTML = `Press Get`;
        btnNode.style.display = 'flex';
    }
};

function getUserValue() {
    userValues = [+userInput[0].value, +userInput[1].value];
    return userValues;
};

function displayResult(data) {
    let url = URL.createObjectURL(data);
    let image = `
    <img
    src="${url}";
    class="image"/>`;
    resultNode.innerHTML = image;
}

btnNode.addEventListener('click', () => {
    fetch(`https://picsum.photos/${userValues[0]}/${userValues[1]}`)
        .then((response) => {
            const result = response.blob();
            return result;
        })
        .then((data) => {
            displayResult(data);
        })
        .catch(() => { console.log('error') });
});*/
