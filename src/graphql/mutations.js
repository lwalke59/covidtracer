/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const checkIn = /* GraphQL */ `
  mutation CheckIn($input: CheckInInput!) {
    checkIn(input: $input) {
      id
      name
      capacity
      occupants
      createdAt
      updatedAt
    }
  }
`;
export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
      id
      name
      capacity
      occupants
      createdAt
      updatedAt
    }
  }
`;
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
      id
      name
      capacity
      occupants
      createdAt
      updatedAt
    }
  }
`;
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
      id
      name
      capacity
      occupants
      createdAt
      updatedAt
    }
  }
`;
