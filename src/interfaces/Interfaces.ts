// export interface IUser {
//   name: string
// }

// export interface IComment {
//   id: number,
//   text: string,
//   author: string,
//   timeStamp: string,
//   avatar: string,
//   votes: number,
//   isAddedTofavourite: boolean,
//   createComment: Function,
//   updateComment: Function
// }

// export interface IReply extends IComment {
//   id: number,
//   text: string,
//   author: string,
//   timeStamp: string,
//   avatar: string,
//   votes: number,
//   isAddedTofavourite: boolean,
//   createReply: Function,
//   updateReply: Function
// }

// export interface ICommentForm {
//   author: string,
//   id: number,
//   comment: Object,
//   createCommentForm: Function,
//   updateCommentForm: Function,

// }

export type ICommentThreadItem = {
  ownId: number;
  storedUser: string;
  storedAvatar: string;
  timeStamp: string;
  text: string;
  votes: number;
  isAddedTofavourite: boolean;
  parentId?: number;
  currentUser?: string;
  currentUserAvatar?: string;
  [key: string]: any;
}