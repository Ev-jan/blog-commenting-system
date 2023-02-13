import { CommentFormComponent } from "../src/components/CommentForm.js";
const commentSectionNode = document.querySelector(".comment-section");
const commentForm = new CommentFormComponent("Stepan", "trotototo");
window.addEventListener("load", () => {
    if (commentSectionNode) {
        commentForm.displayCommentForm(commentSectionNode);
    }
});
