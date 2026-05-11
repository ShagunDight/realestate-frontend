import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import Services from "./pages/Services";
import { LoadScript } from "@react-google-maps/api";
const API_KEY = "AIzaSyD-5EHYR_BK19i4x7gASRqFx0qvVW0u28w";

function App() {
  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </LoadScript>
  );
}

export default App;
