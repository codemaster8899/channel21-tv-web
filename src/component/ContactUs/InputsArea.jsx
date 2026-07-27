import {
  FormControl,
  FormHelperText,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { sendEmail } from "src/api/api";
import PhoneNumberInput from "./PhoneNumberInput";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const InputsArea = () => {
  const [values, setValues] = useState({
    textmask: "",
    currency: "+374",
    name: "",
    surname: "",
    message: "",
    email: "",
    error: "",
  });
  const [error, setError] = useState({
    textmask: false,
    currency: false,
    name: false,
    surname: false,
    message: false,
    email: false,
    error: false,
  });
  const { t } = useTranslation();
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (values.email !== "" && regex.test(values.email) === false) {
      setValues({
        ...values,
        error: "Email is not valid",
      });
      return false;
    } else {
      setError({ ...error, email: false });
      setValues({
        ...values,
        error: "",
      });
    }
    return true;
  };
  useEffect(() => {
    emailValidation();
  }, [values.email]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setError({
      ...error,
      [event.target.name]: false,
    });
  };
  return (
    <div
      className="md:w-full xl:w-[626px] bg-white text-lightText md:rounded-[20px] mt-7 md:mt-20 xl:mt-0 text-xs md:text-sm"
      style={{ boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.3)" }}
    >
      <div className="w-full px-5 py-10 md:p-16">
        <p className=" text-xl md:text-2xl xl:text-3xl font-semibold mb-10 md:mb-12">
          {t("contactUs")}
        </p>
        <div className="md:flex gap-7 mb-7">
          <div className="md:w-1/2  mb-7 md:mb-0">
            <TextField
              id="outlined-select-currency"
              fullWidth
              label={`${t("name")}`}
              value={values.name}
              name="name"
              onChange={handleChange}
              color="grey"
              sx={{
                width: "100%",
                background: "#E6E6E6",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="md:w-1/2">
            <TextField
              label={`${t("lastName")}`}
              id="outlined-select-currency"
              fullWidth
              value={values.surname}
              name="surname"
              onChange={handleChange}
              color="grey"
              sx={{
                width: "100%",
                background: "#E6E6E6",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
        <div className="mb-7">
          <FormControl fullWidth>
            <TextField
              label="E-mail"
              required
              id="outlined-select-currency"
              name="email"
              error={error.email}
              helperText={error.email && "email is required"}
              value={values.email}
              fullWidth
              color="grey"
              sx={{
                width: "100%",
                background: "#E6E6E6",
                borderRadius: "5px",
              }}
              onChange={handleChange}
            />
            <FormHelperText id="component-error-text">
              <span className="text-red-700 absolute">{values.error}</span>
            </FormHelperText>
          </FormControl>
        </div>
        <div className="mb-7">
          <PhoneNumberInput
            values={{ textmask: values.textmask, currency: values.currency }}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full">
          <TextField
            label={`${t("message")}`}
            required
            value={values.message}
            name="message"
            error={error.message}
            color="grey"
            helperText={error.message && "message is required"}
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                style: {
                  minWidth: "100%",
                  resize: "auto",
                  // width: "100%",
                  background: "#E6E6E6",
                  borderRadius: "5px",
                  padding: "20px 16px",
                  boxSizing: "border-box",
                },
              },
            }}
            style={{ width: "100%" }}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full h-12 rounded mt-10  bg-[#17171B] text-white font-semibold"
          onClick={() => {
            if (values.email.length > 0 && values.error === "") {
              if (values.message.length > 0) {
                sendEmail({
                  text: values.message,
                  email: values.email,
                  phone: `${values.currency} ${values.textmask}`,
                  firstName: values.name,
                  lastName: values.surname,
                })
                  .then(() => {
                    Swal.fire({
                      icon: "success",

                      showConfirmButton: false,
                      timer: 1500,
                      
                    });
                    setValues({
                      textmask: "",
                      currency: "+374",
                      name: "",
                      surname: "",
                      message: "",
                      email: "",
                      error: "",
                    });
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: "error",
                      title: err.response.data.msg,
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
              } else {
                setError({
                  ...error,
                  message: true,
                });
              }
            } else {
              setError({
                ...error,
                email: true,
              });
            }
          }}
        >
          {t("send")}
        </button>
      </div>
    </div>
  );
};

export default InputsArea;
