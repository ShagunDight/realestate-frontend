export const sendOtp = async (email) => {
  const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/customer/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }

  return data;
}; 

/**
 * STEP 2: Verify OTP
 */
export const verifyOtp = async (email, otp) => {
  const res = await fetch("https://lightblue-moose-690494.hostingersite.com/api/customer/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Invalid OTP");
  }

  if (data.token) {
    localStorage.setItem("customer_token", data.token);
    localStorage.setItem("customer_email", email);
  }

  return data;
};