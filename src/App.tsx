import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Header from './Header';
import Signup from './Signup';
import Dataget from './Dataget';
import Whoami from './Whoami';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://10.100.72.192:3000/graphql',
});

const setAuthorizationLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authHeader');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: setAuthorizationLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header client={client} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dataget" element={<Dataget />} />
          <Route path="/whoami" element={<Whoami />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
