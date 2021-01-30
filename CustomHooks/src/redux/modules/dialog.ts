import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

const actionCreator = actionCreatorFactory();

export type EmitErrorPayload = {
  title: string;
  description: string;
};

export const toggle = actionCreator('TOGGLE_DIALOG');
export const emitError = actionCreator<EmitErrorPayload>('EMIT_ERROR');

const INITIAL_STATE: {
  isOpened: boolean;
  message: {
    title: string;
    description: string;
  };
} = {
  isOpened: false,
  message: {
    title: '',
    description: '',
  },
};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(toggle, (state) => ({
    ...state,
    isOpened: !state.isOpened,
  }))
  .case(emitError, (_state, { title, description }) => ({
    isOpened: true,
    message: {
      title,
      description,
    },
  }));

export default reducer;

export const selectDialog = createSelector(
  [(state: RootState) => state.ui.dialog.isOpened],
  (isOpened) => isOpened,
);

export const selectDialogMessage = createSelector(
  [(state: RootState) => state.ui.dialog.message],
  (message) => message,
);
