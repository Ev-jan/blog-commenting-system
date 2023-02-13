export interface IUser {
  name: string;
  email?: string;
  password?: string;
}

export interface IComment {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  avatar: string;
  votes: number | null;
  favourite: boolean;
}

export interface ICommentForm {
  author: string;
  message: string;
  // date: Date;
}
