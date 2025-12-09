import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PaymentForm: React.FC = () => {
  const initialValues = {
    email: '',
    country: 'India',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    state: '',
    shippingMethod: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    fullName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    shippingMethod: Yup.string().required('Please select a shipping method'),
  });

  const onSubmit = (values: typeof initialValues) => {
  };

  return (
    <div className="max-w-max mx-4 p-4 md:p-10 border rounded-md bg-white">
      <h2 className="text-2xl font-marcellus mb-6">Payment</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email */}
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <Field name="email" type="email" className="w-full border rounded px-3 py-2 h-10" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                <p className="text-xs text-gray-600 mt-1">
                  This email will be used to keep you informed about your order status and details.
                </p>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-sm text-purple-600">Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <Field as="select" name="country" className="border px-3 py-2 rounded">
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Field name="fullName" placeholder="* Full Name" className="w-full border px-3 py-2 rounded h-10" />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <Field name="phone" placeholder="* Phone Number" className="w-full border px-3 py-2 rounded h-10" />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <Field name="street" placeholder="* Street" className="w-full border px-3 py-2 rounded h-10" />
                  <Field name="city" placeholder="* City" className="w-full border px-3 py-2 rounded h-10" />
                  <Field name="zip" placeholder="* Postal/Zip Code" className="w-full border px-3 py-2 rounded h-10" />
                  <Field name="state" placeholder="* State/Province" className="w-full border px-3 py-2 rounded h-10" />
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <input type="checkbox" checked readOnly />
                  <label>Save Shipping details</label>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="font-semibold text-sm text-gray-800 mb-3">Shipping Method</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="border rounded p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Field type="radio" name="shippingMethod" value="standard" />
                      <div>
                        <div className="font-semibold">Standard</div>
                        <div className="text-xs text-gray-600">10-17 Business Days</div>
                      </div>
                    </div>
                    <div className="font-semibold">$7.00</div>
                  </label>

                  <label className="border rounded p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Field type="radio" name="shippingMethod" value="express" />
                      <div>
                        <div className="font-semibold">Express</div>
                        <div className="text-xs text-gray-600">8-10 Business Days</div>
                      </div>
                    </div>
                    <div className="font-semibold">$21.00</div>
                  </label>
                </div>
                <ErrorMessage name="shippingMethod" component="div" className="text-red-500 text-sm mt-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                <img src="https://storage.wonderwraps.com/e360d13e-19be-4b0e-a9a4-753446a259b7/conversions/image-thumb.jpeg" alt="cover" className="w-16 h-20 rounded shadow" />
                <div>
                  <h4 className="font-semibold text-sm">Princess Babay and the Glowing Flower</h4>
                  <div className="text-sm text-gray-500 line-through">$50.00</div>
                  <div className="text-purple-600 font-semibold text-lg">$39.99</div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                <h4 className="font-semibold">Shipping</h4>
                <p>After selecting the shipping method, the total price will be calculated here.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-3 rounded font-semibold hover:bg-purple-600 transition"
              >
                Pay $39.99
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;