import React, { useEffect, useState } from "react";
import "./Footer.css";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const [margin, setMargin] = useState(false);

  useEffect(() => {
    setMargin(pathname === "/");
  }, [pathname]);

  return (
    <div className="footer-container ">
      <div
        className="footer-content"
        style={{
          margin: `${margin ? "10rem 0 1rem" : "2rem 0 1rem"}`,
        }}
      >
        <div className="card">
          
          <p>
            save money, and drive happy. 
          </p>
        </div>

        <div className="card">
          <h3>Company</h3>
          <ul>
            
            <li>
              <FlipLink href="/solution#pricing">Pricing</FlipLink>
            </li>
            <li>
              <FlipLink href="/blog">Blog</FlipLink>
            </li>
            <li>
              <FlipLink href="/about">About Us</FlipLink>
            </li>
            <li>
              <FlipLink href="/contact">Contact Us</FlipLink>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>Services</h3>
          <ul>
            
            <li>
              <FlipLink>Mobile Apps</FlipLink>
            </li>
            <li>
              <FlipLink>Digital Marketing</FlipLink>
            </li>
            <li>
              <FlipLink>SEO</FlipLink>
            </li>
            <li>
              <FlipLink>Business IT Consultation</FlipLink>
            </li>
            <li>
              <FlipLink>Logo & Digital Artwork</FlipLink>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>More Services</h3>
          <ul>
            <li>
              <FlipLink>Game Development</FlipLink>
            </li>
            <li>
              <FlipLink>Web Development</FlipLink>
            </li>
            
          </ul>
        </div>
      </div>

      <hr style={{ color: "white" }} />

      <div className="footer-bottom">
        <p>Copyright © 2025. All Rights Reserved.</p>
        <div>
          <span>Privacy Policy </span>
          <span>|</span>
          <span> Terms & Condition </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

// FlipLink Animation
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href = "#" }) => {
  const letters = children.split("").map((l) => (l === " " ? "\u00A0" : l));
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="fliplink"
      style={{ lineHeight: 1 }}
    >
      <div>
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="inlineblock"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="downdiv">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="inlineblock"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
