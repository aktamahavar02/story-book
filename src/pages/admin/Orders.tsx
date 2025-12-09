// import React from 'react';

// const Orders = () => {
//   const orders = [
//     { id: 1, customer: 'John Doe', items: 3, total: '$45.99', status: 'Completed', date: '2025-10-20' },
//     { id: 2, customer: 'Jane Smith', items: 1, total: '$15.99', status: 'Processing', date: '2025-10-19' },
//     { id: 3, customer: 'Robert Johnson', items: 2, total: '$29.98', status: 'Shipped', date: '2025-10-18' },
//     { id: 4, customer: 'Emily Davis', items: 1, total: '$19.99', status: 'Pending', date: '2025-10-17' },
//     { id: 5, customer: 'Michael Brown', items: 4, total: '$62.96', status: 'Completed', date: '2025-10-16' },
//   ];

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
//         <p className="text-gray-600">Manage and view all orders</p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium text-gray-800">Order List</h3>
//           <div className="flex space-x-2">
//             <input 
//               type="text" 
//               placeholder="Search orders..." 
//               className="border border-gray-300 rounded-lg px-4 py-2 w-64"
//             />
//             <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
//               Add Order
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       order.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                       order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
//                       order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
//                     <button className="text-red-600 hover:text-red-900">Cancel</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
//           <h3 className="text-lg font-medium mb-2">Total Orders</h3>
//           <p className="text-3xl font-bold mb-4">1,234</p>
//           <p className="text-indigo-100">+15% from last month</p>
//         </div>
        
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white">
//           <h3 className="text-lg font-medium mb-2">Completed Orders</h3>
//           <p className="text-3xl font-bold mb-4">987</p>
//           <p className="text-green-100">+10% from last month</p>
//         </div>
        
//         <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-xl text-white">
//           <h3 className="text-lg font-medium mb-2">Revenue</h3>
//           <p className="text-3xl font-bold mb-4">$24,560</p>
//           <p className="text-amber-100">+20% from last month</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React from 'react'
import OrderAdmin from './OrderAdmin'

const Orders = () => {
  return (
    <div className='mt-[66px]'>
      <OrderAdmin />
    </div>
  )
}

export default Orders