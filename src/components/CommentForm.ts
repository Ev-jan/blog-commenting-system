import { ICommentForm } from "../interfaces/Interfaces.js";
import { Services } from "../services/services.js";

export class CommentFormComponent implements ICommentForm {
  author: string;
  message: string;
  private inputFieldNode = document.getElementById(
    "comment-input-field"
  ) as HTMLTextAreaElement;
  private postCommentBtn: HTMLElement | null = document.getElementById(
    "post-comment-btn"
  ) as HTMLButtonElement;
  private textLenDisplayNode: HTMLElement | null = document.querySelector(
    ".input-char-count-message"
  ) as HTMLParagraphElement;
  private userNameNode: HTMLElement | null = document.getElementById(
    "comment-form-username"
  ) as HTMLHeadingElement;
  private overlimitMsgNode: HTMLElement | null =
    document.getElementById("overlimit-msg");

  constructor(author: string, message: string) {
    this.author = author;
    this.message = message;
  }

  // defining functionality:
  getInput() {} // get user's message

  validateInput() {} // make sure that: 1. input is string, (2) not an empty string (3) shorter or equal to 1k characters
  private countInputCharacters() {} // counts characters in textarea and shows how many are available
  // if number of characters is less than 1k - return current number of characters otherwise return false

  private showOverLimitMessage() {} // shows error message on overlimit

  public postComment() {} // should it belong here or with comment class? must be here

  private putTimeStamp() {} // take this date and show it in a specific HTML element

  // creating and displaying UI components

  public displayCommentForm(parentNode: HTMLElement): void {
    const commentFormNode: HTMLDivElement = document.createElement("div");
    const content: string = `<div class="comment-form comment-section__comment-form">
    <div class="avatar comment-section__avatar">
      <img
        class="avatar-image"
        src="../public/assets/content-images/samsung-memory-hjRC0i0oJxg-unsplash 1avatar-pic.png"
        alt="Avatar"
      />
    </div>
    <div class="comment-info-container">
      <h4 class="username" id="comment-form-username">${this.author}</h4>
      <p class="input-char-count-message" id="">Макс. 1000 символов</p>
    </div>
    <p class="char-overlimit-message" id="overlimit-msg">Слишком длинное сообщение</p>
    <form action="" class="comment-form" id="comment-form">
      <textarea
        name="new-comment"
        maxlength="1000"
        minlength="1"
        class="comment-form__input"
        id="comment-input-field"
        form="comment-form"
        placeholder="Введите текст сообщения..."
      ></textarea>
    </form>
    <button
      type="submit"
      class="button-style-default o-text-18-op-4 submit-button"
      id="post-comment-btn"
      form="comment-form"
    >
      Отправить
    </button>
  </div>
`;
    parentNode.appendChild(commentFormNode);
    Services.render(commentFormNode, content);
  }
  public autoResizeInputfield(): void {
    this.inputFieldNode.addEventListener(
      "input",
      () => {
        this.inputFieldNode.style.height = "auto";
        this.inputFieldNode.style.height =
          this.inputFieldNode.scrollHeight + "px";
      },
      false
    );
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
