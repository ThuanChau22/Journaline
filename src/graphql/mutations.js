/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
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
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
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
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
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
export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
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
export const updatePage = /* GraphQL */ `
  mutation UpdatePage(
    $input: UpdatePageInput!
    $condition: ModelPageConditionInput
  ) {
    updatePage(input: $input, condition: $condition) {
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
export const deletePage = /* GraphQL */ `
  mutation DeletePage(
    $input: DeletePageInput!
    $condition: ModelPageConditionInput
  ) {
    deletePage(input: $input, condition: $condition) {
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
