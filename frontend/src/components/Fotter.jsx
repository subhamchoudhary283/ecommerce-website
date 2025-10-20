import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="mb-0 mt-40 text-sm">
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-14">

        {/* Left Side: Logo + Description */}
        <div>
          <img src={assets.logo} alt="Company Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover the latest trends in fashion and shop from a wide range of clothing, accessories, and more.
          </p>
        </div>

        {/* Right Side: Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                        <ul className="flex flex-col gap-1 text-gray-600">
                <li>+91 8052977911</li>
                <li>
                  <a href="mailto:subhamchoudhary283@gmail.com" className="hover:underline">
                    subhamchoudhary283@gmail.com
                  </a>
                </li>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025@ RoyalRack.com - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
