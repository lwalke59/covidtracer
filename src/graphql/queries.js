/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
      id
      name
      capacity
      occupants
      createdAt
      updatedAt
    }
  }
`;
export const listStores = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        capacity
        occupants
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPatron = /* GraphQL */ `
  query GetPatron($id: ID!) {
    getPatron(id: $id) {
      id
      username
      email
      phone_number
      check_in_time
      check_out_time
      createdAt
      updatedAt
    }
  }
`;
export const listPatrons = /* GraphQL */ `
  query ListPatrons(
    $filter: ModelPatronFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatrons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        phone_number
        check_in_time
        check_out_time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
