import { fdatasync } from 'fs';
import { validateUuid } from '../utils/utils';

export interface UserData {
  id: string,
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  description: string;
  followedUsers: string[];
}

export interface PostData {
  id: string;
  authorId: string;
  text: string;
}

export interface Data {
  users: UserData[];
  posts: PostData[];
}
