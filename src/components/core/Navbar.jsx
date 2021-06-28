import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import logo from "../../res/images/app_logo.png";

export default function Navbar() {
  const [isOpenNavbar, setOpenNavbar] = useState(false);
  const toggleNavbar = () => {
    setOpenNavbar(!isOpenNavbar);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        setOpenNavbar(false);
      }
    });
  }, []);
  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration={400}
      id="Navigation"
      data-w-id="33c883c6-4afc-cc73-3bca-d2857a9d4bc2"
      role="banner"
      className="navbar w-nav"
    >
      <div className="navigation-container">
        <div className="navigation-left">
          <Link
            to={config.routes.root}
            aria-current="page"
            className="brand w-nav-brand w--current"
            aria-label="home"
          >
            <img src={logo} width={48} alt="Airnfts" className="image-7" />
          </Link>
        </div>
        <div className="navigation-right">
          <div
            className="menu-button w-nav-button"
            style={{ WebkitUserSelect: "text" }}
            aria-label="menu"
            role="button"
            tabIndex={0}
            aria-controls="w-nav-overlay-0"
            aria-haspopup="menu"
            aria-expanded="false"
            onClick={toggleNavbar}
          >
            <div className="icon w-icon-nav-menu" />
          </div>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <Link
              to={config.routes.root}
              aria-current="page"
              className="nav-link w-nav-link w--current"
            >
              Home
            </Link>
            <div className="nav-link-icon">
              <Link to={"#"} className="nav-link cta w-nav-link">
                Buy $EVERT
              </Link>
              {/* <a href="/blog" className="nav-link w-nav-link">
                NFT&nbsp;Blog
              </a> */}
              <a
                href={config.routes.create}
                className=" cta w-button"
                style={{ marginTop: "10px", borderRadius: 5 }}
              >
                Launch App Now
              </a>
            </div>
          </nav>
          {/* <div className="columns-2 nav-link w-row">
            <div className="column-3 w-col w-col-3">
              <a
                href="https://twitter.com/airnfts"
                target="_blank"
                className="link-block w-inline-block"
                without
                rel="noreferrer"
              >
                <img
                  src="https://uploads-ssl.webflow.com/60098c5b239e4890fa5ee1aa/60591e9871de89777bd43fc6_Twitter.png"
                  loading="lazy"
                  width={24}
                  alt="airnfts twitter"
                  className="image-3 social-icon"
                />
              </a>
            </div>
            <div className="column-4 w-col w-col-3">
              <a
                href="https://www.instagram.com/airnfts"
                target="_blank"
                className="w-inline-block"
                without
                rel="noreferrer"
              >
                <img
                  src="https://uploads-ssl.webflow.com/60098c5b239e4890fa5ee1aa/60591e94a3f9e45c80571e62_Instagram.png"
                  loading="lazy"
                  width={24}
                  alt="airnfts instagram"
                  className="image-4 social-icon"
                />
              </a>
            </div>
            <div className="column-5 w-col w-col-3">
              <a
                href="https://t.me/joinchat/HKsQnSvxhfjjKGJe"
                target="_blank"
                className="w-inline-block"
                without
                rel="noreferrer"
              >
                <img
                  src="https://uploads-ssl.webflow.com/60098c5b239e4890fa5ee1aa/6058eb242a65115161639b5b_telegram.png"
                  loading="lazy"
                  alt="airnft telegram"
                  className="image-2 social-icon"
                />
              </a>
            </div>
            <div className="w-col w-col-3">
              <a
                href="https://discord.gg/TXjQUVWXx7"
                target="_blank"
                className="w-inline-block"
                without
                rel="noreferrer"
              >
                <img
                  src="https://uploads-ssl.webflow.com/60098c5b239e4890fa5ee1aa/6092e97f89e9b9783b8cb522_discord.png"
                  loading="lazy"
                  alt="airnfts discord"
                  className="image-2 social-icon"
                />
              </a>
            </div>
          </div> */}
        </div>
      </div>
      <div
        className="w-nav-overlay"
        data-wf-ignore
        id="w-nav-overlay-0"
        style={{
          height: "8849.66px",
          display: isOpenNavbar ? "block" : "none",
          transition: "opacity 1000ms, display 1000ms",
        }}
      >
        <nav
          role="navigation"
          className="nav-menu w-nav-menu"
          data-nav-menu-open
          style={{
            transform: "translateY(0px)",
            transition: "transform 400ms ease 0s",
          }}
        >
          <a
            href="/"
            aria-current="page"
            className="nav-link w-nav-link w--current w--nav-link-open"
          >
            Home
          </a>
          <div className="nav-link-icon">
            <a
              href="https://app.airnfts.com/"
              target="_blank"
              className="nav-link cta w-nav-link w--nav-link-open"
              without
              rel="noreferrer"
            >
              Buy $EVERT
            </a>
            {/* <a href="/blog" className="nav-link w-nav-link w--nav-link-open">
              NFT&nbsp;Blog
            </a> */}
            <a
              href="https://app.airnfts.com/"
              target="_blank"
              className=" cta w-button"
              rel="noreferrer"
              style={{ marginTop: "15px", borderRadius: 5 }}
            >
              Launch App Now
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
