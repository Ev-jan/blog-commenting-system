// import { CommentSection } from "./components/CommentSection.js";
import { CommentFormComponent } from "../src/components/CommentForm.js";
import { CommentComponent } from "../src/components/Comment.js";
import { ReplyComponent } from "./components/Reply.js";
import { DialogBox } from "./components/Dialog-box.js";
import { Services } from "../src/services/services.js";
import { DOMHelpsters } from "./services/DOMHelpsters.js";
import { CommentThread } from "./services/CommentThread.js";
import { User } from "./components/User.js";
import { ICommentThreadItem } from "./interfaces/Interfaces.js";

// variables to handle data flow

const initId: string = Services.generateId();
const alreadyAddedIds: string[] = [];
let currentCommentCount: number = 0;
let sortAscend: boolean = false;
let currentUserName: string = "User";
let currentUserAvatar: string =
  "../public/assets/interface-images/icon-default-avatar.png";
const currentUser: User = new User();
const commentThread = new CommentThread();

let retrievedCommentThread = commentThread.getCommentThread() as string[];

// variables to access DOM elements

const commentSectionNode: HTMLElement | null =
  document.querySelector(".comment-section");
let commentThreadNode: HTMLUListElement | null =
  document.querySelector(".comment-thread");
const logOutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
const commentCountBtn: HTMLElement | null =
  document.getElementById("comment-count-btn");
const commentCountNode: HTMLElement | null = document.getElementById(
  "comment-count-nav-item"
);
const navItems = Array.from(
  document.querySelectorAll(".comment-navigation__item")
) as HTMLElement[];
const dropDownItems = Array.from(
  document.querySelectorAll(".drop-down-content__button")
) as HTMLButtonElement[];
const dropDownBtn: HTMLElement | null =
  document.querySelector(".drop-down-btn");
const sortDirIcon = document.querySelector(
  ".comment-navigation__icon"
) as HTMLImageElement;
const sortByDateBtn: HTMLElement | null =
  document.getElementById("sort-by-dated-btn");
const sortByVoteBtn: HTMLElement | null =
  document.getElementById("sort-by-vote-btn");
const sortByTimeBtn: HTMLElement | null =
  document.getElementById("sort-by-time-btn");
const sortByReplBtn: HTMLElement | null =
  document.getElementById("sort-by-repl-btn");
const sortByFaveBtn: HTMLElement | null =
  document.getElementById("sort-by-fav-btn");

// change active / inactive appearance of nav buttons on click

function setActiveNavItem(clickedNavItem: HTMLElement) {
  navItems.forEach((navItem) => {
    if (navItem === clickedNavItem) {
      navItem.classList.add("comment-navigation__item_active");
    } else {
      navItem.classList.remove("comment-navigation__item_active");
    }
  });
}

function setActiveDropItem(clickedDropItem: HTMLElement) {
  dropDownItems.forEach((dropItem) => {
    if (dropItem === clickedDropItem) {
      dropItem.parentElement!.style.listStyleImage =
        "url('../public/assets/interface-images/icon-tick.svg')";
      if (dropDownBtn) {
        dropDownBtn.textContent = dropItem.textContent;
      }
    } else {
      dropItem.parentElement!.style.listStyleImage = "none";
    }
  });
}

navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    setActiveNavItem(navItem);
  });
});

dropDownItems.forEach((dropItem) => {
  dropItem.addEventListener("click", () => {
    setActiveDropItem(dropItem);
  });
});

const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const addedNodes = mutation.addedNodes;
      const removedNodes = mutation.removedNodes;
      if (addedNodes.length > 0) {
        for (const addedNode of addedNodes) {
          if (
            addedNode instanceof HTMLElement &&
            addedNode.classList.contains("thread__item")
          ) {
            const addedNodeId = addedNode.id;
            if (!alreadyAddedIds.includes(addedNodeId)) {
              alreadyAddedIds.push(addedNodeId);
              currentCommentCount++;
            }
          }
        }
      }
      if (removedNodes.length > 0) {
        for (const removedNode of removedNodes) {
          if (
            removedNode instanceof HTMLElement &&
            removedNode.classList.contains("thread__item")
          ) {
            const removedNodeId = removedNode.id;
            const index = alreadyAddedIds.indexOf(removedNodeId);
            if (index > -1) {
              alreadyAddedIds.splice(index, 1);
              currentCommentCount--;
            }
          }
        }
      }
      if (commentCountNode) {
        commentCountNode.innerText = `(${currentCommentCount})`;
      } else {
        throw new Error("Comment count node not found");
      }
    }
  }
});

