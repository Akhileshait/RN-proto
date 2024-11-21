
export default function Login() {
  
  return (
    <div className="flex flex-col bg-gradient-background pt-4 px-4 min-h-screen">
      <Link href="/">
        <Image
          src="/arrow-left.svg"
          alt="left arrow image"
          height={24}
          width={24}
        />
      </Link>

      <span className="text-gray-700 text-2xl font-semibold mt-10">
        Login with your mobile
      </span>
      <span className="text-gray-600 text-base font-normal">
        Enter your mobile number to get started or continue your investment
        journey.
      </span>
      <div className="flex flex-col mt-8 bg-white px-4 py-6 rounded-3xl">
        <span className="text-gray-800 text-sm font-medium">Mobile Number</span>

        {otpServiceDown ? (
          <div className="p-4 rounded-2xl bg-error-25 mt-4">
            <span className="text-error-600 text-base font-normal">
              The OTP service is down, please try again in few minutes.
            </span>
          </div>
        ) : (
          <div className="flex mt-4 p-4 gap-2 rounded-2xl border border-gray-300 bg-white">
            <Image
              src="/phone-01.svg"
              alt="phone image"
              width={19}
              height={19}
            />
            <input
              placeholder="Enter your mobile number"
              className="w-full focus:outline-none"
              value={mobileNo}
              onChange={handleInput}
            ></input>
          </div>
        )}

        <hr className="my-6"></hr>
        <div className="flex p-4 rounded-2xl bg-blue-gray-50 gap-3">
          <Image src="/link-03.svg" alt="link image" width={32} height={32} />
          <span className="text-gray-600 text-xs font-normal">
            Your Money Plan Report is linked to your mobile number so that you
            can track your goal progress anytime.
          </span>
        </div>
      </div>
      <div className="mt-8">
        <PrimaryButton
          label="Login"
          onClick={handleLoginButton}
          disabled={!isLoginEnabled}
        />
      </div>
    </div>
  );
}