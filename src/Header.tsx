import React from 'react';
import { ApolloClient } from '@apollo/client';

interface HeaderProps {
  client: ApolloClient<any>;
}

const Header: React.FC<HeaderProps> = ({ client }) => {
  console.log(client); 
  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default Header;
