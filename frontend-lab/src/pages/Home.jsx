import { useState, useEffect } from 'react';

export default function Home() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the React 19 Frontend Lab.</p>
      <p>Current viewport width: {width}px (tested with useEffect cleanup)</p>
    </div>
  );
}
