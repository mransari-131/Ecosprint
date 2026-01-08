import React from 'react';
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from './ContactForm';

const ContactContent = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-900 mb-6">
          Contact Us. We're here to help you!
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Got questions about our latest shoe collections, sizing, or orders? We're always happy to assist you! 
          Whether you need help choosing the perfect pair, tracking your order, or have any other inquiries, 
          our team is just a message away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-emerald-500 rounded-full">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-emerald-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-center">+91-7898939933</p>
          </div>
        </div>

        <div className="group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-purple-500 rounded-full">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-emerald-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-center">contact@ecosprint.com</p>
          </div>
        </div>

        <div className="group hover:transform hover:scale-105 transition-all duration-300">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-indigo-500 rounded-full">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-emerald-900 mb-2">Visit Our Store</h3>
            <p className="text-gray-600 text-center">Dehradun, Uttarakhand</p>
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
};

export default ContactContent;