import { useState } from "react";
import axios from "axios";
import ShortenForm from "./components/ShortenForm";
import ShortenedUrl from "./components/ShortenedUrl";
import "./styles.css";

function App() {
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleShorten = async (originalUrl: string) => {
    try {
      const response = await axios.post("http://localhost:3000/url-shortener", {
        originalUrl,
      });

      const data = response.data;
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <ShortenForm onShorten={handleShorten} />
      {shortenedUrl && <ShortenedUrl url={shortenedUrl} />}
    </div>
  );
}

export default App;
