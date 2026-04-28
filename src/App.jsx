import { useEffect, useState } from "react";
import keyboardBattery from "./assets/images/keyboard-battery.png";
import keyboardGasketmount from "./assets/images/keyboard-gasketmount.png";
import keyboardHero from "./assets/images/keyboard-hero.png";
import keyboardTyping from "./assets/images/keyboard-typing.png";
import suro60Pro from "./assets/images/suro-60-pro-Photoroom.png";
import suro75Pro from "./assets/images/suro-75-pro-Photoroom.png";
import suro80Pro from "./assets/images/suro-80-pro-Photoroom.png";
import Header from "./components/Header.jsx";
import { ArrowLeft, ArrowRight, BatteryCharging, Keyboard, MonitorSmartphone, SlidersHorizontal, Volume2 } from "lucide-react";

const heroWords = ["NEW KEYBOARD", "AURA 75 PRO", "TACTILE CONTROL"];

const featureItems = [
  { icon: Volume2, label: "Enhanced\nAcoustics" },
  { icon: Keyboard, label: "Custom\nSwitches" },
  { icon: BatteryCharging, label: "Up to 200h\nBattery Life" },
  { icon: MonitorSmartphone, label: "Multi-device\nSupport" },
  { icon: SlidersHorizontal, label: "Hot-swappable\nPCB" },
];

const imageTiles = [
  {
    className: "gallery-tile-large",
    image: keyboardTyping,
    title: "Precision feel",
  },
  {
    className: "gallery-tile-top",
    image: keyboardGasketmount,
    title: "Gasket mount",
  },
  {
    className: "gallery-tile-bottom",
    image: keyboardBattery,
    title: "Long battery",
  },
];

const products = [
  {
    image: suro60Pro,
    name: "SURO 60 PRO",
    type: "60% Mechanical Keyboard",
    description:
      "Compact performance, unlimited potential. Built for speed, control, and everyday comfort with Suro Cream Switches v1 Pro.",
    price: "$59.99",
  },
  {
    image: suro75Pro,
    name: "SURO 75 PRO",
    type: "75% Mechanical Keyboard",
    description:
      "A balanced layout for focused work, fast gaming, and clean desk setups with premium dampening.",
    price: "$79.99",
  },
  {
    image: suro80Pro,
    name: "SURO 80 PRO",
    type: "80% Mechanical Keyboard",
    description:
      "A full-function compact board with arrow cluster, refined acoustics, and long wireless battery life.",
    price: "$89.99",
  },
];

export default function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(() => localStorage.getItem("suro-cookie-choice") === null);

  useEffect(() => {
    const currentWord = heroWords[wordIndex];
    const wordComplete = displayText === currentWord;
    const wordEmpty = displayText.length === 0;
    const delay = isDeleting ? 42 : wordComplete ? 1100 : 78;

    const timer = window.setTimeout(() => {
      if (!isDeleting && wordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && wordEmpty) {
        setIsDeleting(false);
        setWordIndex((currentIndex) => (currentIndex + 1) % heroWords.length);
        return;
      }

      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      setDisplayText(currentWord.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  const goToProduct = (direction) => {
    setActiveProduct((currentIndex) => (currentIndex + direction + products.length) % products.length);
  };

  const getProductByOffset = (offset) => {
    const index = (activeProduct + offset + products.length) % products.length;
    return { ...products[index], index };
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const distance = event.changedTouches[0].clientX - touchStart;
    setTouchStart(null);

    if (Math.abs(distance) < 40) return;
    goToProduct(distance < 0 ? 1 : -1);
  };

  const visibleProducts = [
    { ...getProductByOffset(-1), slot: "prev", offset: -1 },
    { ...getProductByOffset(0), slot: "active", offset: 0 },
    { ...getProductByOffset(1), slot: "next", offset: 1 },
  ];

  const handleCookieChoice = (choice) => {
    localStorage.setItem("suro-cookie-choice", choice);
    setShowCookieBanner(false);
  };

  return (
    <main className="app-shell">
      <Header />
      <section className="product-hero" aria-label="SURO keyboard hero">
        <div className="hero-copy" aria-hidden="true">
          <span>{displayText}</span>
        </div>
        <img className="hero-keyboard" src={keyboardHero} alt="SURO mechanical keyboard" />
        <div className="feature-strip" aria-label="Keyboard features">
          {featureItems.map(({ icon: Icon, label }) => (
            <div className="feature-item" key={label}>
              <Icon className="feature-icon" size={34} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="image-gallery" aria-label="Keyboard detail gallery">
        <div className="gallery-grid">
          {imageTiles.map(({ className = "", image, title }) => (
            <article className={`gallery-tile ${className}`} key={title}>
              <img src={image} alt={title} />
            </article>
          ))}
        </div>
      </section>
      <section className="product-showcase" aria-label="Keyboard models">
        <div
          className="product-switcher"
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slider-viewport">
            <button className="slider-side-button slider-side-button-left" type="button" onClick={() => goToProduct(-1)} aria-label="Previous product">
              <ArrowLeft size={24} strokeWidth={1.8} />
            </button>
            <div className="slider-track">
              {visibleProducts.map((product) => (
                <article
                  className={`model-card ${product.slot === "active" ? "is-active" : "is-peek"} is-${product.slot}`}
                  key={`${product.name}-${product.slot}`}
                  onClick={() => product.offset !== 0 && goToProduct(product.offset)}
                >
                  <div className="model-image-wrap">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="model-copy">
                    <div>
                      <h2>{product.name}</h2>
                      <p className="model-type">{product.type}</p>
                      <p className="model-description">{product.description}</p>
                    </div>
                    <div className="model-footer">
                      <p>{product.price}</p>
                      <button className="model-button" type="button" aria-label={`View ${product.name}`}>
                        <ArrowRight size={34} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button className="slider-side-button slider-side-button-right" type="button" onClick={() => goToProduct(1)} aria-label="Next product">
              <ArrowRight size={24} strokeWidth={1.8} />
            </button>
          </div>
          <div className="slider-controls" aria-label="Product slider position">
            <div className="slider-dots" aria-hidden="true">
              {products.map((_, index) => (
                <span className={index === activeProduct ? "is-active" : ""} key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {showCookieBanner && (
        <aside className="cookie-banner" aria-label="Cookie preferences">
          <div>
            <h2>Cookies</h2>
            <p>We use cookies to keep the site smooth, remember preferences, and understand what products people view.</p>
          </div>
          <div className="cookie-actions">
            <div className="cookie-actions-row">
              <button type="button" onClick={() => handleCookieChoice("declined")}>
                Decline cookies
              </button>
              <button type="button" className="cookie-accept" onClick={() => handleCookieChoice("accepted")}>
                Accept cookies
              </button>
            </div>
            <button type="button" className="cookie-manage" onClick={() => handleCookieChoice("managed")}>
              Manage Preferences
            </button>
          </div>
        </aside>
      )}
    </main>
  );
}
