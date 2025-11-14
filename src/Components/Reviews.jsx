import React from "react";

const reviews = [
  {
    name: "Sarah Johnson",
    username: "@sarah_johnson",
    body: "The quality of fresh produce is outstanding! My fruits and vegetables always arrive crisp and fresh. Highly recommend!",
    img: "/girl1.jpeg",
    orderType: "Weekly Grocery",
    location: "New York, USA",
    rating: 5,
  },
  {
    name: "Mike Chen",
    username: "@mike_chen",
    body: "Fast delivery and excellent packaging. Everything was perfectly preserved with ice packs. Will definitely order again!",
    img: "https://avatar.vercel.sh/mike",
    orderType: "Organic Delivery",
    location: "San Francisco, USA",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    username: "@emily_rodriguez",
    body: "Love the variety of international products available. Found everything I needed for my special recipes in one place.",
    img: "/girl2.jpeg",
    orderType: "International Foods",
    location: "Miami, USA",
    rating: 5,
  },
  {
    name: "David Thompson",
    username: "@david_thompson",
    body: "The mobile app makes grocery shopping so convenient. Easy to browse, quick checkout, and reliable delivery times.",
    img: "/boy1.jpeg",
    orderType: "Mobile App Order",
    location: "Chicago, USA",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    username: "@lisa_wang",
    body: "Excellent customer service! When one item was out of stock, they called me immediately with substitution options.",
    img: "https://avatar.vercel.sh/lisa",
    orderType: "Family Grocery",
    location: "Seattle, USA",
    rating: 5,
  },
  {
    name: "James Wilson",
    username: "@james_wilson",
    body: "Prices are competitive and the quality is consistently good. Saved me so much time on weekly shopping!",
    img: "/boy2.jpeg",
    orderType: "Budget Shopping",
    location: "Austin, USA",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    username: "@maria_garcia",
    body: "The organic section has amazing variety. My family loves the fresh, chemical-free products delivered to our door.",
    img: "https://avatar.vercel.sh/maria",
    orderType: "Organic Grocery",
    location: "Los Angeles, USA",
    rating: 5,
  },
  {
    name: "Robert Kim",
    username: "@robert_kim",
    body: "Good service overall, though delivery was slightly delayed during peak hours. Products were fresh and well-packed.",
    img: "https://avatar.vercel.sh/robert",
    orderType: "Express Delivery",
    location: "Boston, USA",
    rating: 4,
  },
];

const Reviews = () => {
  return (
  <div className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-gray-50 font-sans mb-12">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-12 px-4 z-10 relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Customer <span className="text-green-600">Reviews</span>
        </h2>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px bg-green-600 w-16"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <div className="h-px bg-green-600 w-16"></div>
        </div>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          See what our customers are saying about their shopping experience
        </p>
      </div>

      {/* Infinite Marquee Section */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee-right">
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>

      {/* Tailwind custom keyframes */}
      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-right {
          display: flex;
          animation: marquee-right 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

const ReviewCard = ({ img, name, username, body, orderType, location, rating }) => {
  return (
    <figure className="relative w-80 lg:w-96 mx-3 flex-shrink-0 overflow-hidden rounded-xl border p-6 border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <img
            width="48"
            height="48"
            className="w-12 h-12 rounded-full"
            alt={`${name} profile`}
            src={img}
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full shadow flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <figcaption className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </figcaption>
          <p className="text-sm text-gray-500 truncate">{username}</p>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200 inline-block w-fit">
              {orderType}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg
                className="w-3 h-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>

      <blockquote className="text-sm text-gray-700 leading-relaxed mb-4 break-words">
        "{body}"
      </blockquote>

      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-green-600" : "text-gray-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.03a1 1 0 00-1.175 0l-2.8 2.03c-.784.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.02c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69L9.049 2.927z" />
          </svg>
        ))}
      </div>
    </figure>
  );
};

export default Reviews;