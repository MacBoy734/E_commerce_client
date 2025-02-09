"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './globals.css'
import { Provider } from "react-redux";
import { store } from '../store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`flex flex-col min-h-screen font-[roboto]`}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </Provider>
  );
}
