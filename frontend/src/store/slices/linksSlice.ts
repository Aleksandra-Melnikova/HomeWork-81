import { RootState } from "../../app/store.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createShortLink } from "../thunks/linksThunk.ts";
import { LinkType } from "../../types";

interface LinkState {
  isAddLoading: boolean;
  links: LinkType | null;
}

const initialState: LinkState = {
  isAddLoading: false,
  links: null,
};

export const selectAddLoading = (state: RootState) => state.links.isAddLoading;
export const selectLinks = (state: RootState) => state.links.links;

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShortLink.pending, (state) => {
        state.isAddLoading = true;
      })
      .addCase(
        createShortLink.fulfilled,
        (state, action: PayloadAction<LinkType>) => {
          state.isAddLoading = false;
          state.links = action.payload;
        },
      )
      .addCase(createShortLink.rejected, (state) => {
        state.isAddLoading = false;
      });
  },
});

export const linksReducer = linksSlice.reducer;
