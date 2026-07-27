import { MenuItem, TextField } from "@mui/material";
import { FC, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

const currencies = [
  {
    value: "Arm",
    label: "+374",
    img: require("src/assets/images/Arm.png"),
  },
];
const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#0) 00-00-00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const PhoneNumberInput = ({ values, handleChange }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-between gap-4 items-center">
      <div className="w-[122px] ">
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          name="currency"
          value={values.currency}
          onChange={handleChange}
          color="grey"
          sx={{
            width: "100%",
            background: "#E6E6E6",
            borderRadius: "5px",
          }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              <span className="flex items-center gap-1 md:gap-2 text-xs md:text-sm pt-1 mr-2 md:pt-0">
                <img src={option.img} alt="flag" />
                <span> {option.label}</span>
              </span>
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="w-4/5">
        <TextField
          label={`${t("phone")}`}
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          InputProps={{
            inputComponent: TextMaskCustom,
          }}
          fullWidth
          variant="outlined"
          color="grey"
          sx={{
            width: "100%",
            background: "#E6E6E6",
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
