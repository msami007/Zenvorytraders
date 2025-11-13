import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get In <span className="text-blue-600">Touch</span>
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We're here to help you with any questions about our products, services, or your orders. 
          Reach out to us and we'll get back to you promptly.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Contact Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Contact Information */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center lg:text-left mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                <span className="text-2xl">💬</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Start a Conversation</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you have questions about our products, need support with an order, 
                or want to explore partnership opportunities, we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-lg">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                  <p className="text-gray-700">
                    5900 BALCONES DR STE 19007<br />
                    AUSTIN, TX 78731
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-lg">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">USA:</span> +1 (512) 543-0711
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Pakistan:</span> +92 325 9727004
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-lg">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <div className="space-y-2">
                    <a
                      href="mailto:info@mejistify.com"
                      className="block text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      info@mejistify.com
                    </a>
                    <a
                      href="mailto:sales@mejistify.com"
                      className="block text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      sales@mejistify.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-lg">🕒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center lg:text-left mb-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Subject *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                  <option>General Inquiry</option>
                  <option>Product Information</option>
                  <option>Order Support</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Message *</label>
                <textarea
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">
                  I agree to the privacy policy and terms of service
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="text-blue-600">Office</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Come see us in person! We'd love to welcome you to our Austin headquarters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-96">
                <iframe
                  title="Mejistify Traders Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.74292825507!2d-97.75986558488036!3d30.344150881777202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644ca2e5b8efb77%3A0x91b8aeb295b64f1b!2s5900%20Balcones%20Dr%20STE%2019007%2C%20Austin%2C%20TX%2078731%2C%20USA!5e0!3m2!1sen!2s!4v1730699943348!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                ></iframe>
              </div>
            </div>

            {/* Directions Info */}
            <div className="text-center lg:text-left space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Directions</h3>
                <p className="text-gray-600 mb-6">
                  Located in the heart of Austin, our office is easily accessible 
                  with ample parking and public transportation options.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=5900+Balcones+Dr+STE+19007,+Austin,+TX+78731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl w-full lg:w-auto"
                >
                  <span>🗺️</span>
                  Get Directions
                </a>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Parking Information</h4>
                  <p className="text-gray-600 text-sm">
                    Free parking available in the building garage. Visitor spots 
                    are located on levels 1-3.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Contact us today and discover how we can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15125430711"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
            >
              📞 Call Now
            </a>
            <a
              href="mailto:info@mejistify.com"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-200"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;