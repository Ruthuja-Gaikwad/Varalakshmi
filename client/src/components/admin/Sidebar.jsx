import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Admin Panel</div>
      <ul className="flex flex-col p-4 space-y-4">
        <li><Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>
        <li><Link to="/admin/add-product" className="hover:text-yellow-400">Add Product</Link></li>
        <li><Link to="/admin/orders" className="hover:text-yellow-400">Orders</Link></li>
        <li><Link to="/admin/enquiries" className="hover:text-yellow-400">Enquiries</Link></li> {/* New Link for Enquiries Page */}
      </ul>
    </div>
  );
};

export default Sidebar;
