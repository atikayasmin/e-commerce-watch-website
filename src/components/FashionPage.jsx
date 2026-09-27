import React, { useEffect, useState } from 'react'
import { watchOfferBannerStyles } from '../assets/dummyStyles'
import F1 from '../assets/watches/F1.png'
import { Shield, Truck, Heart } from 'lucide-react' // ✅ Fix 1: Correct package 'lucide-react' + added Heart

const FashionPage = () => {

  const [timeLeft, setTimeLeft] = useState({
    Days: 2,
    Hours: 12,
    Minutes: 45,
    Seconds: 18,
  });

  useEffect(() => {
    const toTotalSeconds = (t) =>
      t.Days * 86400 + t.Hours * 3600 + t.Minutes * 60 + t.Seconds;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const total = toTotalSeconds(prev);

        if (total <= 0) {
          clearInterval(timer);
          return { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
        }

        const nextTotal = total - 1;

        const Days = Math.floor(nextTotal / 86400);
        const Hours = Math.floor((nextTotal % 86400) / 3600);
        const Minutes = Math.floor((nextTotal % 3600) / 60);
        const Seconds = Math.floor(nextTotal % 60);

        return { Days, Hours, Minutes, Seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className={watchOfferBannerStyles.container}>
      <div className={watchOfferBannerStyles.maxWidthContainer}>
        <div className={watchOfferBannerStyles.banner}>
          <div className={watchOfferBannerStyles.contentSection}>

            <div className={watchOfferBannerStyles.decorativeLarge}>
              <div className={watchOfferBannerStyles.decorativeSmall}></div>

              <div className={watchOfferBannerStyles.offerTag} style={watchOfferBannerStyles.playfairFont}>
                Limited Time Offer
              </div>

              {/* ✅ Fix 2: Removed stray ("") string literals */}
              <h1 className={watchOfferBannerStyles.heading} style={watchOfferBannerStyles.playfairFont}>
                Premium{" "}
                <span className={watchOfferBannerStyles.headingAccent}>
                  Luxury Watches
                </span>{" "}
                Collection
              </h1>

              <p className={watchOfferBannerStyles.description}>
                Discover our exclusive selection of premium timepieces
                with special discounts upto 30% off. Elevate your style with precision craftmanship.
              </p>

              <div className={watchOfferBannerStyles.countdownGrid}>
                {/* ✅ Fix 3: Changed [Unit, value] to [unit, value] — consistent lowercase */}
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className={watchOfferBannerStyles.countdownItem}
                  >
                    <div className={watchOfferBannerStyles.countdownValue}>
                      {String(value).padStart(2, "0")}
                    </div>
                    <div className={watchOfferBannerStyles.countdownLabel}>{unit}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className={watchOfferBannerStyles.featuresContainer}>
                <div className={watchOfferBannerStyles.featureItem}>
                  <Truck
                    size={19}
                    className={watchOfferBannerStyles.featureIcon}
                  />
                  <span className={watchOfferBannerStyles.featureText}>Free Shipping</span>
                </div>
                <div className={watchOfferBannerStyles.featureItem}>
                  <Shield
                    size={19}
                    className={watchOfferBannerStyles.featureIcon}
                  />
                  <span className={watchOfferBannerStyles.featureText}>2-Years Warranty</span>
                </div>
                <div className={watchOfferBannerStyles.featureItem}>
                  {/* ✅ Fix 4: Heart is now imported and works correctly */}
                  <Heart
                    size={19}
                    className={watchOfferBannerStyles.featureIcon}
                  />
                  <span className={watchOfferBannerStyles.featureText}>30-Days Return</span>
                </div>
              </div>
            </div>

            {/* ✅ Fix 5: imageSection moved OUTSIDE decorativeLarge, as a sibling */}
            <div className={watchOfferBannerStyles.imageSection}>
              <div className={watchOfferBannerStyles.imageOverlay} />
              <img src={F1} alt='img' className={watchOfferBannerStyles.image} />
              <div className={watchOfferBannerStyles.priceTag}>
                <div className={watchOfferBannerStyles.oldPrice}>Rs 899.99</div>
                <div className={watchOfferBannerStyles.newPrice}>Rs 699.99</div>
                <div className={watchOfferBannerStyles.discount}>Save 30%</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default FashionPage