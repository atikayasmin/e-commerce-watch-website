import React, { useState } from 'react' // ✅ Fix 1: Added useState import
import { cartPageStyles } from '../assets/dummyStyles'
import { useCart } from '../CartContext'
import { toast, ToastContainer } from "react-toastify"
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react' // ✅ Fix 2: ArrowLeft PascalCase (was Arrowleft)
import { Link } from 'react-router-dom'


const CartPage = () => {
  const {
    cart,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleMobileChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(digitsOnly);
  };

  const isFormValid = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !mobile.trim() ||
      !paymentMethod.trim()
    ) {
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{10}$/.test(mobile.replace(/\s+/g, ""));
    return emailOk && phoneOk;
  };

  const processPayment = (method) => {
    if (method === "Cash on Delivery") return true;
    if (method === "Online") {
      return Math.random() < 0.75;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all required fields correctly.", {
        position: "top-right",
      });
      return;
    }

    if (!cart.length) {
      toast.error("Your cart is empty.", { position: "top-right" });
      return;
    }

    const paymentOk = processPayment(paymentMethod);

    if (paymentOk) {
      clearCart();
      setName("");
      setEmail("");
      setAddress("");
      setMobile("");
      setNote("");
      setPaymentMethod("");
      toast.success("Payment successful — order completed.", {
        position: "top-right",
      });
      return;
    } else {
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
      });
      return;
    }
  };

  if (!cart.length) {
    return (
      <>
        <ToastContainer />
        <div className={cartPageStyles.emptyCartContainer}>
          <div className={cartPageStyles.emptyCartCard}>
            <ShoppingBag size={48} className={cartPageStyles.emptyCartIcon} />
            <h2 className={cartPageStyles.emptyCartTitle}>
              Your cart is empty
            </h2>
            <p className={cartPageStyles.emptyCartText}>
              Looks like you have not added any watches to your cart yet.
            </p>
            <Link to="/watches" className={cartPageStyles.emptyCartButton}>
              Browse Watches {/* ✅ Fix 3: "Browser" → "Browse" */}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className={cartPageStyles.pageContainer}>
        <div className={cartPageStyles.maxWidthContainer}>
          <div className={cartPageStyles.headerContainer}>
            <div className={cartPageStyles.backButtonContainer}>
              <Link to="/watches" className={cartPageStyles.backLink}>
                <div className={cartPageStyles.backIconContainer}>
                  {/* ✅ Fix 2: ArrowLeft (was Arrowleft) */}
                  <ArrowLeft size={20} />
                </div>
                <span className={cartPageStyles.backText}>Back to Watches</span>
              </Link>
            </div>
            <h1 className={cartPageStyles.cartTitle}>Your Shopping Cart</h1>
            <button onClick={clearCart} className={cartPageStyles.clearCartButton}>
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>

          <div className={cartPageStyles.mainGrid}>
            <div className={cartPageStyles.leftColumn}>
              <div className={cartPageStyles.formContainer}>
                <h2 className={cartPageStyles.formTitle}>Enter your details</h2>
                <p className={cartPageStyles.formSubtitle}>All fields are required</p>

                {/* ✅ Fix 4: cartPageStyles.from → cartPageStyles.form */}
                <form onSubmit={handleSubmit} className={cartPageStyles.form}>
                  <div className={cartPageStyles.inputGrid}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className={cartPageStyles.inputBase}
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={cartPageStyles.inputBase}
                      required
                    />
                  </div>

                  <input
                    type="text"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Mobile number (10 digits)"
                    className={cartPageStyles.inputBase}
                    required
                  />

                  {/* ✅ Fix 5: "on onChange" → "onChange" (duplicate word) */}
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    rows={3}
                    className={cartPageStyles.textareaBase}
                    required
                  ></textarea>

                  {/* ✅ Fix 6: Option values had stray spaces — "Online " and " Cash on Delivery"
                      These would never match the strings used in processPayment() */}
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={cartPageStyles.selectBase}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Online">Online</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>

                  {/* ✅ Fix 5: "on onChange" → "onChange" (duplicate word) */}
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Message / delivery instructions"
                    rows={2}
                    className={cartPageStyles.textareaBase}
                  ></textarea>

                  <div className={cartPageStyles.formButtonsContainer}>
                    <button type="submit" className={cartPageStyles.submitButton}>
                      Submit Order
                    </button>
                    <Link to="/" className={cartPageStyles.continueShoppingButton}>
                      Continue Shopping
                    </Link>
                  </div>
                </form>
              </div>
              {/* ✅ Fix 7: Removed stray JS comment "// paste git here" inside JSX — causes syntax error */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;