observer.observe(commentThreadNode!, { childList: true });

logOutBtn.style.display = "none";
if (commentSectionNode && commentThreadNode) {
  let commentForm: CommentFormComponent = new CommentFormComponent(initId);
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

    // check login status

    if (currentUser.loadUserFromStorage() === false) {
      logOutBtn.style.display = "none";
      const updateLoggedInStatus = () => {
        commentSectionNode!.removeEventListener("click", updateLoggedInStatus);
        const dialogBox = new DialogBox();
        dialogBox.create();
        dialogBox.update().then((name) => {
          currentUser.login(name);
          currentUser.createAvatar().then((avatarUrl) =>{
            currentUserName = name;
            currentUserAvatar = avatarUrl;
            commentForm.avatar = currentUserAvatar;
            commentForm.currentUserName = currentUserName;
            commentForm.updateCommentForm(
              inputNode,
              textLenDisplayNode,
              overlimitMsgNode,
              postButton,
              commentThreadNode,
              userAvatarNode,
              userNameNode,
              "comment"
            );
            window.location.reload()
          });
          })
      };

      commentSectionNode.addEventListener("click", updateLoggedInStatus);
    } else {
      currentUserName = currentUser.userHasName();
      currentUserAvatar = currentUser.userHasAvatar();
      commentForm.avatar = currentUserAvatar;
      commentForm.currentUserName = currentUserName;

      commentForm.updateCommentForm(
        inputNode,
        textLenDisplayNode,
        overlimitMsgNode,
        postButton,
        commentThreadNode,
        userAvatarNode,
        userNameNode,
        "comment"
      );

      // add logout button

      logOutBtn.style.display = "block";
      logOutBtn.addEventListener("click", () => {
        currentUser.logout();
        localStorage.removeItem("user");
        logOutBtn.style.display = "none";
        window.location.reload();
      });
    }

    //  check if commentThread exists in localStorage and render if it does

    if (retrievedCommentThread) {
      const arrOfComments = commentThread.arrStringToArrObj(
        retrievedCommentThread
      );
      renderCommentsFromChache(arrOfComments);
    }
  }

  // add functionality to sorting buttons

  commentCountBtn!.addEventListener("click", () => {
    retrievedCommentThread = commentThread.getCommentThread() as string[];
    if (retrievedCommentThread) {
      const arrOfComments = commentThread.arrStringToArrObj(
        retrievedCommentThread
      );
      if (commentThreadNode) {
        while (commentThreadNode.firstChild) {
          commentThreadNode.removeChild(commentThreadNode.firstChild);
        }
      }
      renderCommentsFromChache(arrOfComments);
    }
  });

  dropDownBtn?.addEventListener("click", () => {
    if (sortDirIcon) {
      if (sortAscend === false) {
        sortDirIcon.classList.add("rotated");
        sortAscend = true;
      } else {
        sortAscend = false;
        sortDirIcon.classList.remove("rotated");
      }
    }
  });

  sortByTimeBtn?.addEventListener("click", () => {
    const comments = document.querySelectorAll(".thread__item");
    const arrRenderedComments = Array.from(comments) as Array<HTMLLIElement>;
    const sortedByDate = arrRenderedComments.sort((a, b) => {
      const aDate = new Date(a.dataset.commentDate as string) as Date;
      const bDate = new Date(b.dataset.commentDate as string) as Date;
      if (sortAscend === false) {
        return bDate.getTime() - aDate.getTime();
      } else {
        return aDate.getTime() - bDate.getTime();
      }
    });
    if (commentThreadNode) {
      while (commentThreadNode.firstChild) {
        commentThreadNode.removeChild(commentThreadNode.firstChild);
      }
      sortedByDate.forEach((child) => {
        commentThreadNode!.appendChild(child);
      });
    }
  });

  sortByDateBtn?.addEventListener("click", () => {
    const comments = document.querySelectorAll(".thread__item");
    const arrRenderedComments = Array.from(comments) as Array<HTMLLIElement>;
    const sortedByDate = arrRenderedComments.sort((a, b) => {
      const aDate = new Date(a.dataset.commentDate as string) as Date;
      const bDate = new Date(b.dataset.commentDate as string) as Date;
      if (sortAscend === false) {
        return bDate.getDate() - aDate.getDate();
      } else {
        return aDate.getDate() - bDate.getDate();
      }
    });
    if (commentThreadNode) {
      while (commentThreadNode.firstChild) {
        commentThreadNode.removeChild(commentThreadNode.firstChild);
      }
      sortedByDate.forEach((child) => {
        commentThreadNode!.appendChild(child);
      });
    }
  });

  sortByVoteBtn?.addEventListener("click", () => {
    const comments = document.querySelectorAll(".thread__item");
    const arrRenderedComments = Array.from(comments) as Array<HTMLLIElement>;
    const sortByVotes = arrRenderedComments.sort((a, b) => {
      const aVotes = parseInt(a.dataset.commentVotes as string);
      const bVotes = parseInt(b.dataset.commentVotes as string);
      if (sortAscend === false) {
        return aVotes - bVotes;
      } else {
        return bVotes - aVotes;
      }
    });
    if (commentThreadNode) {
      while (commentThreadNode.firstChild) {
        commentThreadNode.removeChild(commentThreadNode.firstChild);
      }
      sortByVotes.forEach((child) => {
        commentThreadNode!.appendChild(child);
      });
    }
  });

  sortByReplBtn?.addEventListener("click", () => {
    const comments = document.querySelectorAll(".thread__item");
    const arrRenderedComments = Array.from(comments) as Array<HTMLLIElement>;
    const sortByReplies = arrRenderedComments.sort((a, b) => {
      const aReplies = parseInt(a.dataset.commentReplycount as string);
      const bReplies = parseInt(b.dataset.commentReplycount as string);
      if (sortAscend === false) {
        return aReplies - bReplies;
      } else {
        return bReplies - aReplies;
      }
    });
    if (commentThreadNode) {
      while (commentThreadNode.firstChild) {
        commentThreadNode.removeChild(commentThreadNode.firstChild);
      }
      sortByReplies.forEach((child) => {
        commentThreadNode!.appendChild(child);
      });
    }
  });

  sortByFaveBtn?.addEventListener("click", () => {
    const comments = document.querySelectorAll(".thread__item");
    const arrRenderedComments = Array.from(comments) as Array<HTMLLIElement>;
    const sortByFav = arrRenderedComments.filter((comment) => {
      return comment.dataset.commentFav === "true";
    });
    if (commentThreadNode) {
      while (commentThreadNode.firstChild) {
        commentThreadNode.removeChild(commentThreadNode.firstChild);
      }
      sortByFav.forEach((child) => {
        commentThreadNode!.appendChild(child);
      });
    }
  });
}

