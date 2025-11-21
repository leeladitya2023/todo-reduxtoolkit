import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from '../Features/Todo/TodoSlice';

export const Store = configureStore({
  reducer: {
    todos: TodoReducer,
  },
});
