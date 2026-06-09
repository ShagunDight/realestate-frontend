import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../components/WishlistContext";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("customer_token");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* HEADER */}
          <div className="bg-white border border-sky-100 rounded-3xl p-6 md:p-10 mb-10 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-600">
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Your saved properties appear here. You can view or remove them anytime.
            </p>
          </div>

          {/* EMPTY STATE */}
          {wishlist.length === 0 ? (
            <div className="bg-white border border-dashed border-sky-200 rounded-3xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">🏠</div>

              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Properties Saved Yet
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                Start exploring properties and click the ❤️ icon to save your favorites here.
              </p>

              <a
                href="/properties"
                className="inline-block bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition shadow-md"
              >
                Explore Properties
              </a>
            </div>
          ) : (
            <>
              {/* COUNT */}
              <div className="mb-6 text-sm text-gray-500">
                Total Saved:{" "}
                <span className="font-semibold text-sky-600">
                  {wishlist.length}
                </span>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {wishlist.map((property) => (
                  <div key={property._id || property.id} className="hover:-translate-y-1 transition duration-300">
                    <PropertyCard item={property} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default WishlistPage;