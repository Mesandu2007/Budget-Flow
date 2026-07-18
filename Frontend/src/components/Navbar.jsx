import { Menu, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../../api/axios";

export default function Navbar({ setSidebarOpen }) {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getUserProfile()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";

      case "/transactions":
        return "Transactions";

      case "/budgets":
        return "Budgets";

      case "/analytics":
        return "Analytics";

      default:
        return "FinTrack";
    }
  };

  return (
    <div className="h-16 bg-white shadow-sm flex justify-between items-center px-4 md:px-6 sticky top-0 z-40">

    
      <div className="flex items-center gap-3">

      
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        
        <h2 className="font-bold text-lg text-gray-800">
          {getTitle()}
        </h2>
      </div>

      
      <div className="flex items-center gap-3">

        
        {user && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">

            
            <UserCircle className="text-gray-600" size={34} />

          
            <div className="text-left">

              <p className="font-semibold text-sm md:text-base text-gray-800 leading-none">
                {user.name}
              </p>

              <p className="text-xs text-gray-500 hidden md:block">
                {user.email}
              </p>

            </div>
          </div>
        )}

      
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}