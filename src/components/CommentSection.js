import { CommentFormComponent } from "./CommentForm.js";
import { CommentComponent } from "./Comment.js";
import { DialogBox } from "./Dialog-box.js";
import { Services } from "../services/services.js";
import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { CommentThread } from "../services/CommentThread.js";
import { User } from "./User.js";
export class CommentSection {
    constructor() {
        this.initId = Services.generateId();
        this.currentUserIsLogged = false;
        this.currentUserName = "User";
        this.currentUserAvatar = "../public/assets/interface-images/icon-default-avatar.png";
        this.currentUser = new User();
        this.commentThread = new CommentThread();
        this.commentForm = new CommentFormComponent(this.initId);
        this.commentSectionNode = document.querySelector(".comment-section");
        this.commentThreadNode = document.querySelector(".comment-thread");
        this.logOutBtn = document.getElementById("logoutBtn");
    }
    init() {
        this.logOutBtn.style.display = "none";
        if (this.commentSectionNode && this.commentThreadNode) {
            this.commentForm.createCommentForm(this.commentSectionNode, "comment");
            if (this.commentForm) {
                const inputNode = DOMHelpsters.getElementOOClass(`comment-input-field-${this.initId}`, "comment-form__input");
                const textLenDisplayNode = DOMHelpsters.getElementOOClass(`input-char-count-message-${this.initId}`, "input-char-count-message");
                const overlimitMsgNode = DOMHelpsters.getElementOOClass(`overlimit-msg-${this.initId}`, "char-overlimit-message");
                const postButton = DOMHelpsters.getElementOOClass(`post-comment-btn-${this.initId}`, "button-style-default o-text-18-op-4 submit-button");
                const userAvatarNode = document.getElementById(`avatar-image-${this.initId}`);
                const userNameNode = document.getElementById(`username-${this.initId}`);
                // Check if someone is logged in or not
                if (this.currentUser.loadUserFromStorage() === false) {
                    this.logOutBtn.style.display = "none";
                    const updateLoggedInStatus = () => {
                        this.commentSectionNode.removeEventListener("click", updateLoggedInStatus);
                        const dialogBox = new DialogBox();
                        dialogBox.create();
                        dialogBox.update().then((name) => {
                            this.currentUser.login(name);
                            this.currentUserIsLogged = true;
                            // Pass user's name and avatar to the comment form
                            this.commentForm.updateCommentForm(inputNode, textLenDisplayNode, overlimitMsgNode, postButton, this.commentThreadNode, userAvatarNode, userNameNode, "comment", this.currentUser.userHasName(), this.currentUser.userHasAvatar());
                        });
                    };
                    this.commentSectionNode.addEventListener("click", updateLoggedInStatus);
                }
                else {
                    this.commentForm.updateCommentForm(inputNode, textLenDisplayNode, overlimitMsgNode, postButton, this.commentThreadNode, userAvatarNode, userNameNode, "comment", this.currentUser.userHasName(), this.currentUser.userHasAvatar());
                    // Add logout button
                    this.logOutBtn.style.display = "block";
                    this.logOutBtn.addEventListener("click", () => {
                        this.currentUser.logout();
                        this.currentUserIsLogged = false;
                        localStorage.removeItem("user");
                        this.logOutBtn.style.display = "none";
                        window.location.reload();
                    });
                }
                // Check if commentThread exists in localStorage or not
                const retrievedCommentThread = this.commentThread.getCommentThread();
                if (retrievedCommentThread && retrievedCommentThread.length !== 0) {
                    // should I check the length really?
                    this.renderComments(retrievedCommentThread);
                }
                else
                    throw new Error(`Comment thread is empty ${retrievedCommentThread}`);
            }
        }
    }
    renderComments(retrievedCommentThread) {
        for (const commentString of retrievedCommentThread) {
            const threadItem = JSON.parse(commentString);
            const comment = new CommentComponent(threadItem.name, threadItem.avatar, threadItem.text, threadItem.timeStamp, threadItem.id, threadItem.votes, threadItem.isAddedTofavourite);
            const commentElement = comment.createComment(this.commentThreadNode);
        }
    }
}
// class SortComments {
//   // ...
//   static sortByFavourites() {
//     const commentElements = document.querySelectorAll('.comment');
//     const sortedComments = Array.from(commentElements)
//       .map(commentElement => ({
//         element: commentElement,
//         favouriteCount: parseInt(commentElement.dataset.favourites || '0')
//       }))
//       .filter(comment => comment.favouriteCount > 0)
//       .sort((a, b) => b.favouriteCount - a.favouriteCount)
//       .map(comment => comment.element);
//     this.displayComments(sortedComments);
//   }
//   static sortByDate() {
//     const commentElements = document.querySelectorAll('.comment');
//     const sortedComments = Array.from(commentElements)
//       .sort((a, b) => {
//         const aDate = new Date(a.dataset.date);
//         const bDate = new Date(b.dataset.date);
//         return bDate - aDate;
//       });
//     this.displayComments(sortedComments);
//   }
//   static sortByNumOfReplies() {
//     const commentElements = document.querySelectorAll('.comment');
//     const sortedComments = Array.from(commentElements)
//       .map(commentElement => ({
//         element: commentElement,
//         replyCount: parseInt(commentElement.dataset.replies || '0')
//       }))
//       .sort((a, b) => b.replyCount - a.replyCount)
//       .map(comment => comment.element);
//     this.displayComments(sortedComments);
//   }
//   static sortByVotes() {
//     const commentElements = document.querySelectorAll('.comment');
//     const sortedComments = Array.from(commentElements)
//       .map(commentElement => ({
//         element: commentElement,
//         upvoteCount: parseInt(commentElement.dataset.upvotes || '0'),
//         downvoteCount: parseInt(commentElement.dataset.downvotes || '0')
//       }))
//       .sort((a, b) => b.upvoteCount - a.upvoteCount || a.downvoteCount - b.downvoteCount)
//       .map(comment => comment.element);
//     this.displayComments(sortedComments);
//   }
