import React, { useEffect, useState } from "react";
import { LoginInfo, sourcingHubInfo } from "../Tools/Sourcing/config";
import Logo from "../../assets/icons/logo.svg";
import "./Login.css";
import CommonTextInput from "../../components/common/CommonTextInput";
import CommonButton from "../../components/common/CommonButton";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notifyError } from "../../helpers/utils";
const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@yopmail.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleLogin = () => {
    console.log("Logging in with", { email, password });
    dispatch(loginUser(email, password)).then(response=>{
      if(response?.success){
        navigate("/sourcing"); // Redirect to Sourcing when logged in
      }
      else{
        notifyError(response)
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
        <div className="sourcing-main-inner-div items-center justify-center h-full">
          <h2 className="text-3xl font-medum font-ubuntu">Log In</h2>
          <p className="text-customGray font-ubuntu text-m mt-[6px] mb-[80px]">
            {
              "Welcome back! Log in to manage your recruitment \n workflow effortlessly."
            }
          </p>

          <div className="w-96 space-y-4">
            <div className="space-y-2">
              <label className="block text-customBlue font-ubuntu text-sm mb-1">
                Email Id here
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
                  className="w-full border p-2 rounded pr-10"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3 top-3 text-gray-600"
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

export default LoginAdmin;
