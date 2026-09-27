import React, { useRef, useEffect } from 'react'
import { bannerHomeStyles } from '../assets/dummyStyles'
import BL1 from '../assets/watches/bannervideo.mp4'
import BL1Poster from '../assets/watches/BL1.png'
import Navbar from './Navbar'
import BM1 from '../assets/watches/BM1.png'
import BR1 from '../assets/BR1.png'

const BannerHome = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduceMotion && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("autoplay");
    }
  }, []);

  return (
    <div className={bannerHomeStyles.container}>
      <div className={bannerHomeStyles.navbarWrapper}>
        <Navbar />
      </div>

      {/* bg video */}
      <div className={bannerHomeStyles.videoContainer}>
        <video
          ref={videoRef}
          className={bannerHomeStyles.video}
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster='/fallback.jpg'
          role='presentation'
        >
          <source src={BL1} type='video/mp4' />
        </video>
      </div>

      {/* content */}
      <div className={bannerHomeStyles.contentContainer}>
        <div className={bannerHomeStyles.h1Container}>
          <h1
            style={bannerHomeStyles.playfairFont}
            className={bannerHomeStyles.h1Text}
          >
            <span className={bannerHomeStyles.h1SpanGray}>Love you more</span>
            <span className={bannerHomeStyles.h1SpanYellow}>With each tick-tock</span>
          </h1>
          <p className={bannerHomeStyles.subtext}>
            Discover our exclusive collection of handcrafted timepieces that
            embody precision, luxury, and timeless style.
          </p>
        </div>

        {/* card section */}
        <div className={bannerHomeStyles.cardsContainer}>
          <div className={bannerHomeStyles.grid}>

            {/* Left card — uses BL1Poster (png) not BL1 (mp4) */}
            <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.leftCardTransform}`}>
              <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                <img
                  src={BL1Poster}
                  alt="classic heritage watch"
                  className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.leftCardImage}`}
                  loading="lazy"
                />
              </div>
              <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelGray}`}>
                Classic Heritage
              </p>
            </div>

            {/* Middle card */}
            <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.middleCardTransform}`}>
              <div className={`${bannerHomeStyles.cardMiddle} ${bannerHomeStyles.cardPadding}`}>
                <img
                  src={BM1}
                  alt="limited edition watch"
                  className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.middleCardImage}`}
                  loading="lazy"
                />
              </div>
              <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelYellow}`}>
                Limited Edition
              </p>
            </div>

            {/* Right card */}
            <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.rightCardTransform}`}>
              <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                <img
                  src={BR1}
                  alt="modern precision watch"
                  className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.rightCardImage}`}
                  loading="lazy"
                />
              </div>
              <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelYellow}`}>
                Modern Precision
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerHome