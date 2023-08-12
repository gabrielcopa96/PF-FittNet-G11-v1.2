import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore((rootReducer as any), applyMiddleware(thunk));

export default store;





