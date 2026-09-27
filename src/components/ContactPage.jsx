import React, { useState } from 'react'
import { contactPageStyles } from '../assets/dummyStyles'
import {
  AlertCircle,
  Check,           // ✅ Fix 6: PascalCase (was 'check')
  Clock,           // ✅ Fix 6: PascalCase (was 'clock')
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Send,
  ShoppingCart,
  User,
} from 'lucide-react';


function InputWithIcon({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
}) {
  return (
    <label className="block">
      <span className={contactPageStyles.inputLabel}>
        {label}{" "}
        {required && <span className={contactPageStyles.requiredStar}>*</span>}
      </span>
      <div className={contactPageStyles.inputContainer}>
        <div className={contactPageStyles.inputIconContainer}>{icon}</div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${contactPageStyles.inputBase} ${
            error ? contactPageStyles.inputError : contactPageStyles.inputNormal
          }`}
        />
      </div>
      {error && (
        <p className={contactPageStyles.errorMessage}>
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </label>
  );
}

function SelectWithIcon({
  icon,
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required,
}) {
  return (
    <label className="block">
      <span className={contactPageStyles.inputLabel}>
        {label}{" "}
        {required && <span className={contactPageStyles.requiredStar}>*</span>}
      </span>
      <div className={contactPageStyles.inputContainer}>
        <div className={contactPageStyles.inputIconContainer}>{icon}</div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${contactPageStyles.inputBase} ${
            error ? contactPageStyles.inputError : contactPageStyles.inputNormal
          }`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function CreativeCard({
  title,
  subtitle,
  icon,
  ctaText,
  ctaOnClick,
  accent = "amber",
}) {
  const accentBg =
    accent === "indigo"
      ? contactPageStyles.accentIndigo
      : contactPageStyles.accentAmber;
  const buttonClass =
    accent === "indigo"
      ? contactPageStyles.buttonIndigo
      : contactPageStyles.buttonAmber;

  return (
    <div className={`${contactPageStyles.creativeCardBase} ${accentBg}`}>
      <div className="flex items-start gap-4">
        <div className={contactPageStyles.creativeCardIconContainer}>
          {icon}
        </div>
        <div className="flex-1">
          <div
            className={contactPageStyles.creativeCardTitle}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </div>
          <p className={contactPageStyles.creativeCardSubtitle}>{subtitle}</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={ctaOnClick}
          className={`${contactPageStyles.creativeCardButtonBase} ${buttonClass}`}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}

// ✅ Fix 1 & 2: Single clean component declaration, no nested export default
const ContactPage = () => {
  const WHATSAPP_NUMBER = "1234546";

  // ✅ Fix 2: initialForm and all hooks are inside the component
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    product: "General Inquiry",
    budget: "",
    contactMethod: "WhatsApp",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const products = [
    "General Inquiry",
    "Norqain Independence",
    "Zenith Chronomaster",
    "Jacob & Co. Epic X",
    "Bvlgari Octo",
    "H. Moser Endeavour",
  ];

  function showToast(text, kind = "info", duration = 1800) {
    setToast({ text, kind });
    setTimeout(() => setToast(null), duration);
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email is invalid";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.product.trim()) e.product = "Select product";
    if (!form.budget.trim()) e.budget = "Budget is required";
    if (!form.contactMethod.trim()) e.contactMethod = "Select contact method";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      showToast("Please fill all required fields", "error");
      return;
    }

    setSending(true);

    const message =
      `Hello! I am *${form.name}*.\n\n` +
      `*Interest:* ${form.product}\n` +
      `*Budget:* ${form.budget}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Preferred Contact:* ${form.contactMethod}\n\n` +
      `*Message:* ${form.message}`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

    showToast("Opening WhatsApp...", "success", 900);

    setTimeout(() => {
      window.open(url, "_blank");
      clearForm();
      setSending(false);
      showToast("Submitted — form cleared", "success", 1600);
    }, 700);
  }

  // ✅ Fix 3: Fixed seetForm→setForm, ..s→...s, ....s→...s, added e.target destructure
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  }

  function clearForm() {
    setForm(initialForm);
    setErrors({});
  }

  return (
    <div className={contactPageStyles.pageContainer}>
      <div className={contactPageStyles.innerContainer}>
        <div className={contactPageStyles.pageHeader}>
          <h1
            className={contactPageStyles.pageTitle}
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Get in Touch
          </h1>
          <p
            style={{ fontFamily: "Playfair Display, serif" }}
            className={contactPageStyles.pageSubtitle}
          >
            Looking for a watch, quote or consultation? Fill the form - we'll
            reply on WhatsApp with details.
          </p>
        </div>

        <div className={contactPageStyles.mainGrid}>
          <div className={contactPageStyles.leftColumn}>
            <div className={contactPageStyles.formCard}>
              <form onSubmit={handleSubmit} className={contactPageStyles.form}>

                <div className={contactPageStyles.inputGrid}>
                  {/* ✅ Fix 4: Removed stray leading quote from name props */}
                  <InputWithIcon
                    icon={<User className="w-5 h-5 text-black" />}
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    error={errors.name}
                    required
                  />
                  <InputWithIcon
                    icon={<Mail className="w-5 h-5 text-black" />}
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@example.com"
                    error={errors.email}
                    required
                  />
                </div>

                <div className={contactPageStyles.inputGrid}>
                  {/* ✅ Fix 5: name="phone" lowercase to match form state key */}
                  <InputWithIcon
                    icon={<Phone className="w-5 h-5 text-black" />}
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 xxx xxx xxx"
                    error={errors.phone}
                    required
                  />
                  {/* ✅ Fix 8: options={[...]} instead of placeholder={[...]} */}
                  <SelectWithIcon
                    icon={<Clock className="w-5 h-5 text-black" />}
                    label="Preferred Contact"
                    name="contactMethod"
                    value={form.contactMethod}
                    onChange={handleChange}
                    options={["WhatsApp", "Phone Call", "Email"]}
                    error={errors.contactMethod}
                    required
                  />
                </div>

                <div>
                  <SelectWithIcon
                    icon={<ShoppingCart className="w-5 h-5 text-black" />}
                    label="Product of Interest"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    options={products}
                    error={errors.product}
                    required
                  />
                </div>

                <div className={contactPageStyles.inputGrid}>
                  <InputWithIcon
                    icon={<IndianRupee className="w-5 h-5 text-green-600" />}
                    label="Estimated Budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. Rs 1,50,000 - Rs 3,00,000"
                    error={errors.budget}
                    required
                  />
                  <div>
                    <label className={contactPageStyles.inputLabel}>
                      Short Message{" "}
                      <span className={contactPageStyles.requiredStar}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={`${contactPageStyles.textareaContainer} ${
                        errors.message
                          ? contactPageStyles.inputError
                          : contactPageStyles.inputNormal
                      }`}
                      placeholder="Tell us what you are looking for..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className={contactPageStyles.buttonsContainer}>
                  <button
                    type="submit"
                    disabled={sending}
                    className={contactPageStyles.submitButton}
                  >
                    <Send className="w-4 h-4" />
                    <span className="font-medium">Send via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearForm();
                      showToast("Form Cleared", "info");
                    }}
                    className={contactPageStyles.clearButton}
                  >
                    Clear
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Right side */}
          <div className={contactPageStyles.rightColumn}>
            <div className={contactPageStyles.rightColumnGrid}>
              <CreativeCard
                title="Showroom Visits"
                subtitle="Private viewings by appointment"
                icon={<MapPin className="w-6 h-6 text-black" />}
                ctaText="Book Visit"
                ctaOnClick={() => {
                  const msg = `Hi, I'd like to book a private showroom visit.`;
                  window.open(
                    `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`,
                    "_blank"
                  );
                }}
                accent="amber"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`${contactPageStyles.toastBase} ${
            toast.kind === "error"
              ? contactPageStyles.toastError
              : contactPageStyles.toastSuccess
          }`}
        >
          {/* ✅ Fix 7: Check (PascalCase) works correctly now */}
          {toast.kind === "success" ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Playfair+Display:wght@400;600;700&display=swap');
      `}</style>

    </div>
  );
}

export default ContactPage;