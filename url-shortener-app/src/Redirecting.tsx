import { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

function Redirecting() {
  const { shortCode } = useParams();

  useEffect(() => {
    console.log("shortCode", shortCode);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/url-shortener?shortCode=${shortCode}`
        );
        const data = response.data;
        if (data.originalUrl) window.location.href = data.originalUrl;
      } catch (error) {
        console.error("Error fetching original URL:", error);
      }
    };

    if (shortCode) {
      fetchData();
    }
  }, [shortCode]);

  return <div>Redirecting ...</div>;
}

export default Redirecting;
