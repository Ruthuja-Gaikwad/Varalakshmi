import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin 👋</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-xl p-6">Total Products</div>
          <div className="bg-white shadow-md rounded-xl p-6">Pending Orders</div>
          <div className="bg-white shadow-md rounded-xl p-6">Inquiries</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
