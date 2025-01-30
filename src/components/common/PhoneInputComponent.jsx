import React, { useState } from "react";
import {
  parsePhoneNumber,
  getCountryCallingCode,
  getCountries,
} from "libphonenumber-js";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const PhoneInputComponent = () => {
  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  return (
    <PhoneInput
      id="phone-number"
      placeholder="Phone Number"
      value={phoneNumberValue}
      onChange={setPhoneNumberValue}
      defaultCountry="IN"
      flags={flags}
      limitMaxLength
      error={
        phoneNumberValue
          ? isValidPhoneNumber(phoneNumberValue)
            ? undefined
            : "Invalid phone number"
          : "Phone number required"
      }
      className={"phone-input-style"}
    />
  );
};

export default PhoneInputComponent;
