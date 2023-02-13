import { CommentFormComponent } from "../src/components/CommentForm.js";
import { CommentComponent } from "../src/components/Comment.js";
import { Services } from "../src/services/services.js";
import { ICommentForm } from "../src/interfaces/Interfaces.js";
import { IComment } from "../src/interfaces/Interfaces.js";
import { IUser } from "../src/interfaces/Interfaces.js";

const commentSectionNode: HTMLElement | null =
  document.querySelector(".comment-section");
const commentForm = new CommentFormComponent("Stepan", "trotototo");
window.addEventListener("load", () => {
    if(commentSectionNode) {
        commentForm.displayCommentForm(commentSectionNode);
    }
});
