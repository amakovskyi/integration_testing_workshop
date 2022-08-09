export interface UserPost {
  id: string,
  text: string,
  author: {
    id: string,
    firstName: string,
    lastName: string;
  }
}

export interface UserProfile {
  id: string,
  firstName: string,
  lastName: string,
  description: string,
  isFollowed: boolean,
}
