// PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
              <p className="mb-6">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you visit our website or make a purchase from us. 
                Please read this privacy policy carefully. If you do not agree with the terms of this 
                privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us when you create an account, make a purchase, 
                subscribe to our newsletter, or communicate with us. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Personal identification information (Name, email address, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (credit card details, PayPal information)</li>
                <li>Order history and preferences</li>
                <li>Communication preferences</li>
                <li>Device and usage information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect in various ways, including to:</p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Process and fulfill your orders and transactions</li>
                <li>Send you order confirmations, updates, and shipping notifications</li>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website and services</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Find and prevent fraud and unauthorized transactions</li>
                <li>Comply with legal obligations and resolve disputes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational security measures designed to protect 
                your personal information against accidental or unlawful destruction, loss, alteration, 
                unauthorized disclosure, unauthorized access, and other unlawful or unauthorized forms of 
                processing. We use secure server technology (SSL) to encrypt your personal and payment 
                information during transmission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our store and hold 
                certain information. Cookies are files with a small amount of data which may include an 
                anonymous unique identifier. You can instruct your browser to refuse all cookies or to 
                indicate when a cookie is being sent. However, if you do not accept cookies, you may not 
                be able to use some portions of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
              <p className="mb-4">
                We may employ third-party companies and individuals to facilitate our service, provide the 
                service on our behalf, perform service-related services, or assist us in analyzing how our 
                service is used. These third parties have access to your personal information only to perform 
                these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify or update your personal data</li>
                <li>Delete your personal data</li>
                <li>Restrict or object to the processing of your personal data</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>Withdraw consent at any time where we rely on consent to process your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention</h2>
              <p className="mb-6">
                We will retain your personal information only for as long as is necessary for the purposes 
                set out in this Privacy Policy. We will retain and use your information to the extent 
                necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-6">
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
                advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="mb-2">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-blue-600 font-medium">sales@zenvorytradersllc.com</p>
              <p className="mt-4">Last Updated: {new Date().getFullYear()}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;