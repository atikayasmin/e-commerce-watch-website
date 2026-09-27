import React, { useState } from 'react' // ✅ Fix 1: Added useState import
import { categoriesHomeStyles } from '../assets/dummyStyles';
import brands from '../assets/CategoriesHomedata';
import { Link } from 'react-router-dom'; // ✅ Fix 2: Link is from 'react-router-dom', not 'lucide-react'

const CategoriesHome = () => {
  const [hoveredBrand, setHoveredBrand] = useState(null);

  return (
    <section className={categoriesHomeStyles.section}>
      <div className={categoriesHomeStyles.container}>

        {/* ✅ Fix 3: Removed duplicate style={categoriesHomeStyles.h1FontSize} from <header>
            It was applied on both the <header> and the <h1> inside — only <h1> needs it */}
        <header className={categoriesHomeStyles.header}>
          <h1
            className={categoriesHomeStyles.h1}
            style={categoriesHomeStyles.h1FontSize}
          >
            <span className={categoriesHomeStyles.h1SpanRegular}>
              Premium Watches{" "}
            </span>
            <span className={categoriesHomeStyles.h1SpanAccent}>Brands</span>
          </h1>
          <div className={categoriesHomeStyles.underline}></div>
          {/* ✅ Fix 4: Backtick inside JSX text replaced with apostrophe */}
          <p className={categoriesHomeStyles.subtext}>
            Discover the world's most prestigious watchmaker - curated picks
            for every style.
          </p>
        </header>

        {/* Grid */}
        <div className={categoriesHomeStyles.grid} style={categoriesHomeStyles.playfairFont}>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={brand.link}
              className={categoriesHomeStyles.cardLink}
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <div className={categoriesHomeStyles.cardWrapper}>
                <div className={categoriesHomeStyles.imageContainer}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    className={categoriesHomeStyles.image}
                  />
                </div>
                <div className={categoriesHomeStyles.cardContent}>
                  {/* ✅ Fix 5: Added missing space before ${ in template literal className */}
                  <h3 className={`${categoriesHomeStyles.cardTitleBase} ${
                    hoveredBrand === brand.id
                      ? categoriesHomeStyles.cardTitleHover
                      : categoriesHomeStyles.cardTitleNormal
                  }`}>
                    {brand.name}
                  </h3>
                  {brand.tagline ? (
                    <p className={categoriesHomeStyles.cardTagline}>{brand.tagline}</p>
                  ) : null}
                </div>
                <span className={categoriesHomeStyles.focusRing} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{categoriesHomeStyles.styleString}</style>
    </section>
  );
}

export default CategoriesHome;