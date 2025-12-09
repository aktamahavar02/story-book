import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginGoogle } from "../../../store/slices/loginSlice.js";
import google from "../../assets/svgs/google.svg";
import axios from "axios";
import { countryList, currencyList } from "../../../store/slices/loginSlice.js";

import { cookie } from "../../utils/cookies.js";
export default function GoogleCustomButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryGet = useSelector((state) => state?.bookTemplate?.country);
  const currencyData = useSelector((state) => state?.bookTemplate?.currency);

  return (
    <div className="w-full">
      <div style={{ display: "none" }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            dispatch(
              loginGoogle({
                access_token: credentialResponse.credential,
                shipTo: countryGet?.countryCode,
                currency: currencyData?.currencyCode,

                onSuccess: () => {

                  cookie.remove("adminToken");
                  cookie.remove("adminRefreshToken");
                  navigate("/");
                },
              })
            );
          }}
          onError={() => {
            console.error("Google Login Failed");
          }}
        />
      </div>

      <button
        onClick={() => {
          const btn = document.querySelector('div[role="button"]');
          if (btn) (btn as HTMLElement).click();
        }}
        type="button"
        className="w-full border border-gray-300 py-2 rounded-md flex justify-center items-center"
      >
        <img src={google} alt="Google" className="h-6" />
      </button>
    </div>
  );
}
