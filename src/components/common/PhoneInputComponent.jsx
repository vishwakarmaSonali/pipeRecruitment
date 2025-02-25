import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputComponent = ({ phone, onChange }) => {
  const [phoneNumber, setphoneNumber] = useState(phone || "");

  useState(() => {
    if (!!phone) {
      setphoneNumber(phone);
    }
  }, []);

  return (
    <div className="phone-input-style">
      <PhoneInput
        country={"us"}
        value={phoneNumber}
        onChange={(text) => {
          setphoneNumber(text);
          onChange(text);
        }}
        enableSearch
        containerStyle={{
          outline: "none",
          border: "none",
        }}
        searchStyle={{
          outline: "none",
          border: "none",
        }}
        dropdownStyle={{
          outline: "none",
          border: "none",
        }}
        buttonStyle={{
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
};

export default PhoneInputComponent;
