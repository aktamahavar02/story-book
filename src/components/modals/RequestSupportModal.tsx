import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { requestSupport } from "../../../store/slices/bookTemplateSlice.js";
import { useParams } from "react-router-dom";
import BasicLoader from "../ui/basicLoader.js";

type PopupProps = {
  openPop: boolean;
  setOpenPop: React.Dispatch<React.SetStateAction<boolean>>;
};

const RequestSupportModal: React.FC<PopupProps> = ({ openPop, setOpenPop }) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .max(50, "Maximum 50 characters allowed")
      .required("The email field is required."),
    message: Yup.string()
      .required("The message field is required.")
      .min(5, "Message must be at least 5 characters")
      .max(500, "Message cannot exceed 500 characters"),
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoadBook = useSelector((state) => state?.bookTemplate?.isLoading);
  return (
    <Dialog open={openPop} onOpenChange={setOpenPop}>
      <div className="fixed top-14 left-0 right-0 bottom-0 bg-[rgba(115,121,135,0.9)]  backdrop-blur-sm z-50" />
      <DialogContent className=" w-[80%] max-w-sm sm:max-w-2xl rounded-lg [&>button]:hidden p-4">
        <h2 className="font-figTree text-xl font-semibold">Request Support</h2>

        <Formik
          initialValues={{ email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const data = {
              id,
              email: values?.email,
              message: values?.message,
            };
            dispatch(
              requestSupport({
                id,
              email: values?.email,
              message: values?.message,
                onSuccess: () => {
                  setOpenPop(false);
                },
              })
            );
          }}
        >
          {({ handleChange, touched, errors }) => (
            <Form>
              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 font-figTree"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border p-1 focus:outline-none focus:ring-2 ${
                    touched.email && errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-purple-400"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 font-figTree"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  name="message"
                  placeholder="Enter Your Message Here..."
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border p-2 focus:outline-none focus:ring-2 ${
                    touched.message && errors.message
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-purple-400"
                  }`}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenPop(false)}
                  className="px-4 py-2 rounded-sm  text-sm  font-figTree text-purple-500  bg-gradient-to-r border w-20 sm:w-28 bg-purple-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-sm font-figTree text-white  bg-gradient-to-r border w-20 sm:w-28 from-purple-500 to-pink-500  
               hover:bg-purple-700"
                >
                {isLoadBook ? <BasicLoader /> :"Submit" }
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RequestSupportModal;
