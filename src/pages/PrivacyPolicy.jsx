import React from "react";
import Footer from "../components/Footer";
const PrivacyPolicy = () => {
    return (
    <>
        <div className="bg-gradient-to-b from-sky-50 via-white to-white min-h-screen py-16 px-4">

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-12">
                <div className="flex justify-center mb-3 gap-2">
                    <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
                    <span className="w-2 h-2 bg-sky-300 rounded-full"></span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                    Privacy Policy
                </h1>

                <p className="text-gray-500 mt-3">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
                </div>

                {/* CONTENT */}
                <div className="space-y-6">

                {/* Section 1 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    1. Information We Collect
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    We collect personal information such as name, email address, phone number,
                    and property preferences when you use our website, submit forms, or contact us.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    2. How We Use Your Information
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    Your data is used to provide better property recommendations, respond to inquiries,
                    improve user experience, and send important updates related to our services.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    3. Data Protection
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    We implement strict security measures to protect your personal information from
                    unauthorized access, alteration, or disclosure.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    4. Cookies Policy
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    We use cookies to improve website performance, track user behavior, and personalize
                    your experience. You can disable cookies in your browser settings.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    5. Third-Party Services
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    We may use trusted third-party services for analytics, payments, and marketing.
                    These providers follow strict privacy standards.
                    </p>
                </div>

                {/* Section 6 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    6. Your Rights
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    You have the right to access, update, or delete your personal data at any time by
                    contacting our support team.
                    </p>
                </div>

                {/* Section 7 */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-sky-600 mb-2">
                    7. Changes to This Policy
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    We may update this Privacy Policy from time to time. All changes will be posted on this page.
                    </p>
                </div>

                {/* FOOTER NOTE */}
                <div className="text-center text-sm text-gray-500 mt-10">
                    Last updated: June 2026
                </div>

                </div>
            </div>
        </div>
        <Footer />    
    </>
    );
};

export default PrivacyPolicy;