

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { LinkForm } from '../../types';
import { selectAddLoading, selectLinks } from '../../store/slices/linksSlice.ts';
import { createShortLink } from '../../store/thunks/linksThunk.ts';
import { toast } from 'react-toastify';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';

const Form = () => {
  const [form, setForm] = useState<LinkForm>({
    originalUrl: "",
  });
  const createAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();
  const links = useAppSelector(selectLinks);
  console.log(links);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const generateShortUrl = async (e: React.FormEvent, form: LinkForm) => {
    e.preventDefault();
    if (form.originalUrl.trim().length > 0) {
      await dispatch(createShortLink({ ...form }));
    } else {
      toast.warning("Fill in the original url field.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <form className="mx-auto w-75" onSubmit={(e) => generateShortUrl(e, form)}>
        <h3 className="my-4"> Shorten your link!</h3>
        <div className="d-flex  mb-2">
          <input
            required
            type="text"
            onChange={changeForm}
            value={form.originalUrl}
            name="originalUrl"
            className="form-control "
          />
        </div>


        <div className="d-flex">
          <ButtonLoading
            text={"Shorten"}
            isLoading={createAddLoading}
            isDisabled={createAddLoading}
          />
        </div>
      </form>
      {links ? <a href={links.originalUrl}> {links.shortUrl}</a>: null}
    </div>
  );
};

export default Form;