async function renderCommentsFromChache(
  arrOfComments: ICommentThreadItem[]
): Promise<void> {
  for (const threadItem of arrOfComments) {
    if (
      threadItem.hasOwnProperty("ownId") &&
      threadItem.hasOwnProperty("parentId") === false
    ) {
      const comment = new CommentComponent(
        currentUserName,
        currentUserAvatar,
        threadItem.timeStamp,
        threadItem.date,
        threadItem.text,
        threadItem.ownId,
        threadItem.votes,
        threadItem.addedTofavourite,
        threadItem.replyCount,
        threadItem.storedUser,
        threadItem.storedAvatar
      );
      comment.createComment(commentThreadNode as HTMLElement);
      comment.updateComment();
    } else if (threadItem.hasOwnProperty("parentId")) {
      const reply = new ReplyComponent(
        threadItem.currentUser!,
        threadItem.currentUserAvatar!,
        threadItem.timeStamp,
        threadItem.date,
        threadItem.text,
        threadItem.ownId,
        threadItem.votes,
        threadItem.addedTofavourite,
        threadItem.storedUser,
        threadItem.storedAvatar
      );
      if (commentThreadNode) {
        const replyParentNode = document.getElementById(
          `replies-${threadItem.parentId}`
        );
        if (replyParentNode) {
          reply.createReply(replyParentNode);
          reply.updateReply();
        } else throw new Error("Parent node for replies not found ");
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}



