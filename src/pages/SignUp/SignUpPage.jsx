import React, { useEffect, useState } from "react";
import { LoginInfo, sourcingHubInfo } from "../Tools/Sourcing/config";
import Logo from "../../assets/icons/logo.svg";
import "./SignUpPage.css";
import CommonTextInput from "../../components/common/CommonTextInput";
import CommonButton from "../../components/common/CommonButton";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notifyError } from "../../helpers/utils";
import { ReactComponent as EyeOpen } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeClose } from "../../assets/icons/eyeclose.svg";
import { ReactComponent as DotIcon } from "../../assets/icons/dot.svg";
import PhoneInputComponent from "../../components/common/PhoneInputComponent";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false); // 🚀 New state
  const [countryCallingCode, setCountryCallingCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { loading } = useSelector((state) => state.auth);

  // ✅ Validation Checks
  const conditions = [
    { text: "Minimum characters 8", valid: password.length >= 8 },
    { text: "One uppercase character", valid: /[A-Z]/.test(password) },
    { text: "One lowercase character", valid: /[a-z]/.test(password) },
    { text: "One special character", valid: /[@$!%*?&]/.test(password) },
    { text: "One number", valid: /\d/.test(password) },
  ];

  // Handle Signup API Call
  const handleSignup = async () => {
    setValidationTriggered(true); // 🚀 Enable validation check on button click

    // 🛑 Check if required fields are empty
    if (!firstName || !lastName || !email || !password || !organisationName) {
      notifyError("All fields are required.");
      return;
    }

    // 🛑 Check if passwords match
    if (password !== confirmPassword) {
      notifyError("Passwords do not match.");
      return;
    }

    // 🛑 Check if password meets all conditions
    if (!conditions.every((condition) => condition.valid)) {
      notifyError("Please ensure your password meets all requirements.");
      return;
    }

    // 🚀 Construct user data for API call
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      roleIds: ["67d67203c8c8da4cc4dfb6a3"], // Default role ID
    };

    try {
      const response = await dispatch(registerUser(userData));

      if (response?.success) {
        alert("✅ Registration successful!");
        navigate("/sourcing"); // 🎯 Redirect to sourcing on success
      } else {
        notifyError(response?.message || "Something went wrong. Try again!");
      }
    } catch (error) {
      notifyError("❌ Registration failed. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  const NoFiltersScreen = () => {
    return (
      <div className="sourcing-main-inner-div ">
        <img src={Logo} alt="logo" className="w-[239px] h-[46px] " />
        <div className="display-flex-20 mt-[100px]">
          {LoginInfo?.map((item) => {
            return (
              <div key={item?.id} className="sourcing-info-div">
                <img src={item?.image} className="sourcing-info-img" />
                <div className="display-column-8">
                  <p className="sourcing-info-title-text">{item?.name}</p>
                  <p className="sourcing-info-decription-text">{item?.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-3/4 bg-white flex flex-col justify-center items-center p-10">
        {NoFiltersScreen()}
      </div>

      {/* Right Side */}
      <div className="w-2/4 flex flex-col justify-center items-center bg-customGrey1 p-10 ">
        <div className="items-center  h-full">
          <div className="gap-[80px]">
            <h2 className="text-3xl font-medum text-center font-ubuntu mt-[39px]">
              Sign Up
            </h2>
            <p className="text-customGray text-center font-ubuntu text-m mt-[16px] ">
              {
                "Create an account to manage your recruitment workflow effortlessly."
              }
            </p>
          </div>

          <div className="w-96 mt-[80px] space-y-4">
            <div className=" flex w-full gap-[10px]">
              <div className="flex-1">
                <label className="block text-customBlue text-left font-ubuntu text-sm mb-1">
                  First Name
                </label>
                <CommonTextInput
                  type="default"
                  className="w-full border p-2 rounded mb-4"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-customBlue text-left font-ubuntu text-sm mb-1">
                  Last Name
                </label>
                <CommonTextInput
                  type="default"
                  className="w-full border p-2 rounded mb-4"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-customBlue text-left font-ubuntu text-sm mb-1">
                Organisation Name
              </label>
              <CommonTextInput
                type="default"
                className="w-full border p-2 rounded mb-4"
                placeholder="Recruitment Agency Name"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-customBlue font-ubuntu text-sm mb-1">
                Organisation Email Id
              </label>
              <CommonTextInput
                type="email"
                className="w-full border p-2 rounded mb-4"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-1 bg-white rounded-[8px]">
              <PhoneInputComponent
                phoneNumber={phoneNumber}
                callingCode={countryCallingCode}
                selectedPhoneNumber={(item) => {
                  setPhoneNumber(item?.phoneNumber);
                  setCountryCallingCode(item?.callingCode);
                }}
                setValid={(item) => console.log(">>>>>>>>>setValid", item)}
              />
            </div>
            <div>
              <label className="block text-customBlue font-ubuntu text-sm mb-1">
                Password
              </label>
              <div className="relative">
                <CommonTextInput
                  type={showPassword ? "text" : "password"}
                  className="w-full border p-2 rounded pr-10" // Ensure padding-right for icon
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button" // Ensure button doesn't submit form
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOpen height={"14px"} width={"14px"} />
                  ) : (
                    <EyeClose height={"14px"} width={"14px"} />
                  )}
                </button>
              </div>
              <span className="font-ubuntu text-sm text-customBlue">
                Please enter all necessary characters to create safe password
              </span>
              {/* Password Conditions */}
              <ul className="mt-2 space-y-2">
                {conditions.map((condition, index) => {
                  const isInvalid = validationTriggered && !condition.valid; // 🚀 Highlight unmet conditions only after button click

                  return (
                    <li
                      key={index}
                      className={`flex items-center space-x-2 ${
                        isInvalid
                          ? "text-red-500"
                          : condition.valid
                          ? "text-green"
                          : "text-customGray"
                      }`}
                    >
                      <DotIcon
                        style={{
                          fill: isInvalid
                            ? "#FF0000"
                            : condition.valid
                            ? "#46A13C"
                            : "#797979",
                        }}
                      />
                      <span
                        className={`text-sm font-ubuntu ${
                          isInvalid
                            ? "text-red-500"
                            : condition.valid
                            ? "text-green-600"
                            : "text-customGray"
                        }`}
                      >
                        {condition.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <label className="block text-customBlue font-ubuntu text-sm mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <CommonTextInput
                  type={showPassword ? "text" : "password"}
                  className="w-full border p-2 rounded pr-10" // Ensure padding-right for icon
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button" // Ensure button doesn't submit form
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOpen height={"14px"} width={"14px"} />
                  ) : (
                    <EyeClose height={"14px"} width={"14px"} />
                  )}
                </button>
              </div>
            </div>

            <div className="items-center flex justify-center">
              <CommonButton title={"Sign Up"} onClick={handleSignup} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <p className="text-customBlue font-ubuntu text-sm text-center">
            Having any trouble?{" "}
            <a href="#" className="text-buttonBLue">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
