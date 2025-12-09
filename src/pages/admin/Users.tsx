import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminUsers } from "../../../store/slices/loginSlice.js";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet-async";
import loadingImage from "../../assets/images/purple.gif";

// Pagination component

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of users per page

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminUsers({ page: currentPage }));
  }, [currentPage]);

  const adminUsersRes = useSelector((state) => state?.auth?.adminUsersRes);
  const isUserLoading = useSelector((state) => state?.auth?.isUserLoading);

  // Use API data
  const users = adminUsersRes?.data?.results || [];
  const totalPages = adminUsersRes?.data?.totalPages || 1;

  return (
    <div className="p-6  mt-[66px]">
      <Helmet>
        <title>Users – StarMe Admin</title>

        <meta
          name="description"
          content="Manage and view all user accounts in the StarMe admin panel, including roles, login activity, and account details."
        />

        <link
          rel="canonical"
          href={`${window.location.origin}/${location.pathname}`}
        />
      </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
        <p className="text-gray-600">Manage and view all user accounts</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">User List</h3>
          {/* <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="border border-gray-300 rounded-lg px-4 py-2 w-64"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Add User
            </button>
          </div> */}
        </div>
        {isUserLoading ? (
          <div className="flex items-center justify-center my-20">
            <img src={loadingImage} alt="image" className="w-28" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.role === "Admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "Editor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin || "-"}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={adminUsersRes?.data?.totalPages || 1}
              onPageChange={setCurrentPage}
              totalResults={adminUsersRes?.data?.totalResults}
            />
          </>
        )}

        {/* Pagination */}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
          <h3 className="text-lg font-medium mb-2">Total Users</h3>
          <p className="text-3xl font-bold mb-4">24,531</p>
          <p className="text-indigo-100">+12% from last month</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white">
          <h3 className="text-lg font-medium mb-2">Active Users</h3>
          <p className="text-3xl font-bold mb-4">18,240</p>
          <p className="text-green-100">+8% from last month</p>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-xl text-white">
          <h3 className="text-lg font-medium mb-2">New Users (30 days)</h3>
          <p className="text-3xl font-bold mb-4">1,234</p>
          <p className="text-amber-100">+15% from last month</p>
        </div>
      </div> */}
    </div>
  );
};

export default Users;
