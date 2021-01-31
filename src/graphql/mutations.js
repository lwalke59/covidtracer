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
export const checkOut = /* GraphQL */ `
  mutation CheckOut($input: CheckOutInput!) {
    checkOut(input: $input) {
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
export const createPatron = /* GraphQL */ `
  mutation CreatePatron(
    $input: CreatePatronInput!
    $condition: ModelPatronConditionInput
  ) {
    createPatron(input: $input, condition: $condition) {
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
export const updatePatron = /* GraphQL */ `
  mutation UpdatePatron(
    $input: UpdatePatronInput!
    $condition: ModelPatronConditionInput
  ) {
    updatePatron(input: $input, condition: $condition) {
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
export const deletePatron = /* GraphQL */ `
  mutation DeletePatron(
    $input: DeletePatronInput!
    $condition: ModelPatronConditionInput
  ) {
    deletePatron(input: $input, condition: $condition) {
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
