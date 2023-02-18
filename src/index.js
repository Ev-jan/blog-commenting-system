import { CommentFormComponent } from "../src/components/CommentForm.js";
import { Services } from "../src/services/services.js";
import { DOMHelpsters } from "./services/DOMHelpsters.js";
const commentSectionNode = document.querySelector(".comment-section");
const commentThreadNode = document.querySelector(".comment-thread");
const replyThreadNode = document.querySelector(".reply");
const replyThreadItemNode = replyThreadNode === null || replyThreadNode === void 0 ? void 0 : replyThreadNode.querySelector(".reply:first-child");
window.addEventListener("load", () => {
    if (commentSectionNode && commentThreadNode) {
        const id = Services.generateId();
        const author = "crapy koko";
        const commentForm = new CommentFormComponent(author, id);
        commentForm.createCommentForm(commentSectionNode, "comment");
        if (commentForm) {
            const inputNode = DOMHelpsters.getElementOOClass(`comment-input-field-${id}`, "comment-form__input");
            const textLenDisplayNode = DOMHelpsters.getElementOOClass(`input-char-count-message-${id}`, "input-char-count-message");
            const overlimitMsgNode = DOMHelpsters.getElementOOClass(`overlimit-msg-${id}`, "char-overlimit-message");
            const postButton = DOMHelpsters.getElementOOClass(`post-comment-btn-${id}`, "button-style-default o-text-18-op-4 submit-button");
            commentForm.updateCommentForm(inputNode, textLenDisplayNode, overlimitMsgNode, postButton, commentThreadNode, "comment");
        }
    }
});
