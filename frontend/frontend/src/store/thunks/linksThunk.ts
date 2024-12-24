import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Link, LinkForm } from '../../types';

export const fetchOriginalLink = createAsyncThunk< void>(
  "links/fetchOriginalLink",
  async () => {
    const linkResponse = await axiosApi("/links/:shortUrl");
    return linkResponse.data || [];
  },
);

export const createShortLink = createAsyncThunk<Link, LinkForm>(
  "links/createShortLink",
  async (Link) => {
    const result = await axiosApi.post("/links", Link);
    return result.data || null
  },
);
