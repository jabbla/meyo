import { createStore, compose, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import DevTools from '../DevTools';
import meyoApp from './reducers';

export default createStore(meyoApp, devToolsEnhancer());