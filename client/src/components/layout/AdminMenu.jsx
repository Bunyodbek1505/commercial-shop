import { Link } from "react-router-dom";
import { LayoutDashboard, ListPlus, Package, Users } from 'lucide-react';

const AdminMenu = () => {
  const menuItems = [
    { path: '/dashboard/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/dashboard/admin/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/dashboard/admin/create-category', icon: <ListPlus size={20} />, label: 'Create Category' },
    { path: '/dashboard/admin/create-product', icon: <LayoutDashboard size={20} />, label: 'Create Product' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full lg:w-64">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Admin Panel</h4>
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminMenu;