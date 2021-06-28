import React from "react";
import logo from "../../res/images/app_logo.png";
import twitter from "../../res/images/twitter.png";
import discord from "../../res/images/discord.png";
import telegram from "../../res/images/telegram.png";
import instagram from "../../res/images/Instagram.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="w-layout-grid footer-grid">
          <div
            id="w-node-_67f7db32-28d2-9f37-8b84-a159dcc6da5a-dcc6da57"
            className="footer-column"
          >
            <img
              src={logo}
              width={48}
              alt="evernft-logo-small"
              className="footer-logo"
            />
            <p className="paragraph-8">
              NFT&nbsp;Marketplace on Binance Smart Chain
            </p>
            <div className="section-4">
              <div className="columns-2 w-row">
                <div className="column-3 w-col w-col-3">
                  <a
                    rel="noreferrer"
                    href={window.location.href}
                    target="_blank"
                    className="w-inline-block"
                  >
                    <img
                      src={discord}
                      loading="lazy"
                      alt="evernft discord"
                      className="image-2 social-icon"
                    />
                  </a>
                </div>
                <div className="column-4 w-col w-col-3">
                  <a
                    rel="noreferrer"
                    href={window.location.href}
                    target="_blank"
                    className="w-inline-block"
                  >
                    <img
                      src={telegram}
                      loading="lazy"
                      alt="airnft telegram"
                      className="image-2 social-icon"
                    />
                  </a>
                </div>
                <div className="column-5 w-col w-col-3">
                  <a
                    rel="noreferrer"
                    href={window.location.href}
                    target="_blank"
                    className="w-inline-block"
                  >
                    <img
                      src={instagram}
                      loading="lazy"
                      width={24}
                      alt="evernft instagram"
                      className="image-4 social-icon"
                    />
                  </a>
                </div>
                <div className="column-6 w-col w-col-3">
                  <a
                    rel="noreferrer"
                    href={window.location.href}
                    target="_blank"
                    className="w-inline-block"
                  >
                    <img
                      src={twitter}
                      loading="lazy"
                      width={24}
                      alt="evernft twitter"
                      className="image-3 social-icon"
                    />
                  </a>
                </div>
              </div>
            </div>
            <p className="paragraph-3">info@evernft.com</p>
          </div>
          <div
            id="w-node-_67f7db32-28d2-9f37-8b84-a159dcc6da5e-dcc6da57"
            className="footer-column"
          >
            <div className="title">EverNFT</div>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              NFT&nbsp;Blog
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              FAQ
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              target="_blank"
              className="footer-link"
            >
              Chat with us
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              target="_blank"
              className="footer-link"
            >
              Create NFTs
            </a>
          </div>
          <div
            id="w-node-_0dd3c33e-8ae8-23c4-b465-50f8633343e7-dcc6da57"
            className="footer-column"
          >
            <div className="title">NFTs</div>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Art NFT
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Game NFT
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Photography NFT
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Video NFT
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Music NFT
            </a>
          </div>
          <div
            id="w-node-a1b07d31-75d9-1099-e70d-26b3ae231947-dcc6da57"
            className="footer-column"
          >
            <div className="title">INFORMATION</div>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Terms of service
            </a>
            <a
              rel="noreferrer"
              href={window.location.href}
              className="footer-link"
            >
              Privacy and policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
