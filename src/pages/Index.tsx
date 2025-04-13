import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChartLoadingAnimation from '../components/ChartLoadingAnimation';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state on mount
    setIsLoading(true);
    
    // Set a timeout to redirect after the animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate('/HomePage');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  // Always show the loading animation when this component is mounted
  return <ChartLoadingAnimation />;
};

export default Index;
