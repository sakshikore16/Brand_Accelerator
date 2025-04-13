import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import BackgroundEffect from "../components/BackgroundEffect";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120B1F] px-6">
      <BackgroundEffect />
      <div className="glass-morphism rounded-xl p-10 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300 gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
