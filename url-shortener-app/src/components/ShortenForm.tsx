import React, { useState } from "react";

interface ShortenFormProps {
  onShorten: (originalUrl: string) => Promise<void>;
}

const ShortenForm: React.FC<ShortenFormProps> = ({ onShorten }) => {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleShorten = async () => {
    await onShorten(originalUrl);
  };

  return (
    <div>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleShorten}>Shorten URL</button>
    </div>
  );
};

export default ShortenForm;
