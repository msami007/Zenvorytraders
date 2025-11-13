import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Partners in Trade. Let's upscale our business together!{" "}
          </h1>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <img
            src="/about-cover.jpg" // Replace with your actual cover image path
            alt="mejistify Traders Distribution Center"
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";
            }}
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* From Humble Beginnings Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              From Humble Beginnings to Wholesale Pioneers
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                In 2005, with a dream to revolutionize the wholesale industry, mejistify Traders was born. What started as a small operation with big aspirations has grown into a trusted name in the world of wholesale distribution. Our journey began with a single warehouse, a handful of products, and a passion for connecting retailers with top-quality brands at unbeatable prices.
              </p>
            </div>
          </section>

          {/* Driven by Passion Section */}
          <section className="bg-blue-50 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Driven by Passion and Purpose
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                Our founders envisioned a company that didn't just sell products but built lasting relationships. They believed in the power of integrity, hard work, and exceptional customer service. With these core values at heart, mejistify Traders set out on a mission to become a leading supplier of premium products across the USA.
              </p>
            </div>
          </section>

          {/* Partnership Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Trusted Partnerships
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                <strong>Partner with Imaging Supplies Wholesale Group Inc</strong><br />
                mejistify Traders, a leading wholesale distributor in the USA, specializes in offering top-selling brand products at unbeatable prices. All payments for our website, brandmasterswholesale.com, are processed securely through the bank accounts of our trusted partner company, Imaging Supplies Wholesale Group Inc and Go Swift Logistics LLC. This ensures a seamless and reliable transaction process for our customers.
              </p>
            </div>
          </section>

          {/* We Love What We Do Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-xl text-white text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Love What We Do
              </h2>
              <p className="text-xl md:text-2xl font-light opacity-90">
                At mejistify Traders, our passion drives us to connect you with the best brands, ensuring quality and satisfaction in every product we offer.
              </p>
            </div>
          </section>

          {/* Growing with Partners Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Growing with Our Partners
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl">
                Over the years, we've forged strong partnerships with some of the most reputable brands in the industry. Our commitment to quality and reliability has earned us the trust of countless retailers who depend on us to keep their shelves stocked with the latest and greatest products. From household essentials to trendy gadgets, we curate a diverse range of items that cater to the ever-changing needs of our customers.
              </p>
            </div>
          </section>

          {/* Innovation Section */}
          <section className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Innovation at Our Core
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl">
                As the industry evolved, so did we. Embracing technological advancements, we streamlined our operations and enhanced our services to better serve our partners. Our state-of-the-art distribution center and robust logistics network ensure that products reach our clients swiftly and efficiently. We pride ourselves on staying ahead of the curve, constantly seeking innovative ways to improve our offerings and exceed expectations.
              </p>
            </div>
          </section>

          {/* Commitment to Excellence Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              A Commitment to Excellence
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                At mejistify Traders, excellence isn't just a goal; it's our standard. Every product we distribute undergoes rigorous quality checks to ensure it meets our high standards. Our dedicated team works tirelessly to provide exceptional service, offering personalized solutions and expert advice to help our partners succeed.
              </p>
            </div>
          </section>

          {/* Looking Ahead Section */}
          <section className="bg-blue-50 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Looking Ahead
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl">
                As we reflect on our journey from a small startup to a wholesale powerhouse, we're filled with gratitude for the trust and support of our partners. Looking ahead, we remain committed to our mission of delivering unparalleled value and service. We will continue to adapt, innovate, and grow, always striving to be the wholesale distributor of choice for retailers across the nation.
              </p>
            </div>
          </section>

          {/* Join Us Section */}
          <section className="text-center bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Us on Our Journey
            </h2>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're a seasoned retailer or a new business owner, we invite you to join us on our journey. Discover the difference that dedication, quality, and innovation can make. Together, let's build a brighter future, one shipment at a time.
            </p>
            <div className="bg-white/10 rounded-2xl p-6 inline-block backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-bold">
                Welcome to Mejistify Traders – Where Quality Meets Reliability.
              </p>
            </div>
          </section>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">18+</div>
            <div className="text-gray-700 font-semibold">Years of Excellence</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-700 font-semibold">Brand Partners</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-700 font-semibold">States Served</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;