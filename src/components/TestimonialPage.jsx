import React, { useRef, useEffect } from "react";
import { testimonialPageStyles } from "../assets/dummyStyles";

import T1 from "../assets/T1.png";
import T2 from "../assets/T2.png";
import T3 from "../assets/T3.png";
import T4 from "../assets/T4.png";

const cards = [
  {
    id: 1,
    title: '"Elegance and Precision" — Ayesha.',
    meta: "Asha K. • July 5, 2025",
    excerpt:
      "I gifted the Swarovski piece to myself and it instantly became my go-to. The crystal detailing catches light in the most flattering way and the movement keeps perfect time — classy enough for gala nights, subtle enough for daily wear.",
    img: T1,
  },
  {
    id: 2,
    title: '"Built Like a Tank" — Myra.',
    meta: "Rohit S. • June 26, 2025",
    excerpt:
      "I wear my G-Shock for work, gym and weekend hikes — zero scratches so far. The shock resistance and battery life are absurdly good. If you want a worry-free daily watch, this one's unbeatable.",
    img: T2,
  },
  {
    id: 3,
    title: '"Sleek & Subtle" — Hamna.',
    meta: "Priya M. • May 15, 2025",
    excerpt:
      "The minimalist dial is gorgeous — thin case, clean lines and a strap that feels premium. It pairs perfectly with both office blazers and weekend denim. I get compliments every time I wear it.",
    img: T3,
  },
  {
    id: 4,
    title: '"A Time Capsule" — Saad.',
    meta: "Arjun D. • May 2, 2025",
    excerpt:
      "A vintage look that still feels modern — the domed crystal and aged-lume give it character. It's become my conversation starter at dinners. Comfortable, well-built, and full of charm.",
    img: T4,
  },
];

// Smooth interpolation factor
const LERP_ALPHA = 0.12;

const TestimonialPage = () => {
  const scroller = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const rafRef = useRef(null);
  const targetScroll = useRef(null);

  const lastMoveTime = useRef(0);
  const lastMoveX = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    const el = scroller.current;

    if (!el) return;

    el.style.scrollBehavior = "auto";

    const handleUp = () => {
      isDown.current = false;

      if (el.classList) {
        el.classList.remove("cursor-grabbing");
      }
    };

    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const ensureRafRunning = () => {
    if (rafRef.current) return;

    const el = scroller.current;

    if (!el) return;

    const loop = () => {
      if (targetScroll.current == null) {
        rafRef.current = null;
        return;
      }

      const current = el.scrollLeft;

      const next =
        current + (targetScroll.current - current) * LERP_ALPHA;

      el.scrollLeft = next;

      if (
        Math.abs(targetScroll.current - next) < 0.5 &&
        !isDown.current &&
        Math.abs(velocity.current) < 0.02
      ) {
        el.scrollLeft = targetScroll.current;
        targetScroll.current = null;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  const startMomentum = () => {
    const el = scroller.current;

    if (!el) return;

    if (Math.abs(velocity.current) < 0.02) {
      velocity.current = 0;
      targetScroll.current = null;
      return;
    }

    targetScroll.current = el.scrollLeft;

    ensureRafRunning();

    let last = performance.now();

    const friction = 0.0008;

    const step = (now) => {
      const dt = now - last;

      last = now;

      targetScroll.current += velocity.current * dt;

      const factor = Math.exp(-friction * dt);

      velocity.current *= factor;

      if (Math.abs(velocity.current) > 0.02) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        targetScroll.current = Math.round(targetScroll.current);
        velocity.current = 0;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const onMouseDown = (e) => {
    const el = scroller.current;

    if (!el) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    isDown.current = true;

    el.classList.add("cursor-grabbing");

    startX.current = e.clientX - el.offsetLeft;

    scrollLeft.current = el.scrollLeft;

    targetScroll.current = el.scrollLeft;

    lastMoveTime.current = performance.now();
    lastMoveX.current = e.clientX;

    velocity.current = 0;

    ensureRafRunning();
  };

  const onMouseLeave = () => {
    if (!isDown.current) return;

    isDown.current = false;

    if (scroller.current) {
      scroller.current.classList.remove("cursor-grabbing");
    }

    startMomentum();
  };

  const onMouseUp = () => {
    if (!isDown.current) return;

    isDown.current = false;

    if (scroller.current) {
      scroller.current.classList.remove("cursor-grabbing");
    }

    startMomentum();
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();

    const el = scroller.current;

    if (!el) return;

    const x = e.clientX - el.offsetLeft;

    const walk = x - startX.current;

    targetScroll.current = scrollLeft.current - walk;

    const now = performance.now();

    const dt = Math.max(1, now - lastMoveTime.current);

    const instantVelocity =
      (e.clientX - lastMoveX.current) / dt;

    velocity.current =
      instantVelocity * 0.6 + velocity.current * 0.4;

    lastMoveTime.current = now;
    lastMoveX.current = e.clientX;

    ensureRafRunning();
  };

  const onTouchStart = (e) => {
    const el = scroller.current;

    if (!el) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    isDown.current = true;

    startX.current =
      e.touches[0].clientX - el.offsetLeft;

    scrollLeft.current = el.scrollLeft;

    targetScroll.current = el.scrollLeft;

    lastMoveTime.current = performance.now();

    lastMoveX.current = e.touches[0].clientX;

    velocity.current = 0;

    ensureRafRunning();
  };

  const onTouchMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();

    const el = scroller.current;

    if (!el) return;

    const x =
      e.touches[0].clientX - el.offsetLeft;

    const walk = x - startX.current;

    targetScroll.current = scrollLeft.current - walk;

    const now = performance.now();

    const dt = Math.max(1, now - lastMoveTime.current);

    const instantVelocity =
      (e.touches[0].clientX - lastMoveX.current) / dt;

    velocity.current =
      instantVelocity * 0.6 + velocity.current * 0.4;

    lastMoveTime.current = now;

    lastMoveX.current = e.touches[0].clientX;

    ensureRafRunning();
  };

  const onTouchEnd = () => {
    isDown.current = false;

    if (scroller.current) {
      scroller.current.classList.remove("cursor-grabbing");
    }

    startMomentum();
  };

  return (
    <section className={testimonialPageStyles.pageSection}>
      <div className={testimonialPageStyles.container}>
        <h2
          className={testimonialPageStyles.title}
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          The Watch Journal
        </h2>

        <div
          ref={scroller}
          className={testimonialPageStyles.scroller}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            cursor: "grab",
          }}
        >
          {cards.map((card) => (
            <article
              key={card.id}
              className={testimonialPageStyles.card}
            >
              <div className={testimonialPageStyles.imageBlock}>
                <img
                  src={card.img}
                  alt={card.title}
                  className={testimonialPageStyles.image}
                />
              </div>

              <div className={testimonialPageStyles.contentBlock}>
                <div>
                  <h3 className={testimonialPageStyles.cardTitle}>
                    {card.title}
                  </h3>

                  <p className={testimonialPageStyles.cardMeta}>
                    {card.meta}
                  </p>

                  <p
                    className={testimonialPageStyles.cardExcerpt}
                  >
                    {card.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{testimonialPageStyles.scrollbarHide}</style>
    </section>
  );
};

export default TestimonialPage;
