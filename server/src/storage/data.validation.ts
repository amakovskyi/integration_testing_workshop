import { validateUuid } from '../utils/utils';
import { Data } from './data';

function validateNotNull(value, error) {
  if (value == null) {
    throw new Error(error);
  }
}

function validateString(value, error) {
  if (value != null && typeof value != 'string') {
    throw new Error(error);
  }
}

export function validateData(data: Data) {
  for (let user of data.users) {
    validateNotNull(user, 'User cannot be null');
    validateUuid(user.id, 'User id should be uuid');
    validateString(user.firstName, 'User [firstName] should be string');
    validateString(user.lastName, 'User [lastName] should be string');
    validateString(user.description, 'User [description] should be string');
  }
  let userIds = data.users.map(it => it.id);
  for (let user of data.users) {
    for (let id of user.followedUsers) {
      validateUuid(id, 'Followed user id should be uuid');
      if (!userIds.includes(id)) throw new Error('[followedUsers] contains not existing user id');
    }
    for (let i = 0; i < user.followedUsers.length; i++) {
      let index = user.followedUsers.indexOf(user.followedUsers[i]);
      if (i != index) throw new Error('[followedUsers] contains duplicate id ' + user.followedUsers[i]);
    }
  }
  for (let post of data.posts) {
    validateUuid(post.id, 'Post id should be uuid');
    validateNotNull(post.text, 'Post text cannot be null');
    validateString(post.text, 'Post text should be string');
    if (!userIds.includes(post.authorId)) throw new Error('[post.authorId] is not existing user id');
  }
}
