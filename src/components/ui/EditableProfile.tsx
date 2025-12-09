import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  profileUpdate,
  uploadImage,
  imageUploadHandle,
  profile,
} from "../../../store/slices/loginSlice.js";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { MdOutlineEdit } from "react-icons/md";

interface ProfileProps {
  name: string;
  email: string;
  profilePicture: string;
  currentPassword: string;
  confirmPassword: string;
}
type shippingProps = {
  shippingChild: React.ReactNode;
};

const EditableProfile: React.FC<shippingProps> = ({ shippingChild }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setprofilePicture] = useState<string | null>("");
  const dispatch = useDispatch();
  const isUpdating = useSelector((state: any) => state?.auth?.isLoading);
  const profileData = useSelector((state: any) => state?.auth?.profile);
  const loding = useSelector((state: any) => state?.auth?.isLoading);
  const image = useSelector((state: any) => state?.auth?.uploadImageLink);
  const uploadedImageUrl = image?.url?.split("?")[0] || "";

  // Formik initial values
  const initialValues = {
    name: profileData?.name || "",
    email: profileData?.email || "",
    profilePicture: profileData?.profilePicture,
    currentPassword: "", // Add this
    newPassword: "",     // Add this
    confirmPassword: "", // Add this
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
    currentPassword: Yup.string().when("newPassword", {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema.required("Current password is required").min(6, "Password must be at least 6 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),
    confirmPassword: Yup.string().when("newPassword", {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your new password"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }, [["newPassword", "currentPassword"]]); 

  // const handleSubmit = (values: typeof initialValues) => {
  //   const updateUploadedImageUrl = profileData.profilePicture.split("?")[0] || "";
  //   const finalValues = { ...values, profilePicture: uploadedImageUrl || updateUploadedImageUrl, };

  //   dispatch(
  //     profileUpdate({
  //       ...finalValues,
  //       onSuccess: () => {
  //         dispatch(profile());
  //       },
  //     })
  //   )
  // };
  const handleSubmit = async (values: typeof initialValues) => {
          setIsEditing(false)
    const file = values.profilePicture as File;

    //   // ✅ If new image uploaded (File instance), upload it first
    if (file && file instanceof File) {
      const payload = {
        key: file.name,
        contentType: file.type,
        file,
        onSuccess: (s3Url: string) => {
          const uploadedUrl = s3Url.split("?")[0];

          // ✅ Dispatch imageUploadHandle to save image info in state
          dispatch(
            imageUploadHandle({
              imageUrl: s3Url,
              file,
              onSuccess: () => {
                const finalValues = {
                  ...values,
                  profilePicture: uploadedUrl,
                };
                dispatch(
                  profileUpdate({
                    ...finalValues,
                    onSuccess: () => {
                      dispatch(profile());
                
                    },
                  })
                );
              },
            })
          );

          // ✅ Now update profile with image URL
        },
        onError: (error: any) => {},
      };

      dispatch(uploadImage(payload));
    } else {
      // ✅ No new image uploaded, use existing image
      const existingImage = profileData?.profilePicture?.split("?")[0];

      const finalValues = {
        ...values,
        profilePicture: existingImage,
      };

      dispatch(
        profileUpdate({
          ...finalValues,
          onSuccess: () => {
            dispatch(profile());
          },
        })
      );
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:pt-9 2xl:pt-9 xl:pt-9 md:pt-9 pt-0 rounded-lg  items-stretch">
      {/* Profile View or Edit */}
      <div className="border p-4 rounded-md bg-white ">
        <p className=" text-base font-semibold  font-figTree">{isEditing ? "Edit Profile":"Profile"}</p>
        <div
          className={`flex flex-col items-center justify-center text-center gap-4 w-full h-[80%] ${
            isEditing ? "mt-5" : "mt-9"
          }`}
        >
          <div className="flex justify-center lg:justify-start ">
            <div
              className={`${
                isEditing && !profilePicture && !profileData?.profilePicture
                  ? "rounded-full border-2 border-gray-300 border-dashed p-2"
                  : ""
              }`}
            >
              <RadixAvatar.Root
                className={`inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-500  overflow-hidden ${
                  isEditing ? "w-20 h-20 text-4xl" : "w-[155px] h-[155px] font-medium text-[68px]"
                }`}
              >
                {profilePicture || profileData?.profilePicture ? (
                  <RadixAvatar.Image
                    src={profilePicture || profileData?.profilePicture}
                    alt={profileData?.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <RadixAvatar.Fallback>
                {profileData?.name?.substring(0, 2)?.toUpperCase()}
                  </RadixAvatar.Fallback>
                )}
              </RadixAvatar.Root>
            </div>
          </div>
          {isEditing ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-2">
                  <Field
                    name="name"
                    type="text"
                    placeholder="* Full Name"
                    className="w-full border px-4 py-2 rounded-md text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs pt-1"
                  />

                  <Field
                    name="email"
                    type="email"
                    placeholder="* Email Address"
                    disabled
                    className="w-full border px-4 py-2 rounded-md text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs pt-1"
                  />

                  <input
                    type="file"
                    id="profileprofilePicture"
                    hidden
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        const previewUrl = URL.createObjectURL(file);
                        setFieldValue("profilePicture", file);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="profilePicture"
                    component="div"
                    className="text-red-500 text-xs pt-1"
                  />

                  <Field
                    name="currentPassword"
                    type="password"
                    placeholder="Current Password"
                    className="w-full border px-4 py-2 rounded-md text-sm"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-xs pt-1"
                  />

                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    className="w-full border px-4 py-2 rounded-md text-sm"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-xs pt-1"
                  />

                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full border px-4 py-2 rounded-md text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs pt-1"
                  />

                  <div className="flex gap-4">
                    <button
                      className="bg-gray-100 text-black py-2 px-4 rounded w-full text-sm"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 rounded text-white py-2 px-4 rounded-sm w-full text-sm"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <div className=" w-full">
                <h3 className="text-2xl font-figTree text-black font-[500]">
                  {profileData?.name}
                </h3>
                <p className="text-sm text-[#0A090B] opacity-50 font-normal font-figTree mt-1">
                  {profileData.email}
                </p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600  hover:opacity-50  rounded  text-white py-2 px-4 rounded-md w-full mt-4 font-extralight text-sm "
                  onClick={() => setIsEditing(true)}
                >
                  <div className=" flex  items-center font-figTree gap-1 justify-center">
                    <MdOutlineEdit />
                    Edit
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full">{shippingChild}</div>
    </div>
  );
};

export default EditableProfile;
