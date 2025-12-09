import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Navbar from "@/components/ui/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  blogCreate,
  blogSingleGet,
  blogUpdate,
} from "../../store/slices/bookTemplateSlice";
import {
  uploadImage,
  imageUploadHandle,
  profile,
} from "../../store/slices/loginSlice";
import { useNavigate, useParams } from "react-router-dom";
import BasicLoader from "@/components/ui/basicLoader";
import { IoCloseOutline } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

// ---------------- Types ----------------
interface FormValues {
  title: string;
  content: string;
  image: string | null;
  isPublish: boolean;
  description: string;
}

interface UploadPayload {
  key: string;
  contentType: string;
  file: File;
  onSuccess: (s3Url: string) => void;
  onError: (error: unknown) => void;
}

// ---------------- Component ----------------
export default function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // fetch single blog if editing
  useEffect(() => {
    if (id) {
      dispatch(blogSingleGet({ id }));
    }
  }, [id, dispatch]);

  const blogSingleData = useSelector(
    (state) => state.bookTemplate.blogSingleGetData
  );
  const data = blogSingleData?.data;

  // get profile
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const isNavbarOpen = useSelector(
    (state) => state?.bookTemplate?.isNavbarOpen
  );
  const profileData = useSelector((state) => state.auth.profile);
  const admin = profileData?.role === "admin";

  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setSelectedFile(null);
    formik.setFieldValue("image", null);
  };

  const isLoading = useSelector((state: any) => state?.auth?.isImageUpload);
  const isAuthLoader = useSelector((state: any) => state?.auth?.isLoading);
  const isCreateLoading = useSelector(
    (state: any) => state?.bookTemplate?.isCreate
  );
  const isUpdateLoading = useSelector(
    (state: any) => state?.bookTemplate?.isUpdate
  );

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      title: id ? data?.title || "" : "",
      content: id ? data?.content || "" : "",
      image: id ? data?.image || null : null,
      isPublish: id ? data?.isPublish || false : false,
      description: id ? data?.description || "" : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => {

      const baseValues = {
        title: values.title,
        content: values.content,
        isPublish: values.isPublish,
        description: values.description,
      };

      if (selectedFile) {
        // New image upload case
        const payload = {
          key: selectedFile.name,
          contentType: selectedFile.type,
          file: selectedFile,
          onSuccess: (s3Url: string) => {
            const uploadedUrl = s3Url.split("?")[0];

            dispatch(
              imageUploadHandle({
                imageUrl: s3Url,
                file: selectedFile,
                onSuccess: () => {                
                  formik.setFieldValue("image", uploadedUrl);

                  const finalValues = {
                    ...baseValues,
                    image: uploadedUrl,
                  };

                  if (id) {
                    dispatch(
                      blogUpdate({
                        id,
                        ...finalValues,
                        onSuccess: () => navigate("/admin/blogs"),
                      })
                    );
                  } else {
                    dispatch(
                      blogCreate({
                        ...finalValues,
                        onSuccess: () => navigate("/admin/blogs"),
                      })
                    );
                  }
                },
              })
            );
          },
          onError: (error: any) => {
            console.error("Upload error:", error);
          },
        };
        dispatch(uploadImage(payload));
      } 
      else 
      {
      
        const finalValues = {
          ...baseValues,
          image: values.image.split("?")[0],
        };

        if (id) {
          dispatch(
            blogUpdate({
              id,
              ...finalValues,
              onSuccess: () => navigate("/admin/blogs"),
            })
          );
        } else {
          // Creating new blog without image
          dispatch(
            blogCreate({
              ...finalValues,
              onSuccess: () => navigate("/admin/blogs"),
            })
          );
        }
      }

      helpers.setSubmitting(false);
    },
  });

 
  useEffect(() => {
    if (id && data?.image) {
      setImagePreview(data.image);
      formik.setFieldValue("image", data.image);
    }
  }, [data?.image]);

  return (
    <div className="bg-gray-50 min-h-screen  mt-[66px]">
      <Helmet>
        <title>{id ?  "Update Blog" :"Create Blog"} – StarMe</title>
        <meta
          name="description"
          content="Create a unique book starring your very own pet! The perfect personalized gift for any child. Learn how you can create this magical story yourself!"
        />
        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>
      <div className={`${isNavbarOpen ? "blur-sm" : ""}`}>
        <div className="max-w-4xl mx-auto pt-10 px-4 pb-6">
          <form
            onSubmit={formik.handleSubmit}
            className="p-6 space-y-4 bg-white/70 backdrop-blur-md border border-blue-200 rounded-2xl shadow-2xl"
          >
            <div
              className="flex justify-end"
              onClick={() => {
                navigate("/admin/blogs");
              }}
            >
              <IoCloseOutline />
            </div>
            <h1 className="text-3xl font-semibold text-center bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text font-marcellus text-transparent mb-10">
              {id ? "Update Blog ✨" : "Create Blog 🚀"}
            </h1>

            {/* Title */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 font-figTree mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="Enter your blog title..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none font-figTree focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-figTree mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                placeholder="Short description of your blog..."
                className="w-full border border-gray-300 rounded-lg p-3 font-figTree focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* isPublish */}
            <div className="flex items-center gap-1  ">
              <input
                type="checkbox"
                name="isPublish"
                checked={formik.values.isPublish}
                onChange={formik.handleChange}
                className="h-4 w-4 accent-purple-500 font-figTree"
              />
              <span className="text-gray-800 font-medium font-figTree">
                Publish Immediately?
              </span>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-figTree">
                Content
              </label>
              <ReactQuill
                value={formik.values.content}
                onChange={(value) => formik.setFieldValue("content", value)}
                className="bg-white border border-gray-300 font-figTree rounded-lg"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                  ],
                }}
              />
              <style>{`
                .ql-editor {
                  min-height: 12rem;
                  max-height: 20rem;
                  overflow-y: auto;
                }
              `}</style>
              {formik.touched.content && formik.errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.content}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold font-figTree text-gray-700 mb-1">
                Featured Image
              </label>
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                />

                {imagePreview && (
                  <div className="mt-4 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
           
            </div>

         
            <div className="text-center">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg font-figTree hover:scale-105 transition-all font-semibold text-white text-base py-3 px-8 rounded-xl disabled:opacity-50"
              >
                {isLoading ||
                isAuthLoader ||
                isCreateLoading ||
                isUpdateLoading ? (
                  <BasicLoader />
                ) : id ? (
                  "Update Blog ✏️"
                ) : (
                  "Create Blog 📝"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
