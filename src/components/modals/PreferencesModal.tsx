import React from "react";
import { useFormik } from "formik";

const PreferencesModal = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      country: "Iraq",
      currency: "EUR",
    },
    onSubmit: (values) => {
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Ship To */}
          <label className="block text-sm font-medium mb-1">Ship To</label>
          <select
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none"
          >
            <option value="Iraq">Iraq</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">United Kingdom</option>
          </select>

          {/* Currency */}
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none"
          >
            <option value="EUR">Euro (EUR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="GBP">British Pound (GBP)</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesModal;
