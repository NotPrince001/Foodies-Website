import { useState } from "react";

const Question = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-300 ease-in-out">
      {/* Question Header */}
      <div
        onClick={handleShow}
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-4 leading-relaxed">
          {question}
        </h3>

        {/* Animated Toggle Icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 transition-all duration-300 ${
            show ? "rotate-180 bg-blue-200" : "hover:bg-blue-200"
          }`}
        >
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Answer Section with Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          show ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-start space-x-3">
              {/* Answer Icon */}
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mt-0.5">
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

              {/* Answer Text */}
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed text-base">
                  {answer || (
                    <span>
                      For this specific query, please{" "}
                      <a
                        href="mailto:prince@abc.com"
                        className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                      >
                        email us at prince@abc.com
                      </a>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
