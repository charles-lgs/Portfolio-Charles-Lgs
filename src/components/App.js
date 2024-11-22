import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Portfolio from "./Portfolio.tsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Portfolio />
    </div>
  );
}

export default App;
