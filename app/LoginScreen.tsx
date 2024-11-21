import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {setItem, getItem} from "./utils/AsyncStorage.js";

const LoginScreen = () => {
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState<string>("");
  const otpServiceDown = false;

  useEffect(() => {
    const fetchMobileNumber = async () => {
      try {
        const mobileNum = await getItem("mobileNo"); 
        if (mobileNum) {
          setMobileNo(JSON.parse(mobileNum));
        }
      } catch (error) {
        console.error("Error fetching mobile number:", error);
      }
    };

    fetchMobileNumber(); 
  }, []);
  

  const handleLogin = async () => {
    if (mobileNo) {
      setItem("mobileNo", mobileNo);
      try {
        const resp = await fetch(`http://gbmp.spring.money:3000/auth/otp?mobile_number=${mobileNo}`);
        console.log("User Mobile no is:",mobileNo, "Response received:",resp);
        if (resp && resp.status === 200) {
          router.push("/otp-verify");
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  };

  const isButtonActive = mobileNo.length === 10;

  return (
    <View className="flex-1 bg-[#f8eeda] px-5 py-6 md:items-center">
      <View className="max-w-md">
    <Ionicons name="arrow-back" size={24} color="#333" className="mb-4" />

    <Text className="text-gray-700 text-2xl font-semibold mt-10">Login with your mobile</Text>
    <Text className="text-gray-600 text-base font-normal">
      Enter your mobile number to get started or continue your investment journey.
    </Text>

    <View className="flex flex-col mt-8 mb-8 bg-white px-4 py-6 rounded-3xl">
      <Text className="text-gray-800 text-sm font-medium">Mobile Number</Text>
      <View className="flex-row mt-4 items-center border border-gray-300 rounded-lg px-3 py-2 mb-4">
        <Ionicons name="call-outline" size={20} color="#A0A0A0" />
        <TextInput
          className="w-full focus:outline-none"
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNo}
          onChangeText={setMobileNo}
        />
      </View>
      <View className="flex-row items-center bg-[#EDF2FF] p-3 rounded-lg">
        <Ionicons name="link-outline" size={20} color="#5A67D8" />
        <Text className="text-xs text-indigo-600 ml-2 p-2">
          Your Money Plan Report is linked to your mobile number so that you can track your goal progress anytime.
        </Text>
      </View>
    </View>

    <TouchableOpacity
      className={`py-4 rounded-lg ${
        isButtonActive ? "bg-indigo-600" : "bg-indigo-200"
      }`}
      onPress={handleLogin}
      disabled={!isButtonActive}
    >
      <Text
        className={`text-center text-base font-semibold ${
          isButtonActive ? "text-white" : "text-gray-500"
        }`}
      >
        Login
      </Text>
    </TouchableOpacity>
    </View>
  </View>
  );
};


export default LoginScreen;
