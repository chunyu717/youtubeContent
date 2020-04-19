import React from 'react';
import { render } from 'react-dom';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';

//redux 
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk' ;
import Intl from "./intl";
import "./styles/index.scss";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const Root = ({ store }) => (
    <Provider store={store}>
      <Intl/>
    </Provider>
  )

  render(<Root store={store} />, document.getElementById('root'))

  serviceWorker.unregister();

