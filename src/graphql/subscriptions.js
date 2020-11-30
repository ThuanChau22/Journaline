/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      follow {
        items {
          id
          follower
          followedUser
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      page {
        items {
          id
          title
          status
          content
          username
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      follow {
        items {
          id
          follower
          followedUser
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      page {
        items {
          id
          title
          status
          content
          username
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      follow {
        items {
          id
          follower
          followedUser
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      page {
        items {
          id
          title
          status
          content
          username
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFollow = /* GraphQL */ `
  subscription OnCreateFollow {
    onCreateFollow {
      id
      follower
      followedUser
      user {
        id
        username
        follow {
          nextToken
        }
        page {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateFollow = /* GraphQL */ `
  subscription OnUpdateFollow {
    onUpdateFollow {
      id
      follower
      followedUser
      user {
        id
        username
        follow {
          nextToken
        }
        page {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteFollow = /* GraphQL */ `
  subscription OnDeleteFollow {
    onDeleteFollow {
      id
      follower
      followedUser
      user {
        id
        username
        follow {
          nextToken
        }
        page {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePage = /* GraphQL */ `
  subscription OnCreatePage {
    onCreatePage {
      id
      title
      status
      content
      username
      user {
        id
        username
        follow {
          nextToken
        }
        page {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePage = /* GraphQL */ `
  subscription OnUpdatePage {
    onUpdatePage {
      id
      title
      status
      content
      username
      user {
        id
        username
        follow {
          nextToken
        }
        page {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePage = /* GraphQL */ `
  subscription OnDeletePage {
    onDeletePage {
      id
      title
      status
      content
      username
      user {
        id
        username
        follow {
          nextToken
        }
        page {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
