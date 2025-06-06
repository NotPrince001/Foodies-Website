import React, { useEffect, useState } from "react";
import ShimmerCard from "./ShimmerCard";
import Question from "./Question";

const Contact = () => {
  const [faqs, setFAQs] = useState([]);

  const fetchFAQs = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/support/v3/issues/faq?"
    );
    const data = await response.json();
    setFAQs(data.data.issues.data);
    console.log(data.data.issues.data);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return faqs.length === 0 ? (
    <ShimmerCard />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Help & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to commonly asked questions or get in touch with our
              support team
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {faqs.map((question, index) => (
            <div
              key={question.id}
              className="transform transition-all duration-300 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Question
                question={question.title}
                answer={question.description}
              />
            </div>
          ))}
        </div>

        {/* Contact Information Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Still Need Help?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Our support team is here to assist you with any other questions
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
              {/* Phone Contact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-3">📞</div>
                <h4 className="font-semibold text-lg mb-2">Call Us</h4>
                <a
                  href="tel:9289329208"
                  className="text-blue-200 hover:text-white transition-colors text-lg font-medium"
                >
                  +91 92893 29208
                </a>
              </div>

              {/* Email Contact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-3">✉️</div>
                <h4 className="font-semibold text-lg mb-2">Email Us</h4>
                <a
                  href="mailto:princechauhan@abc.com"
                  className="text-blue-200 hover:text-white transition-colors text-lg font-medium break-all"
                >
                  princechauhan@abc.com
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-blue-400/30">
              <p className="text-blue-100">
                We typically respond within 24 hours during business days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="pb-12"></div>
    </div>
  );
};

export default Contact;
