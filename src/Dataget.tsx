import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS, WHO_AM_I } from './Queries';
import Userlist from './Userlist';

const Dataget: React.FC = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
  const { data: whoAmIData, loading: whoAmILoading, error: whoAmIError } = useQuery(WHO_AM_I);

  if (usersLoading || whoAmILoading) {
    return <p>Loading...</p>;
  }

  if (usersError) {
    return <p>Error loading users: {usersError.message}</p>;
  }

  if (whoAmIError) {
    return <p>Error loading user info: {whoAmIError.message}</p>;
  }

  return <Userlist users={usersData.getUsers} whoAmI={whoAmIData.whoAmI} />;
};

export default Dataget;
