export type ICommentThreadItem = {
  ownId: string;
  storedUser: string;
  storedAvatar: string;
  timeStamp: string;
  date: Date;
  text: string;
  votes: number;
  addedTofavourite: boolean;
  replyCount: number;
  parentId?: string;
  currentUser?: string;
  currentUserAvatar?: string;
  [key: string]: any;
}