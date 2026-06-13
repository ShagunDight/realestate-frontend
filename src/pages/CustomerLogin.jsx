import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, loginWithPassword } from "../api/customerAuth";

const CustomerLogin = ({ open, setOpen, setCustomer }) => {
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const [tab, setTab] = useState("otp");
  const [step, setStep] = useState(1);

  const [userState, setUserState] = useState({
    exists: false,
    hasPassword: false,
    checked: false,
  });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setPassword("");
      setError("");
      setTab("otp");
      setUserState({ exists: false, hasPassword: false, checked: false });
    }
  }, [open]);

  if (!open) return null;

  const otpValue = otp.join("");

  // ✅ CHECK USER (IMPORTANT)
  const checkUser = async (emailValue) => {
    if (!emailValue) return null;
    try {
      const res = await fetch(
        "http://127.0.0.1:8001/api/customer/check-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailValue }),
        }
      );

      const data = await res.json();

      setUserState({
        exists: data.exists,
        hasPassword: data.has_password,
        checked: true,
      });

      return data;
    } catch (err) {
      setError("Something went wrong");
    }
  };

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await sendOtp(email);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await verifyOtp(email, otpValue);

      setCustomer({ email, token: res.token });
      setOpen(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD LOGIN
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await loginWithPassword(email, password);

      setCustomer(res.customer);
      localStorage.setItem("customer_token", res.token);

      setOpen(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-black/40 backdrop-blur-sm">

      {/* CARD WRAPPER */}
      <div className="w-full max-w-md relative">

        <div className="relative bg-white rounded-3xl shadow-2xl p-7 overflow-hidden border border-blue-100">

          {/* BLUE GLOW (SOFT ONLY) */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-200 blur-3xl opacity-40 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full"></div>

          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 text-gray-400 hover:text-blue-600 text-2xl"
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
              Log In / Sign Up
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Access your saved properties & premium listings
            </p>
          </div>

          {/* TABS */}
          <div className="flex bg-gray-100/70 p-1 rounded-full mb-6">
            <button
              onClick={() => setTab("otp")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                tab === "otp"
                  ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-600"
              }`}
            >
              OTP Login ⚡
            </button>

            <button
              onClick={async () => {
                setTab("password");
                await checkUser(email);
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                tab === "password"
                  ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-600"
              }`}
            >
              Password 🔑
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 bg-blue-50 border border-blue-100 text-blue-700 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* OTP LOGIN */}
          {tab === "otp" && (
            <>
              {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">

                  <p className="text-sm text-gray-600">
                    Enter email to receive secure OTP
                  </p>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-sky-400 outline-none"
                  />

                  <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-blue-500 shadow-lg hover:scale-[1.02] transition">
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">

                  <p className="text-sm text-gray-600">
                    Enter 6-digit OTP sent to your email
                  </p>

                  <div className="flex justify-between gap-2">
                    {otp.map((val, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        maxLength={1}
                        value={val}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[i] = e.target.value;
                          setOtp(newOtp);
                        }}
                        className="w-12 h-12 text-center text-lg rounded-xl border border-blue-100 focus:ring-2 focus:ring-sky-400 outline-none"
                      />
                    ))}
                  </div>

                  <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-blue-500 shadow-lg hover:scale-[1.02] transition">
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                </form>
              )}
            </>
          )}

          {/* PASSWORD LOGIN */}
          {tab === "password" && (
            <>
              {userState.checked && !userState.exists && (
                <p className="text-sm text-red-500 mb-3 text-center">
                  No account found — please use OTP login
                </p>
              )}

              <form onSubmit={handlePasswordLogin} className="space-y-4">

                <p className="text-sm text-gray-600">
                  Login with password (if already set)
                </p>

                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-sky-400 outline-none"
                />

                <input
                  type="password"
                  placeholder={
                    userState.hasPassword
                      ? "Enter password"
                      : "Create password after OTP login"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-sky-400 outline-none"
                />

                <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-blue-500 shadow-lg hover:scale-[1.02] transition">
                  {loading ? "Processing..." : "Continue"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  New users should start with OTP login
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;