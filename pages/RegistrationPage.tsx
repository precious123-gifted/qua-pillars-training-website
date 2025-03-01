 "use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { processPaystackPayment } from '../lib/paystack';

// Define interfaces for the state and form errors
interface FormState {
  company: string;
  countryCity: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  refundPolicy: boolean;
  isStudent: boolean;
  dietaryRequest: string;
  studentId: File | null;
  paymentAmount: number;
}

interface FormErrors {
  [key: string]: string;
}

// Dynamically import PaystackButton with SSR disabled
const PaystackButton = dynamic(() => import('react-paystack').then(mod => mod.PaystackButton), { ssr: false });

const RegistrationPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    company: '',
    countryCity: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    refundPolicy: false,
    isStudent: false,
    dietaryRequest: '',
    studentId: null,
    paymentAmount: 10000, // Default payment amount
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const publicKey = "pk_test_39ffa3598618d31a91c17b97d0897ed21ffb7d83"; // Replace with your actual public key

  // Validation function
  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formState.company) errors.company = 'Company is required';
    if (!formState.countryCity) errors.countryCity = 'Country/City is required';
    if (!formState.email) errors.email = 'Email is required';
    if (!formState.phone) errors.phone = 'Phone is required';
    if (!formState.firstName) errors.firstName = 'First Name is required';
    if (!formState.lastName) errors.lastName = 'Last Name is required';
    if (!formState.refundPolicy) errors.refundPolicy = 'You must agree to the Refund Policy';
    if (formState.isStudent && !formState.studentId) errors.studentId = 'Student ID is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormState((prevState) => ({ ...prevState, studentId: event.target.files![0] }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields and correct errors.');
      return;
    }

    try {
      const paymentResponse = await processPaystackPayment({
        email: formState.email,
        amount: formState.paymentAmount * 100, // Amount in kobo
        metadata: {
          custom_fields: [
            { display_name: 'First Name', variable_name: 'firstName', value: formState.firstName },
            { display_name: 'Last Name', variable_name: 'lastName', value: formState.lastName },
            { display_name: 'Phone', variable_name: 'phone', value: formState.phone },
            { display_name: 'Company', variable_name: 'company', value: formState.company },
            { display_name: 'Country/City', variable_name: 'countryCity', value: formState.countryCity },
            { display_name: 'Is Student', variable_name: 'isStudent', value: formState.isStudent.toString() },
            { display_name: 'Dietary Request', variable_name: 'dietaryRequest', value: formState.dietaryRequest },
          ],
        },
        publicKey,
      });

      console.log('Payment successful!', paymentResponse);
      toast.success('Payment successful! Thank you for registering!');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment.');
    }
  };

  return (
    <div className="font-[family-name:var(--font-kanit)] bg-[#f0f0f0] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-50 py-4 px-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Registration</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company/Organization */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company/Organization
                {formErrors.company && <span className="text-red-500"> *</span>}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="company"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${formErrors.company ? 'border-red-500' : ''}`}
                  value={formState.company}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, company: e.target.value }))}
                />
                {formErrors.company && <p className="text-red-500 text-xs italic">{formErrors.company}</p>}
              </div>
            </div>

            {/* Country/City */}
            <div>
              <label htmlFor="countryCity" className="block text-sm font-medium text-gray-700">
                Country/City
                {formErrors.countryCity && <span className="text-red-500"> *</span>}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="countryCity"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${formErrors.countryCity ? 'border-red-500' : ''}`}
                  value={formState.countryCity}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, countryCity: e.target.value }))}
                />
                {formErrors.countryCity && <p className="text-red-500 text-xs italic">{formErrors.countryCity}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                {formErrors.email && <span className="text-red-500"> *</span>}
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${formErrors.email ? 'border-red-500' : ''}`}
                  value={formState.email}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, email: e.target.value }))}
                />
                {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
                {formErrors.phone && <span className="text-red-500"> *</span>}
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="phone"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${formErrors.phone ? 'border-red-500' : ''}`}
                  value={formState.phone}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, phone: e.target.value }))}
                />
                {formErrors.phone && <p className="text-red-500 text-xs italic">{formErrors.phone}</p>}
              </div>
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
                {formErrors.firstName && <span className="text-red-500"> *</span>}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="firstName"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${formErrors.firstName ? 'border-red-500' : ''}`}
                  value={formState.firstName}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, firstName: e.target.value }))}
                />
                {formErrors.firstName && <p className="text-red-500 text-xs italic">{formErrors.firstName}</p>}
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
                {formErrors.lastName && <span className="text-red-500"> *</span>}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="lastName"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${formErrors.lastName ? 'border-red-500' : ''}`}
                  value={formState.lastName}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, lastName: e.target.value }))}
                />
                {formErrors.lastName && <p className="text-red-500 text-xs italic">{formErrors.lastName}</p>}
              </div>
            </div>

            {/* I have read the Refund Policy */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="refundPolicy"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={formState.refundPolicy}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, refundPolicy: e.target.checked }))}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="refundPolicy" className="font-medium text-gray-700">
                  I have read the Refund Policy
                  {formErrors.refundPolicy && <span className="text-red-500"> *</span>}
                </label>
                {formErrors.refundPolicy && <p className="text-red-500 text-xs italic">{formErrors.refundPolicy}</p>}
              </div>
            </div>

            {/* I am a student */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="student"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={formState.isStudent}
                  onChange={(e) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      isStudent: e.target.checked,
                      paymentAmount: e.target.checked ? 5000 : 10000, // Update the payment amount when the checkbox is toggled
                    }));
                  }}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="student" className="font-medium text-gray-700">
                  I am a student
                </label>
                <p className="text-gray-500">
                  Student Package is Available for current students and 2023 graduates downwards
                </p>
              </div>
            </div>

            {/* Dietary Request */}
            <div>
              <label htmlFor="dietaryRequest" className="block text-sm font-medium text-gray-700">
                Dietary Request
              </label>
              <div className="mt-1">
                <textarea
                  id="dietaryRequest"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formState.dietaryRequest}
                  onChange={(e) => setFormState((prevState) => ({ ...prevState, dietaryRequest: e.target.value }))}
                />
              </div>
            </div>

            {/* Upload Student ID */}
            {formState.isStudent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Your student ID or any other valid Document
                  {formErrors.studentId && <span className="text-red-500"> *</span>}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L20 20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L20 20"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Choose file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {formErrors.studentId && <p className="text-red-500 text-xs italic">{formErrors.studentId}</p>}
              </div>
            )}

            {/* Display Payment Amount */}
            <div className="text-center">
              <p className="text-lg font-semibold">
                Payment Amount: NGN {formState.paymentAmount.toLocaleString()}
              </p>
            </div>

            {/* Paystack Button */}
            <div className="flex justify-center">
              <PaystackButton
                email={formState.email}
                amount={formState.paymentAmount * 100} // Amount in kobo
                metadata={{
                  custom_fields: [
                    { display_name: 'First Name', variable_name: 'firstName', value: formState.firstName },
                    { display_name: 'Last Name', variable_name: 'lastName', value: formState.lastName },
                    { display_name: 'Phone', variable_name: 'phone', value: formState.phone },
                    { display_name: 'Company', variable_name: 'company', value: formState.company },
                    { display_name: 'Country/City', variable_name: 'countryCity', value: formState.countryCity },
                    { display_name: 'Is Student', variable_name: 'isStudent', value: formState.isStudent.toString() },
                    { display_name: 'Dietary Request', variable_name: 'dietaryRequest', value: formState.dietaryRequest },
                  ],
                }}
                publicKey={publicKey}
                text="Proceed to Payment"
                onSuccess={(reference) => {
                  console.log('Payment successful!', reference);
                  toast.success('Payment successful! Thank you for registering!');
                }}
                onClose={() => {
                  toast.warn('Payment window closed.');
                }}
                className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            </div>
          </form>

          {/* Deadline and Limited Slots */}
          <div className="mt-6 text-center text-gray-600">
            <p>Deadline: 30 April 2025</p>
            <p>Limited Slots Available !</p>
          </div>

          {/* Refund Policy */}
          <div className="mt-6 text-left text-gray-600">
            <h3 className="font-semibold">Refund Policy</h3>
            <p>
              Cancellations requests must be sent to enquires@qphrf.org. If cancellations are received by the 30
              April 2025, a full refund, minus NGN 18 000 admin fee, will be issued. Cancellations made after 30 April
              2025 will not be refunded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;