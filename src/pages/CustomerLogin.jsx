import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../api/customerAuth";

const CustomerLogin = ({ open, setOpen, setCustomer }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setStep(1);
      setEmail("");
      setOtp("");
      setLoading(false);
    }
  }, [open]);

  // ✅ ALL HOOKS ALWAYS RUN FIRST
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  // ❗ render guard AFTER hooks
  if (!open) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendOtp(email);
      localStorage.setItem("customer_email", email);

      // alert("OTP sent successfully");

      setStep(2);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await verifyOtp(email, otp);
      // alert("Login successful");
      setCustomer({ email,});
      setOpen(false);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gray-500 text-xl"
        >
          ✕
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Login with Email</h2>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg"
                placeholder="Enter email"
              />

              <button className="w-full bg-black text-white py-3 rounded-full">
                {loading ? "Sending..." : "Continue"}
              </button>
            </form>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              placeholder="Enter OTP"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-black text-white py-3 rounded-full mt-4"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="text-center py-10 text-green-600 font-semibold">
            Login Successful 🎉
          </div>
        )}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold">Are you a real estate agent?</p>
          <a href="https://lightblue-moose-690494.hostingersite.com/login" className="text-sky-600 hover:underline" > Log in or create an account </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;