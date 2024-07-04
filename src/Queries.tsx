import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      user_id
      username
      empId
      usertype
    }
  }
`;

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      user_id
      username
      email
      phonenumber
      empId
      shift
      usertype
      created_at
    }
  }
`;


export const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      user_id
      username
      email
      phonenumber
      empId
      shift
      usertype
      created_at
    }
  }
`;


export const LOGIN_MUTATION = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    access_token
    role
  }
}
`;


export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      user_id
      username
      email
      password
      phonenumber
      empId
      shift
      usertype
      created_at
    }
  }
`;

export const DELETE_USER = gql`
mutation DeleteUser($id: String!) {
  deleteUser(id: $id)
}`


