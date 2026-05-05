import { useState } from "react";
import cleanserImg from "./assets/cleanser.svg";
import serumImg from "./assets/serum.svg";
import sunscreenImg from "./assets/sunscreen.svg";
import heroImg from "./assets/hero-skincare.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={heroImg}
            className="base"
            width="170"
            height="179"
            alt="Skincare bottle illustration"
          />
          <img
            src={serumImg}
            className="framework"
            alt="Serum product illustration"
          />
          <img
            src={sunscreenImg}
            className="vite"
            alt="Sunscreen product illustration"
          />
        </div>
        <div>
          <h1>Lab Act 2: Skincare Landing Page</h1>
          <p>
            Brand : <code>GlowLab Skincare</code>
          </p>
          <p>
            Focus : <code>Gentle routine for healthy, glowing skin</code>
          </p>
          <p>
            Routine : <code>Cleanse • Treat • Protect</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Added to wishlist: {count}
        </button>

        <div className="routine">
          <article className="productCard">
            <img src={cleanserImg} alt="Gentle cleanser" />
            <div className="productBody">
              <h3>Gentle Cleanser</h3>
              <p>
                Low-foam, fragrance-free wash to remove oil and dirt without
                stripping moisture.
              </p>
              <p className="meta">
                Best for: <code>daily AM/PM</code>
              </p>
            </div>
          </article>

          <article className="productCard">
            <img src={serumImg} alt="Hydrating serum" />
            <div className="productBody">
              <h3>Hydrating Serum</h3>
              <p>
                Lightweight hydration to support a plump look and smoother skin
                texture.
              </p>
              <p className="meta">
                Best for: <code>after cleansing</code>
              </p>
            </div>
          </article>

          <article className="productCard">
            <img src={sunscreenImg} alt="Daily sunscreen" />
            <div className="productBody">
              <h3>Daily Sunscreen SPF</h3>
              <p>
                Broad-spectrum protection for everyday use—your best anti-aging
                step.
              </p>
              <p className="meta">
                Best for: <code>AM last step</code>
              </p>
            </div>
          </article>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Learn healthy skincare basics</h2>
          <p>Quick tips you can follow daily</p>
          <ul>
            <li>
              <a
                href="https://www.aad.org/public/everyday-care/skin-care-basics"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                Skincare basics (AAD)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
