import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { LinkForm } from "../../types";
import {
  selectAddLoading,
  selectLinks,
} from "../../store/slices/linksSlice.ts";
import { createShortLink } from "../../store/thunks/linksThunk.ts";
import { toast } from "react-toastify";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";

const Form = () => {
  const [form, setForm] = useState<LinkForm>({
    originalUrl: "",
  });
  const createAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();
  const links = useAppSelector(selectLinks);

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
      <form
        className="mx-auto w-50"
        onSubmit={(e) => generateShortUrl(e, form)}
      >
        <h3 className="my-4 text-center"> Shorten your link!</h3>
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

        <div className="d-flex justify-content-center align-items-center mt-4">
          <ButtonLoading
            text={"Shorten"}
            isLoading={createAddLoading}
            isDisabled={createAddLoading}
          />
        </div>
      </form>
      <>
        {" "}
        {links ? (
          <>
            <strong className={"text-center mt-4 mb-4 d-block"}>
              Your link now looks like this
            </strong>
            <a
              className={"d-block text-center"}
              href={`http://localhost:8000/${links.shortUrl}`}
            >
              {" "}
              {`http://localhost:8000/${links.shortUrl}`}
            </a>
          </>
        ) : null}
      </>
    </div>
  );
};

export default Form;
