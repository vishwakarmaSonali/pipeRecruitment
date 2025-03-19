import React, { useEffect, useState } from "react";
import { LoginInfo, sourcingHubInfo } from "../Tools/Sourcing/config";
import Logo from "../../assets/icons/logo.svg";
import "./SignUpPage.css";
import CommonTextInput from "../../components/common/CommonTextInput";
import CommonButton from "../../components/common/CommonButton";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notifyError } from "../../helpers/utils";
const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@yopmail.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleLogin = () => {
    console.log("Logging in with", { email, password });
    dispatch(loginUser(email, password)).then((response) => {
      if (response?.success) {
        navigate("/sourcing"); // Redirect to Sourcing when logged in
      } else {
        notifyError(response);
      }
    });
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
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="text-right mt-2 text-customBlue font-ubuntu text-sm pb-[32px] ">
              <a href="#" className="text-buttonBLue text-sm">
                Forgot Password?
              </a>
            </div>

            <div className="items-center flex justify-center">
              <CommonButton title={"Log In"} onClick={handleLogin} />
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
