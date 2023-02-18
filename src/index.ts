import { CommentFormComponent } from "../src/components/CommentForm.js";
import { CommentComponent } from "../src/components/Comment.js";
import { Services } from "../src/services/services.js";
import { ICommentForm } from "../src/interfaces/Interfaces.js";
import { IComment } from "../src/interfaces/Interfaces.js";
import { IUser } from "../src/interfaces/Interfaces.js";
import { DOMHelpsters } from "./services/DOMHelpsters.js";

const commentSectionNode: HTMLElement | null =
  document.querySelector(".comment-section");
const commentThreadNode: HTMLUListElement | null =
  document.querySelector(".comment-thread");
const replyThreadNode: HTMLUListElement | null =
  document.querySelector(".reply");
const replyThreadItemNode: HTMLLIElement | null | undefined =
  replyThreadNode?.querySelector(".reply:first-child");

window.addEventListener("load", () => {
  if (commentSectionNode && commentThreadNode) {
    const id: number = Services.generateId();
    const author: string = "crapy koko";
    const commentForm = new CommentFormComponent(author, id);
    commentForm.createCommentForm(commentSectionNode, "comment");
    if (commentForm) {
      const inputNode = DOMHelpsters.getElementOOClass(
        `comment-input-field-${id}`,
        "comment-form__input"
      ) as HTMLTextAreaElement;
      const textLenDisplayNode = DOMHelpsters.getElementOOClass(
        `input-char-count-message-${id}`,
        "input-char-count-message"
      );
      const overlimitMsgNode = DOMHelpsters.getElementOOClass(
        `overlimit-msg-${id}`,
        "char-overlimit-message"
      );
      const postButton = DOMHelpsters.getElementOOClass(
        `post-comment-btn-${id}`,
        "button-style-default o-text-18-op-4 submit-button"
      ) as HTMLButtonElement | null;

      commentForm.updateCommentForm(
        inputNode,
        textLenDisplayNode,
        overlimitMsgNode,
        postButton,
        commentThreadNode,
        "comment",
      );
    }
  }
});
