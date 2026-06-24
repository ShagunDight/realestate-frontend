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

    localStorage.setItem(
      "customer",
      JSON.stringify({
        id: data.customer._id || data.customer.id,
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone || null,
        image: data.customer.img || null,
      })
    );
    localStorage.setItem("customer_id", data.customer._id || data.customer.id);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return data;
};

export const loginWithPassword = async (email, password) => {
  const res = await fetch(
    "https://lightblue-moose-690494.hostingersite.com/api/customer/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  if (data.token) {
    localStorage.setItem("customer_token", data.token);

    localStorage.setItem(
      "customer",
      JSON.stringify({
        id: data.customer._id || data.customer.id,
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone || null,
        image: data.customer.img || null,
      })
    );
    localStorage.setItem("customer_id", data.customer._id || data.customer.id);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return data;
};