import { ICommentThreadItem } from "../interfaces/Interfaces";

export class CommentThread {
  private ownId?: string;
  private author?: string;
  private avatar?: string;
  private timeStamp?: string;
  private text?: string;
  private votes?: number;
  private isAddedTofavourite?: boolean;
  private parentId?: string;
  private interlocutor?: string;

  constructor() {
    this.ownId = "";
    this.author = "";
    this.avatar = "";
    this.timeStamp = "";
    this.text = "";
    this.votes = 0;
    this.isAddedTofavourite = false;
    this.parentId = "";
    this.interlocutor = "";
  }

  public storeMessage(
    ownId: string,
    storedUser: string,
    storedAvatar: string,
    timeStamp: string,
    date: Date,
    text: string,
    votes: number,
    isAddedTofavourite: boolean,
    replyCount: number,
    currentUser?: string,
    currentUserAvatar?: string,
    parentId?: string
  ) {
    const commentToStore: ICommentThreadItem = {
      ownId: ownId,
      storedUser: storedUser,
      storedAvatar: storedAvatar,
      timeStamp: timeStamp,
      date: date,
      text: text,
      votes: votes,
      addedTofavourite: isAddedTofavourite,
      replyCount: replyCount,
      currentUser: currentUser,
      currentUserAvatar: currentUserAvatar,
      parentId: parentId,
    };
    const commentToString = JSON.stringify(commentToStore);
    const commentThreadJSON = localStorage.getItem("commentThread");
    if (commentThreadJSON) {
      let commentThread: string[] = JSON.parse(commentThreadJSON);
      if (commentThread) {
        commentThread.push(commentToString);
        const commentThreadToString = JSON.stringify(commentThread);
        localStorage.setItem("commentThread", commentThreadToString);
      }
    } else throw new Error("No commentThread available in localStorage");
  }

  public updateStoredData(
    commentId: string,
    fieldToUpdate: string,
    updatedValue: any
  ): void {
    let commentThread = this.getCommentThread();
    if (commentThread && commentThread.length > 0) {
      let updatedComments = commentThread.map((commentJSON: string) => {
        const comment: ICommentThreadItem = JSON.parse(commentJSON);
        if (comment.ownId === commentId) {
          comment[fieldToUpdate] = updatedValue;
        }
        return JSON.stringify(comment);
      });
      commentThread = updatedComments;
      localStorage.setItem("commentThread", JSON.stringify(commentThread));
    } else throw new Error("No commentThread available in localStorage");
  }

  public getCommentThread() {
    const commentThread = localStorage.getItem("commentThread");
    if (commentThread) {
      return JSON.parse(commentThread);
    } else {
      this.initCommentThread();
    }
  }

  public arrStringToArrObj(commentThread: string[]): ICommentThreadItem[] {
    const arrOfObj: ICommentThreadItem[] = [];
    for (const commentString of commentThread) {
      const threadItem: ICommentThreadItem = JSON.parse(commentString);
      arrOfObj.push(threadItem);
    }
    return arrOfObj;
  }

  private initCommentThread() {
    const emptyCommentThread = [] as string[];
    localStorage.setItem("commentThread", JSON.stringify(emptyCommentThread));
  }
}
