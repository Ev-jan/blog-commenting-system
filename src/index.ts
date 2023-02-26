import { CommentSection } from "./components/CommentSection.js";
import { CommentFormComponent } from "../src/components/CommentForm.js";
import { CommentComponent } from "../src/components/Comment.js";
import { ReplyComponent } from "./components/Reply.js";
import { DialogBox } from "./components/Dialog-box.js";
import { Services } from "../src/services/services.js";
import { DOMHelpsters } from "./services/DOMHelpsters.js";
import { CommentThread } from "./services/CommentThread.js";
import { User } from "./components/User.js";

const initId: number = Services.generateId();
let currentUserIsLogged: boolean = false;
let currentUserName: string = "User";
let currentUserAvatar: string =
  "../public/assets/interface-images/icon-default-avatar.png";
const currentUser: User = new User();
const commentThread = new CommentThread();
let commentForm: CommentFormComponent = new CommentFormComponent(initId);
const commentSectionNode: HTMLElement | null =
  document.querySelector(".comment-section");
const commentThreadNode: HTMLUListElement | null =
  document.querySelector(".comment-thread");
const logOutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

logOutBtn.style.display = "none";
if (commentSectionNode && commentThreadNode) {
  commentForm.createCommentForm(commentSectionNode, "comment");
  if (commentForm) {
    const inputNode = DOMHelpsters.getElementOOClass(
      `comment-input-field-${initId}`,
      "comment-form__input"
    ) as HTMLTextAreaElement;
    const textLenDisplayNode = DOMHelpsters.getElementOOClass(
      `input-char-count-message-${initId}`,
      "input-char-count-message"
    );
    const overlimitMsgNode = DOMHelpsters.getElementOOClass(
      `overlimit-msg-${initId}`,
      "char-overlimit-message"
    );
    const postButton = DOMHelpsters.getElementOOClass(
      `post-comment-btn-${initId}`,
      "button-style-default o-text-18-op-4 submit-button"
    ) as HTMLButtonElement | null;
    const userAvatarNode = document.getElementById(
      `avatar-image-${initId}`
    ) as HTMLImageElement;
    const userNameNode = document.getElementById(`username-${initId}`);

    // Check if someone is logged in or not

    if (currentUser.loadUserFromStorage() === false) {
      logOutBtn.style.display = "none";
      const updateLoggedInStatus = () => {
        commentSectionNode!.removeEventListener("click", updateLoggedInStatus);
        const dialogBox = new DialogBox();
        dialogBox.create();
        dialogBox.update().then((name) => {
          currentUser.login(name);
          currentUserIsLogged = true;
          currentUserName = name;
          currentUserAvatar = currentUser.userHasAvatar();

        });
                  // Pass user's name and avatar to the comment form
                    commentForm = new CommentFormComponent(initId, currentUserName, currentUserAvatar)
                    commentForm.updateCommentForm(
                      inputNode,
                      textLenDisplayNode,
                      overlimitMsgNode,
                      postButton,
                      commentThreadNode,
                      userAvatarNode,
                      userNameNode,
                      "comment",
                    );
      };
      commentSectionNode.addEventListener("click", updateLoggedInStatus);
    } else {
      currentUserName = currentUser.userHasName();
      currentUserAvatar = currentUser.userHasAvatar();  // clean up mess with these variables for fuck's sake
      commentForm = new CommentFormComponent(initId, currentUser.userHasName(), currentUser.userHasAvatar())
      commentForm.updateCommentForm(
        inputNode,
        textLenDisplayNode,
        overlimitMsgNode,
        postButton,
        commentThreadNode,
        userAvatarNode,
        userNameNode,
        "comment",
      );

      // Add logout button

      logOutBtn.style.display = "block";
      logOutBtn.addEventListener("click", () => {
        currentUser.logout();
        currentUserIsLogged = false;
        localStorage.removeItem("user");
        logOutBtn.style.display = "none";
        window.location.reload();
      });
    }

    // Check if commentThread exists in localStorage or not

    const retrievedCommentThread = commentThread.getCommentThread() as string[];
    if (retrievedCommentThread) {
      renderComments(retrievedCommentThread);
    }
  }

  // function renderComments(retrievedCommentThread: string[]): void {
  //   for (const commentString of retrievedCommentThread) {
  //     const threadItem = JSON.parse(commentString);
  //     if (threadItem.hasOwnProperty("ownId")) {
  //       const comment = new CommentComponent(
  //         threadItem.author,
  //         threadItem.avatar,
  //         threadItem.timeStamp,
  //         threadItem.text,
  //         threadItem.ownId,
  //         threadItem.votes,
  //         threadItem.isAddedTofavourite,
  //       );
  //       comment.createComment(
  //         commentThreadNode as HTMLElement
  //       );
  //       comment.updateComment();
  //     }
  //     else if(threadItem.hasOwnProperty("parentId")){
  //       const reply = new ReplyComponent(
  //         threadItem.author,
  //         threadItem.avatar,
  //         threadItem.text,
  //         threadItem.timeStamp,
  //         threadItem.interlocutor,
  //         threadItem.ownId,
  //         threadItem.votes,
  //         threadItem.isAddedTofavourite,
  //       );
  //       const replyParentNode = document.getElementById(`replies-${threadItem.parentId}`);
  //       if(replyParentNode){
  //         reply.createReply(commentThreadNode as HTMLElement);
  //         reply.updateReply();
  //       } else throw new Error("Parent node for replies not found ");

      
  //     }
  //   }
  // }

  async function renderComments(retrievedCommentThread: string[]): Promise<void> {
    for (const commentString of retrievedCommentThread) {
      const threadItem = JSON.parse(commentString);
      if (threadItem.hasOwnProperty("ownId") && threadItem.hasOwnProperty("parentId") === false) {
        const comment = new CommentComponent(
          currentUserName,
          currentUserAvatar,
          threadItem.timeStamp,
          threadItem.text,
          threadItem.ownId,
          threadItem.votes,
          threadItem.isAddedTofavourite,
          threadItem.storedUser,
          threadItem.storedAvatar,
        );
        comment.createComment(
          commentThreadNode as HTMLElement
        );
        comment.updateComment();
      } else if(threadItem.hasOwnProperty("parentId")){
          const reply = new ReplyComponent(
            threadItem.currentUser,
            threadItem.currentUserAvatar,
            threadItem.timeStamp,
            threadItem.text,
            threadItem.ownId,
            threadItem.votes,
            threadItem.isAddedTofavourite,
            threadItem.storedUser,
            threadItem.storedAvatar,
          );
          if(commentThreadNode){
            const replyParentNode = document.getElementById(`replies-${threadItem.parentId}`); // changed this after fruitles check of IDs
            if(replyParentNode){
              reply.createReply(replyParentNode);
              reply.updateReply();
            } else throw new Error("Parent node for replies not found ");
          }
      }
      // wait for 100 milliseconds before processing the next item
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  
  
}
