import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    img: "",
  });

  const [hasPassword, setHasPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
    
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  
    const isLoggedIn = localStorage.getItem("customer_token");
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/", { replace: true });
      }
    }, [isLoggedIn, navigate]);
  
    if (!isLoggedIn) return null;
  
  useEffect(() => {
    const id = localStorage.getItem("customer_id") || null;
      
    fetch(`https://lightblue-moose-690494.hostingersite.com/api/customer/profile/${id}`)
    .then((res) => res.json())
      .then((data) => {
      
      console.log("API Response:", data);

      if (data?.data) {
        setCustomer(data.data);
        setHasPassword(data.has_password);
      }
    })
    .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setSelectedImage(file);

    setCustomer({
      ...customer,
      img: file,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(customer).forEach((key) => {
        formData.append(key, customer[key]);
    });

    const res = await fetch(
      "https://lightblue-moose-690494.hostingersite.com/api/customer/profile/update",
      {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("customer_token")}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (data.status) {
      setCustomer(data.customer);

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

      alert("Profile Updated Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleUpdatePassword = async () => {
    const res = await fetch(
      "https://lightblue-moose-690494.hostingersite.com/api/customer/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("customer_token")}`,
        },
        body: JSON.stringify({
          email: customer.email,
          ...passwordData,
        }),
      }
    );

    const data = await res.json();

    if (data.status) {
      alert(data.message);

      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* LEFT CARD */}
          <div className="bg-white rounded-3xl shadow-lg border p-6 text-center h-fit">
            <img alt="" className="w-32 h-32 rounded-full mx-auto border-4 border-sky-500 object-cover"
              src={ customer.img ? `https://lightblue-moose-690494.hostingersite.com/public${customer.img}` : `https://ui-avatars.com/api/?name=${customer.name}`}
            />

            <h2 className="text-2xl font-bold mt-4">
              {customer.name}
            </h2>

            <p className="text-gray-500">
              {customer.email}
            </p>

            <div className="mt-5">
              <input type="file" onChange={handleImage} className="w-full border rounded-xl p-2"/>
            </div>

            <div className="mt-5 space-y-3 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Phone</span>
                <span>{customer.phone || "N/A"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">City</span>
                <span>{customer.city || "N/A"}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">Country</span>
                <span>{customer.country || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-lg border p-6">
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="name" value={customer.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border rounded-xl p-3"
                />

                <input type="text" name="phone" value={customer.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border rounded-xl p-3"
                />

                <input
                  type="text"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border rounded-xl p-3"
                />

                <input
                  type="text"
                  name="state"
                  value={customer.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border rounded-xl p-3"
                />

                <input
                  type="text"
                  name="country"
                  value={customer.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border rounded-xl p-3"
                />

                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border rounded-xl p-3 md:col-span-2"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-3xl shadow-lg border p-6">
              <h3 className="text-2xl font-bold mb-6">
                {hasPassword ? "Change Password" : "Create Password"}
              </h3>

            <div className="grid gap-4">
              {hasPassword &&
                <input
                  type="password"
                  name="current_password"
                  placeholder="Current Password"
                  onChange={handlePasswordChange}
                  className="border rounded-xl p-3"
                />
              }
                <input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  onChange={handlePasswordChange}
                  className="border rounded-xl p-3"
                />

                <input
                  type="password"
                  name="new_password_confirmation"
                  placeholder="Confirm Password"
                  onChange={handlePasswordChange}
                  className="border rounded-xl p-3"
                />
              </div>

              <button
                onClick={handleUpdatePassword}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                {hasPassword ? "Update Password" : "Create Password"}
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerProfile;