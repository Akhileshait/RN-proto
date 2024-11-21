
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputKeyPressEventData } from "react-native";
import {  useRouter } from "expo-router";
import Checkbox from 'expo-checkbox';
import {setItem, getItem} from "./utils/AsyncStorage.js";

export default function OtpVerify() {
  const router = useRouter();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isVerifyOtpEnabled, setIsVerifyOtpEnabled] = useState<boolean>(false);
  const [isTncChecked, setIsTncChecked] = useState<boolean>(false);
  const logedInSuccessfully = false;
  const incorrectOtp = false;
  const otpServiceDown = false;

  const urlParams = new URLSearchParams(window.location.search);
  const mobileNumber = urlParams.get('mobile');


  const handleInputChange = (text:string, ind:number) =>{
    const newOtp = [...otp];
    newOtp[ind] = text;
    setOtp(newOtp);

    if (text && ind < otp.length - 1) {
      inputRefs.current[ind + 1]?.focus();
    }
  }

  const handleVerifyOtp = async () => {
    const mobileNo = mobileNumber;
    console.log(mobileNo, otp.join(""));
    if (!mobileNo) {
      router.push("/LoginScreen");
      return;
    }
    if (otp.join("").length !== 6) {
      return;
    }
    window.FlutterChannel.postMessage("otp_verified");

    // const resp = await fetch("http://gbmp.spring.money:3000/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     is_tnc_agreed: true,
    //     mobile_number: mobileNo,
    //     otp: otp.join(""),
    //   }),
    // });

    // const respJson = await resp.json();

    // if (respJson && respJson.statusCode === 200) {
    //   // console.log(window);
    //   console.log("Logged in successfully")
    // } else {
    //   console.error("Error logging in", respJson);
    // }
  };

  const handleKeyPress = (e:any, idx:number) => {
    if (e.nativeEvent.key === "Backspace" && idx > 0 && !otp[idx]) {
      inputRefs.current[idx - 1]?.focus(); // Focus previous input on backspace
    }
  };


  useEffect(() => {
    if (otp.join("").length === 6 && isTncChecked) {
      setIsVerifyOtpEnabled(true);
    } else {
      setIsVerifyOtpEnabled(false);
    }
  }, [otp, isTncChecked]);

  return (
    <View className="flex-col  bg-[#f8eeda] bg-gradient-background pt-4 px-4 min-h-screen md:items-center">

      <View className="max-w-md">

      <Text className="text-gray-700 text-2xl font-semibold mt-10">
        Login with your mobile
      </Text>
      <Text className="text-gray-600 text-base font-normal">
        Enter your mobile number to get started or continue your investment
        journey.
      </Text>
      <View className="flex flex-col mt-8 bg-white px-4 py-6 rounded-3xl">
        {!logedInSuccessfully && (
          <>
            <Text className="text-gray-800 text-lg font-medium">
              Enter OTP to verify
            </Text>
            {otpServiceDown ? (
              <View className="p-4 rounded-2xl bg-error-25 mt-4">
                <Text className="text-error-600 text-base font-normal">
                  The OTP service is down, please try again in few minutes.
                </Text>
              </View>
            ) : (
              <>
                <Text className="text-gray-600 text-sm font-normal mt-4 ">
                  Enter the OTP sent to the registered mobile number 93XXXXX434
                  to verify your account.
                </Text>
                <View className="flex-row gap-4 mt-4 justify-center">
                  {Array(6)
                    .fill(0)
                    .map((_, idx) => (
                      <TextInput
                        key={idx}
                        ref={(ref) => (inputRefs.current[idx] = ref)}
                        keyboardType="numeric"
                        maxLength={1}
                        onKeyPress={(e) => handleKeyPress(e, idx)}
                        className={`h-[52px] w-[44px] p-3 text-center border border-gray-500 focus:outline-none focus:ring-2 rounded-lg ${
                          incorrectOtp
                            ? "focus:ring-error-600"
                            : "focus:ring-blue-500"
                        }`}
                        value={otp[idx]} // Bind input value to state
                        onChangeText={(text) => handleInputChange(text, idx)}
                       
                      />
                    ))}
                </View>
                {incorrectOtp && (
                  <Text className="text-error-600 text-sm font-normal mt-2">
                    Incorrect OTP, try again.
                  </Text>
                )}
                <View className="flex-row justify-between mt-4">
                  <Text className="text-gray-600 text-sm font-normal">
                    Time remaining: 00:59
                  </Text>
                  <Text className="text-gray-500 text-sm font-medium">
                    Resend OTP
                  </Text>
                </View>
              </>
            )}
          </>
        )}
        {!otpServiceDown && (
          <View
            className={`flex-row gap-2 mt-6 ${
              logedInSuccessfully && "justify-center items-center"
            }`}
          >
            {logedInSuccessfully ? (
              <Text className="text-gray-800 text-xl font-medium mt-16">
                You’ve logged in successfully!
              </Text>
            ) : (
              <View className="flex-row gap-2 items-center">
                <Checkbox
                    // title="Check me!"
                    value={isTncChecked}
                    onValueChange={setIsTncChecked}
                />
                <Text className="text-gray-600 text-sm font-normal">
                  I accept the{" "}
                  <Text className="text-tangerine-700 text-sm font-medium">
                    Terms and Conditions
                  </Text>{" "}
                  mentioned.
                </Text>
              </View>
            )}
          </View>
        )}
    
        <View className="mt-4 rounded-2xl bg-blue-gray-50">
          
          <Text className="text-gray-600 text-sm font-normal">
            Your Money Plan Report is linked to your mobile number so that you
            can track your goal progress anytime.
          </Text>
        </View>
      </View>
      <View className="mt-8">
        <TouchableOpacity
        className={`py-4 rounded-lg ${
            isVerifyOtpEnabled ? "bg-indigo-600" : "bg-indigo-200"
          }`}
          onPress={handleVerifyOtp}
          disabled={!isVerifyOtpEnabled}
        >
            <Text className="text-center text-white text-base font-medium">
              Verify OTP
            </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}