import { useState } from "react";

const Login = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    if (isLogin) {
      // console.log("Login");
      //console.log(document.getElementById("username").value);
      //console.log(document.getElementById("password").value);.
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const userDetails = JSON.parse(localStorage.getItem(username));
      console.log(userDetails);
      if (password === userDetails.password) {
        alert("Logged in successfully.");
        window.location.replace("/");
      } else {
        alert("Incorrect username or password.");
      }
    } else {
      // console.log("Signup");
      const fullName = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email) === false) {
        alert("Please enter valid email");
        return;
      }

      if (password.length < 8) {
        alert("Password must have 8 length");
        return;
      }

      const userDetails = {
        name: fullName,
        phoneNumber: phone,
        emailId: email,
        password: password,
      };

      if (password === confirmPassword && !localStorage.getItem(email))
        localStorage.setItem(email, JSON.stringify(userDetails));
      else {
        alert("Password must match");
        return;
      }

      alert("Sign up successfully.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
      {/* Food-themed animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-bounce"></div>
      </div>

      {/* Login/Signup form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header with food icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back!" : "Ready to Feast?"}
            </h1>
            <p className="text-white/70">
              {isLogin
                ? "Ready to satisfy your cravings?"
                : "Start your delicious journey with us"}
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`cursor-pointer flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`cursor-pointer flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name field (only for signup) */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    onFocus={() => setFocusedField("fullname")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "fullname" ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Email/Username field */}
            <div className="relative">
              <label className="block text-white/80 text-sm font-medium mb-2">
                {isLogin ? "Email or Username" : "Email Address"}
              </label>
              <div className="relative">
                <input
                  type={isLogin ? "text" : "email"}
                  name={isLogin ? "username" : "email"}
                  id={isLogin ? "username" : "email"}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder={
                    isLogin
                      ? "Enter your email or username"
                      : "Enter your email address"
                  }
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 -z-10 transition-opacity duration-300 ${
                    focusedField === "email" ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            </div>

            {/* Phone field (only for signup) */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your phone number"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "phone" ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Password field */}
            <div className="relative">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 -z-10 transition-opacity duration-300 ${
                    focusedField === "password" ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            </div>

            {/* Confirm Password field (only for signup) */}
            {!isLogin && (
              <div className="relative">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Confirm your password"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 -z-10 transition-opacity duration-300 ${
                      focusedField === "confirmPassword"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLogin ? "Order Now!" : "Start Cooking!"}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            {/* Forgot password (only for login) */}
            {isLogin && (
              <div className="text-center">
                <a
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          {/* Social login divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or continue with</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Footer message */}
        <div className="text-center mt-6">
          <p className="text-white/70 text-sm">
            {isLogin ? "Hungry for something new?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-300 hover:text-orange-200 font-medium transition-colors duration-200"
            >
              {isLogin ? "Explore our menu" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
