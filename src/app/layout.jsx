"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './globals.css'
import { Provider } from "react-redux";
import { store } from '../store/store';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Sniglet:wght@400;800&display=swap" rel="stylesheet" />

        </Head>
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
