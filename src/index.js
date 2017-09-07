/**
 * http://dev.apollodata.com/react/initialization.html
 * http://dev.apollodata.com/react/redux.html
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ApolloClient, ApolloProvider} from 'react-apollo';
import {BrowserRouter} from "react-router-dom"

import './index.css';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
const client = new ApolloClient();

// const networkInterface = createNetworkInterface({
//     uri: 'http://api.example.com/graphql'
// });
// const client = new ApolloClient({
//     networkInterface: networkInterface
// });

const store = createStore(
    combineReducers({
        // todos: todoReducer,
        // users: userReducer,
        apollo: client.reducer(),
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);


ReactDOM.render(
    <ApolloProvider client={client} store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
