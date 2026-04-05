import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, AlertCircle, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockRevenue = [
  { name: 'Mon', revenue: 4000 }, { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 }, { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 }, { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 5490 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/');
    } else {
      fetchAdminData();
    }
  }, [userInfo, navigate]);

  const fetchAdminData = async () => {
    try {
      const [{ data: pData }, { data: oData }] = await Promise.all([
        api.get('/products'), 
        api.get('/orders')
      ]);
      setProducts(pData);
      setOrders(oData);
    } catch (e) {
      toast.error("Error fetching admin data");
    }
  };

  const handleStockUpdate = async (id, newStock) => {
    try {
      await api.put(`/products/${id}`, { stock: newStock });
      toast.success("Stock Updated!");
      fetchAdminData();
    } catch (e) {
       toast.error("Failed to update stock");
    }
  };

  const KPICard = ({ title, value, icon, trend }) => (
     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
           <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
              <h3 className="text-3xl font-black mt-1 text-gray-900">{value}</h3>
           </div>
           <div className="text-primary bg-primary/10 p-3 rounded-full">{icon}</div>
        </div>
        <p className={`text-xs font-bold tracking-widest ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}% from last week
        </p>
     </div>
  );

  return (
    <div className="min-h-screen bg-surface flex pt-20">
      
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0 relative z-10 hidden md:block select-none">
        <h2 className="text-xs font-black tracking-widest uppercase text-gray-400 mb-8 border-b pb-4">Command Centre</h2>
        <nav className="space-y-2 font-medium tracking-wide text-sm text-gray-600">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center justify-start gap-4 px-4 py-3 rounded transition-colors ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50'}`}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center justify-start gap-4 px-4 py-3 rounded transition-colors ${activeTab === 'products' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50'}`}>
            <Package size={18} /> Inventory
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center justify-start gap-4 px-4 py-3 rounded transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50'}`}>
            <ShoppingCart size={18} /> Orders
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in space-y-8">
            <h1 className="text-3xl font-black tracking-tighter text-gray-900">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Total Revenue" value="₹42,500" icon={<TrendingUp size={24} />} trend={12} />
              <KPICard title="Orders Today" value={orders.length} icon={<ShoppingCart size={24} />} trend={5} />
              <KPICard title="Low Stock Alerts" value={products.filter(p => p.stock < 5).length} icon={<AlertCircle size={24} />} trend={-2} />
              <KPICard title="New Users" value="234" icon={<LayoutDashboard size={24} />} trend={18} />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Revenue Trajectory</h3>
               <div className="h-72 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockRevenue}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 'bold' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 'bold' }} tickFormatter={(v) => `₹${v}`} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={4} activeDot={{ r: 8, fill: '#4F46E5', strokeWidth: 0 }} />
                    </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
           <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                 <h1 className="text-3xl font-black tracking-tighter text-gray-900">Inventory</h1>
                 <button className="bg-gray-900 text-white flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest text-xs rounded hover:bg-primary transition shadow-md">
                   <Plus size={16} /> Add Product
                 </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                 <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-700 font-bold">
                       <tr>
                          <th className="px-6 py-4">Product</th>
                          <th className="px-6 py-4">Price</th>
                          <th className="px-6 py-4">Stock</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {products.map(p => (
                          <tr key={p._id} className={`hover:bg-gray-50 transition ${p.stock < 5 ? 'bg-red-50/50' : ''}`}>
                             <td className="px-6 py-4 flex items-center gap-4">
                               <img src={p.images[0]} alt="" className="w-10 h-10 rounded bg-white object-cover border" />
                               <span className="font-medium text-gray-900">{p.name}</span>
                             </td>
                             <td className="px-6 py-4 font-bold text-gray-900">₹{p.price}</td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <input 
                                     type="number" min="0" defaultValue={p.stock} 
                                     className="w-16 p-1 border border-gray-200 rounded text-center text-xs font-bold focus:ring-1 focus:ring-primary outline-none"
                                     onBlur={(e) => {
                                        if (parseInt(e.target.value) !== p.stock) {
                                           handleStockUpdate(p._id, parseInt(e.target.value));
                                        }
                                     }}
                                  />
                                  {p.stock < 5 && <AlertCircle size={14} className="text-red-500" title="Low Stock" />}
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right flex justify-end gap-3">
                                <button className="text-gray-400 hover:text-primary transition"><Edit2 size={16} /></button>
                                <button className="text-gray-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
