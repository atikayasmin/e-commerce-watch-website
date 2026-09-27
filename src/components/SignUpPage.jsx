import React, { useState } from 'react'                                       // ✅ FIX 1: added useState
import { useNavigate } from 'react-router-dom'                                 // ✅ FIX 1: added useNavigate
import { toast, ToastContainer } from 'react-toastify'                        // ✅ FIX 2: added toast & ToastContainer
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'       // ✅ FIX 3: added all icons with correct casing
import { signUpStyles } from '../assets/dummyStyles'

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);                        // ✅ FIX 5 & 6: fixed typo "setRemembetMe" → "setRememberMe"; initial value false not ""
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    if (!rememberMe) {
      toast.error("Please tick 'Remember me' to continue.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
      return;
    }

    console.log("Signup form submitted — form data:", {
      name,
      email,
      password,
      rememberMe,
      showPassword,
      timestamp: new Date().toISOString(),
    });

    toast.success("Signup successful", {
      position: "top-right",
      autoClose: 1200,
      theme: "light",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1250);
  };

  return (
    <div className={signUpStyles.pageContainer} style={signUpStyles.pageFontStyle}>
      <ToastContainer />
      <button onClick={() => navigate("/login")} className={signUpStyles.backButton}>
        <ArrowLeft className={signUpStyles.backIcon} />             {/* ✅ FIX 3: Arrowleft → ArrowLeft */}
        <span className={signUpStyles.backText}> Back to login </span>
      </button>

      <div className={signUpStyles.formContainer}>
        <div className={signUpStyles.card}>
          <div className={signUpStyles.decorativeCircle}></div>
          <h1 className={signUpStyles.title} style={signUpStyles.pageFontStyle}>Create Account</h1>
          <p className={signUpStyles.subtitle}>
            Simple Signup to get you started - light & clean.
          </p>

          <form onSubmit={handleSubmit} className={signUpStyles.form}>

            {/* Full Name */}
            <label className={signUpStyles.label}>Full Name</label>
            <div className={signUpStyles.inputContainer}>
              <div className={signUpStyles.inputIconContainer}>
                <User className={signUpStyles.inputIcon} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
                className={signUpStyles.inputField}
                required
              />
            </div>

            {/* Email */}
            <label className={signUpStyles.label}>Email</label>
            <div className={signUpStyles.inputContainer}>
              <div className={signUpStyles.inputIconContainer}>
                <Mail className={signUpStyles.inputIcon} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                className={signUpStyles.inputField}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className={signUpStyles.label}>Password</label>
              <div className={signUpStyles.inputContainer}>
                <div className={signUpStyles.inputIconContainer}>
                  <Lock className={signUpStyles.inputIcon} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a Password"
                  className={signUpStyles.inputField}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={signUpStyles.passwordToggleButton}
                >
                  {showPassword ? (
                    <EyeOff className={signUpStyles.passwordToggleIcon} />  // ✅ FIX 3: Eyeoff → EyeOff
                  ) : (
                    <Eye className={signUpStyles.passwordToggleIcon} />     // ✅ FIX 4: was signUpStyles.checkboxContainer (wrong className)
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className={signUpStyles.checkboxContainer}>
              <label className={signUpStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}                                      // ✅ FIX 7: was `remember` (undefined variable)
                  onChange={() => setRememberMe(!rememberMe)}               // ✅ FIX 6 & 8: fixed setter name typo & !RememberMe → !rememberMe
                  required
                  className={signUpStyles.checkboxInput}
                />
                <span className={signUpStyles.checkboxText}>Remember me</span>
              </label>
            </div>

            <button type="submit" className={signUpStyles.submitButton}>
              Sign up
            </button>
          </form>

          <div className={signUpStyles.bottomContainer}>
            <span className={signUpStyles.bottomText}>
              Already have an account?{" "}
            </span>
            <a href="/login" className={signUpStyles.loginLink}>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
