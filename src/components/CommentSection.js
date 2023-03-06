"use strict";
// import { CommentFormComponent } from "./CommentForm.js";
// import { CommentComponent } from "./Comment.js";
// import { ReplyComponent } from "./Reply.js";
// import { DialogBox } from "./Dialog-box.js";
// import { Services } from "../services/services.js";
// import { DOMHelpsters } from "../services/DOMHelpsters.js";
// import { CommentThread } from "../services/CommentThread.js";
// import { User } from "./User.js";
// import { v4 as uuidv4 } from 'uuid';
// export class CommentSection {
// // variables to handle data flow
// initId: string = uuidv4();
// currentCommentCount: number = 0;
// currentUserIsLogged: boolean = false;
// currentUserName: string = "User";
// currentUserAvatar: string =
//   "../public/assets/interface-images/icon-default-avatar.png";
// currentUser: User = new User();
// commentThread = new CommentThread();
// commentForm: CommentFormComponent = new CommentFormComponent(this.initId);
// // variables to access DOM elements
// commentSectionNode: HTMLElement | null =
//   document.querySelector(".comment-section");
// commentThreadNode: HTMLUListElement | null =
//   document.querySelector(".comment-thread");
// logOutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
// commentCountBtn: HTMLElement | null =
//   document.getElementById("comment-count-btn");
// commentCountNode: HTMLElement | null = document.getElementById(
//   "comment-count-field"
// );
// dropDownBtn: HTMLElement | null =
//   document.getElementById("drop-down-btn");
// sortByDateBtn: HTMLElement | null =
//   document.getElementById("sort-by-dated-btn");
// sortByVoteBtn: HTMLElement | null =
//   document.getElementById("sort-by-vote-btn");
// sortByTimeBtn: HTMLElement | null =
//   document.getElementById("sort-by-time-btn");
// sortByReplBtn: HTMLElement | null =
//   document.getElementById("sort-by-repl-btn");
// sortByFaveBtn: HTMLElement | null =
//   document.getElementById("sort-by-fav-btn");
// inputNode: HTMLTextAreaElement | null = null;
// textLenDisplayNode: HTMLElement | null = null;
//   constructor() {}
//   public init() {
//     this.logOutBtn.style.display = "none";
//     if (this.commentSectionNode && this.commentThreadNode) {
//       this.commentForm.createCommentForm(this.commentSectionNode, "comment");
//       if (this.commentForm) {
//         this.inputNode = DOMHelpsters.getElementOOClass(
//           `comment-input-field-${this.initId}`,
//           "comment-form__input"
//         ) as HTMLTextAreaElement;
//         this.textLenDisplayNode = document.getElementById(
//           `input-char-count-message-${this.initId}`
//         );
//         const overlimitMsgNode = DOMHelpsters.getElementOOClass(
//           `overlimit-msg-${this.initId}`,
//           "char-overlimit-message"
//         );
//         const postButton = DOMHelpsters.getElementOOClass(
//           `post-comment-btn-${this.initId}`,
//           "button-style-default o-text-18-op-4 submit-button"
//         ) as HTMLButtonElement | null;
//         const userAvatarNode = document.getElementById(
//           `avatar-image-${this.initId}`
//         ) as HTMLImageElement;
//         const userNameNode = document.getElementById(`username-${this.initId}`);
//         // Check if someone is logged in or not
//         if (this.currentUser.loadUserFromStorage() === false) {
//           this.logOutBtn.style.display = "none";
//           const updateLoggedInStatus = () => {
//             this.commentSectionNode!.removeEventListener(
//               "click",
//               updateLoggedInStatus
//             );
//             const dialogBox = new DialogBox();
//             dialogBox.create();
//             dialogBox.update().then((name) => {
//               this.currentUser.login(name);
//               this.currentUserIsLogged = true;
//               // Pass user's name and avatar to the comment form
//               this.commentForm = new CommentFormComponent(
//                 this.initId,
//                 this.currentUserName,
//                 this.currentUserAvatar
//               );
//               this.commentForm.updateCommentForm(
//                 this.inputNode,
//                 this.textLenDisplayNode,
//                 overlimitMsgNode,
//                 postButton,
//                 this.commentThreadNode,
//                 userAvatarNode,
//                 userNameNode,
//                 "comment"
//               );
//             });
//             if(this.commentSectionNode){
//               this.commentSectionNode.addEventListener("click", updateLoggedInStatus);
//             }
//           }} else {
//             this.currentUserName = this.currentUser.userHasName();
//             this.currentUserAvatar = this.currentUser.userHasAvatar();
//             this.commentForm = new CommentFormComponent(
//               this.initId,
//               this.currentUserName,
//               this.currentUserAvatar
//             );
//             this.commentForm.updateCommentForm(
//               this.inputNode,
//               this.textLenDisplayNode,
//               overlimitMsgNode,
//               postButton,
//               this.commentThreadNode,
//               userAvatarNode,
//               userNameNode,
//               "comment"
//             );
//             // Add logout button
//             this.logOutBtn.style.display = "block";
//             this.logOutBtn.addEventListener("click", () => {
//               this.currentUser.logout();
//               this.currentUserIsLogged = false;
//               localStorage.removeItem("user");
//               this.logOutBtn.style.display = "none";
//               window.location.reload();
//             });
//           }
//           // Check if commentThread exists in localStorage and render if it's there
//           const retrievedCommentThread = this.commentThread.getCommentThread() as string[];
//           if (retrievedCommentThread) {
//             this.renderComments(retrievedCommentThread);
//           }
//         }
//     }
//   }
//   private renderComments = async (
//     retrievedCommentThread: string[]
//   ): Promise<void> => {
//     for (const commentString of retrievedCommentThread) {
//       const threadItem = JSON.parse(commentString);
//       if (
//         threadItem.hasOwnProperty("ownId") &&
//         threadItem.hasOwnProperty("parentId") === false
//       ) {
//         const comment = new CommentComponent(
//           this.currentUserName,
//           this.currentUserAvatar,
//           threadItem.timeStamp,
//           threadItem.text,
//           threadItem.ownId,
//           threadItem.votes,
//           threadItem.addedTofavourite,
//           threadItem.storedUser,
//           threadItem.storedAvatar
//         );
//         comment.createComment(this.commentThreadNode as HTMLElement);
//         comment.updateComment();
//       } else if (threadItem.hasOwnProperty("parentId")) {
//         const reply = new ReplyComponent(
//           threadItem.currentUser,
//           threadItem.currentUserAvatar,
//           threadItem.timeStamp,
//           threadItem.text,
//           threadItem.ownId,
//           threadItem.votes,
//           threadItem.addedTofavourite,
//           threadItem.storedUser,
//           threadItem.storedAvatar
//         );
//         if(this.commentThreadNode) {
//           const replyParentNode = document.getElementById(
//             `replies-${threadItem.parentId}`
//           );
//           if (replyParentNode) {
//             reply.createReply(replyParentNode);
//             reply.updateReply();
//           } else throw new Error("Parent node for replies not found ");
//         }
//       }
//       // wait for 10 milliseconds before processing the next item
//       await new Promise((resolve) => setTimeout(resolve, 10));
//     }
//   }      
// }
