import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { LinkForm, LinkType } from "../../types";

export const createShortLink = createAsyncThunk<LinkType, LinkForm>(
  "links/createShortLink",
  async (Link) => {
    const result = await axiosApi.post("/links", Link);
    return result.data || null;
  },
);
