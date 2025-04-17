"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import PersonalInformation from "./forms/PersonalInformation";
import { personalInformation, FormErrors } from "../types";

export default function FormContent() {
  const [formData, setFormData] = useState<personalInformation>({
    firstName: "",
    lastName: "",
    province: "",
  });

  //state to manage the form errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: personalInformation) => ({ ...prev, [name]: value }));
  };
  // form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.firstName?.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName?.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.province?.trim()) {
      errors.province = "Province is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //handling the submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    //these sends the data to the webhook
    try {
      const response = await fetch("https://hook.us2.make.com/mpxm1ftor6pophwiqu23gzznhvns6w33", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      setSuccess(true);
      setFormData({ firstName: "", lastName: "", province: "" });
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // This is the main form component
    <div className="min-h-screen bg-[#FAF8FF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
        Search for an  Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <PersonalInformation
            formData={formData}
            errors={formErrors}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">Form submitted successfully!</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-md text-white ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
