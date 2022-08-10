# Register user

**POST** ```/register```

REQUEST

```json
{
  "login": "string",
  "password": "string"
}
```

ERRORS

* ```[login] cannot be empty```
* ```[password] cannot be empty```
* ```User with specified [login] already exists```

____________________________________

# Login

**POST** ```/login```

REQUEST

```json
{
  "login": "string",
  "password": "string"
}
```

RESPONSE

```json
{
  "accessToken": "string"
}
```

ERRORS

* ```User with specified [login] not found```
* ```Password is incorrect```

____________________________________

# Get my info

**GET** ```/users/me``` _(auth)_

RESPONSE

```json
{
  "id": "uuid",
  "login": "string",
  "firstName": "string",
  "lastName": "string",
  "description": "string"
}
```

____________________________________

# Update my profile

**POST** ```/users/updateMyProfile``` _(auth)_

REQUEST

```json
{
  "firstName": "string",
  "lastName": "string",
  "description": "string"
}
```

____________________________________

# Get user profile by user id

**GET** ```/users/getProfile?id=uuid``` _(auth)_

RESPONSE

```json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string",
  "description": "string",
  "isFollowed": "boolean"
}
```

____________________________________

# Get users list

**GET** ```/users/list?query=string&count=number&offet=number``` _(auth)_

RESPONSE

```json
{
  "total": "number",
  "items": [
    {
      "id": "uuid",
      "firstName": "string",
      "lastName": "string",
      "description": "string",
      "isFollowed": "boolean"
    }
  ]
}
```

____________________________________

# Follow user

**POST** ```/followers/follow``` _(auth)_

REQUEST

```json
{
  "userId": "uuid"
}
```

____________________________________

# Unfollow user

**POST** ```/followers/unfollow``` _(auth)_

REQUEST

```json
{
  "userId": "uuid"
}
```

____________________________________

# Get user followers

**GET** ```/followers/userFollowers?userId=uuid``` _(auth)_

RESPONSE

```json
[
  {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "description": "string",
    "isFollowed": "boolean"
  }
]
```

____________________________________

# Get my followers

**GET** ```/followers/myFollowers``` _(auth)_

RESPONSE

```json
[
  {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "description": "string",
    "isFollowed": "boolean"
  }
]
```

____________________________________

# Get user followed users

**GET** ```/followers/userFollowed?userId=uuid``` _(auth)_

RESPONSE

```json
[
  {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "description": "string",
    "isFollowed": "boolean"
  }
]
```

____________________________________

# Get my followed users

**GET** ```/followers/myFollowed``` _(auth)_

RESPONSE

```json
[
  {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "description": "string",
    "isFollowed": "boolean"
  }
]
```

____________________________________

# Create post

**POST** ```/posts/createPost``` _(auth)_

REQUEST

```json
{
  "text": "string"
}
```

____________________________________

# Get my posts

**GET** ```/posts/myPosts?count=number&offet=number``` _(auth)_

RESPONSE

```json
{
  "total": "number",
  "items": [
    {
      "id": "uuid",
      "text": "string",
      "author": {
        "id": "uuid",
        "firstName": "string",
        "lastName": "string"
      }
    }
  ]
}
```

____________________________________

# Get user posts by user id

**GET** ```/posts/userPosts?userId=uuid&count=number&offet=number``` _(auth)_

RESPONSE

```json
{
  "total": "number",
  "items": [
    {
      "id": "uuid",
      "text": "string",
      "author": {
        "id": "uuid",
        "firstName": "string",
        "lastName": "string"
      }
    }
  ]
}
```

____________________________________

# Get feed

**GET** ```/posts/feed?count=number&offet=number``` _(auth)_

RESPONSE

```json
{
  "total": "number",
  "items": [
    {
      "id": "uuid",
      "text": "string",
      "author": {
        "id": "uuid",
        "firstName": "string",
        "lastName": "string"
      }
    }
  ]
}
```
