import React from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiSettings, 
  FiPackage,
  FiBarChart2,
  FiSearch,
  FiBox,
  FiList
} from 'react-icons/fi';

const Sidebar = ({ sidebarActive, setSidebarActive }) => {
  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'products', label: 'Sản phẩm', icon: FiBox },
    { id: 'categories', label: 'Danh mục', icon: FiList },
    { id: 'orders', label: 'Đơn hàng', icon: FiShoppingCart },
    { id: 'customers', label: 'Khách hàng', icon: FiUsers },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 size={20} /> },
    { id: 'settings', label: 'Cài đặt', icon: FiSettings }
  ];

  return (
    <div className="h-screen w-64 bg-white border-r flex flex-col">
      {/* Logo & Search */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800 mb-4">EGA Admin</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`
                flex items-center px-3 py-2 rounded-lg cursor-pointer
                transition-colors duration-150 ease-in-out
                ${sidebarActive === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
              onClick={() => setSidebarActive(item.id)}
            >
              <span className={`mr-3 ${sidebarActive === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">R</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Randhir kumar</p>
            <p className="text-xs text-gray-500">admin@ega.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 