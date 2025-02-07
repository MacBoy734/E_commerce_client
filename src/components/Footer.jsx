import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12">
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul>
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Usefull Links</h4>
            <ul>
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/auth/login" className="hover:text-blue-400">Login</Link></li>
              <li><Link href="/auth/register" className="hover:text-blue-400">Register</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400">Cart</Link></li>
              <li><Link href="/help/contactsupport" className="hover:text-blue-400">Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Social Media</h4>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-400 hover:text-blue-600"><FaFacebook size={20} /></a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-600"><FaTwitter size={20} /></a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-600"><FaInstagram size={20} /></a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-600"><FaLinkedin size={20} /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <form className="flex flex-col sm:flex-row items-center">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 text-gray-800 rounded-lg w-full sm:w-56 mb-4 sm:mb-0"
              />
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg sm:ml-4 hover:bg-blue-700">
                <FiMail size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} mac Boy Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
