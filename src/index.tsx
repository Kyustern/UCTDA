import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
  });

const client = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === "development",
    uri: '/graphql',
    cache: new InMemoryCache(),
    link
  });

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA