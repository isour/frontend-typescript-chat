/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
  },
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

export const { actions } = modalSlice;

export default modalSlice.reducer;
