import React from "react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#075686] text-white py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-sm">
                Building#88, Street#11, Royal Garden Society Near Premium
                American School Harbanspura, Lahore, Pakistan, 54000
              </p>
              <p className="text-sm mt-2">
                <strong>Operating Hours:</strong>
                <br />
                Monday-Saturday: 10AM - 6PM
              </p>
              <div className="space-y-1">
                <a  
                  href="tel:+923157418509"
                  className="block text-sm hover:text-white transition-colors"
                >
                  Phone: +923157418509
                </a>
                <a
                  href="https://wa.me/03157418509"
                  className="block text-sm hover:text-white transition-colors"
                >
                  WhatsApp: 0315-7418509
                </a>
              </div>
              <div className="mt-4">
                <a
                  href="/track-order"
                  className="flex items-center text-sm font-medium hover:text-white transition-colors"
                >
                  Track Your Order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/customer-policy#refund&exchange"
                  className="text-sm hover:text-white transition-colors"
                >
                  Refund & Exchange Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/customer-policy#privacyPolicy"
                  className="text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/customer-policy#customerRight"
                  className="text-sm hover:text-white transition-colors"
                >
                  Customer Rights
                </Link>
              </li>
             
              <li>
                <Link
                  to="/customer-policy#deliveryPolicy"
                  className="text-sm hover:text-white transition-colors"
                >
                  Delivery Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div></div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1QvM9Go65G/"
                className="hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@henza.pk?_t=ZS-8vm2ogTUzrT&_r=1"
                className="hover:text-white transition-colors flex justify-center items-center"
              >
                <span className="sr-only">Tiktok</span>
                <FaTiktok />
              </a>

              <a
                href="https://www.youtube.com/@henzaofficial-k1k"
                className="hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Henza. All rights
              reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
