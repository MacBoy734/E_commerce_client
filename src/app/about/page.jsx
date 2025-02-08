import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-teal-500 my-5 underline">About Us</h2>
        <p className="mt-4 text-lg text-gray-600">We're here to help you grow your business online with custom solutions.</p>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-teal-600 my-16 underline">Our Mission</h3>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          At Our Company, our mission is to provide businesses with effective and scalable web development solutions that
          enhance their online presence. We strive to offer exceptional service, focusing on customer satisfaction and long-term
          growth.
        </p>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-teal-600 my-16 underline">Our Values</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-users text-teal-500 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-xl text-teal-600">Customer-Centric</h4>
            <p className="mt-2 text-center">
              We put our clients first, understanding their needs and delivering tailored solutions that exceed expectations.
            </p>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-code text-teal-500 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-xl text-teal-600">Innovation</h4>
            <p className="mt-2 text-center">
              We stay ahead of the curve by embracing new technologies and continuously evolving to provide cutting-edge solutions.
            </p>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-thumbs-up text-teal-500 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-xl text-teal-600">Quality Assurance</h4>
            <p className="mt-2 text-center">
              We are committed to maintaining high-quality standards across all our projects, ensuring reliability and efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
