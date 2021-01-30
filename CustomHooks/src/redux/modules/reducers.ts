import { combineReducers } from 'redux';
import user from './user';
import dialog from './dialog';

const rootReducer = combineReducers({
  resources: combineReducers({ user }),
  ui: combineReducers({ dialog }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
