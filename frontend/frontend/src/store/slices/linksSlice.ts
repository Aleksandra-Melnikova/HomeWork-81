

import { RootState } from "../../app/store.ts";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createShortLink, fetchOriginalLink } from '../thunks/linksThunk.ts';
import { Link } from '../../types';

interface LinkState {
  isAddLoading: boolean;
  links: Link|null;
  isFetchLoading:boolean
}

const initialState: LinkState = {
  isAddLoading: false,
  links:null,
  isFetchLoading:true,
};
export const selectAddLoading = (state: RootState) => state.links.isAddLoading;
export const selectLinks = (state: RootState) => state.links.links;
export const selectFetchLoading = (state: RootState) => state.links.isFetchLoading;

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShortLink.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(createShortLink.fulfilled, (state,action: PayloadAction<Link>) => {
        state.isAddLoading = false;
        state.links = action.payload;
      })
      .addCase(createShortLink.rejected, (state) => {
        state.isAddLoading = false;
      })
      .addCase(fetchOriginalLink.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchOriginalLink.fulfilled, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(fetchOriginalLink.rejected, (state) => {
        state.isFetchLoading = false;
      })

  },
});

export const linksReducer = linksSlice.reducer;
