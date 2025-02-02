"use client";
import { useState } from "react";
import Image from "next/image";
import ESSENTIALS_IMG from "../../../public/assets/Study Essentials.png";
import SignInForm from "../../components/account/SignInForm";
import SignUpForm from "../../components/account/SignUpForm";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSwitchToSignUp = () => {
    setIsSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="bg-green-500 md:w-2/3 w-full h-2/3 md:h-full order-2 md:order-1 flex items-center justify-center">
        {isSignUp ? (
          <SignUpForm onSwitchToSignIn={handleSwitchToSignIn} />
        ) : (
          <SignInForm onSwitchToSignUp={handleSwitchToSignUp} />
        )}
      </div>

      <div className="bg-green-500 md:w-1/3 w-full h-1/3 md:h-full order-1 md:order-2 flex items-center justify-center">
        <div className="h-full w-full bg-green-300 md:rounded-l-3xl rounded-b-3xl flex items-center justify-center">
          <div className="text-center">
            <Image
              src={ESSENTIALS_IMG}
              alt="A-Board Essentials"
              width={300}
              height={230}
              className="w-[170px] h-[130px] md:w-[300px] md:h-[230px] px-3"
            />
            <p className="font-castoro text-center font-normal text-[26px] md:text-[24px] text-white italic">
              a Board
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
