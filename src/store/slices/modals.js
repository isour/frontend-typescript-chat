/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalsAdapter = createEntityAdapter({});

const initialState = modalsAdapter.getInitialState({
  isOpened: false,
  item: {
    id: 1,
    name: '',
  },
  type: null,
});

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, item } = payload;
      state.isOpened = true;
      state.type = type;
      state.item = item;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.item = null;
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
