interface ShortenedUrlProps {
  url: string;
}

const ShortenedUrl: React.FC<ShortenedUrlProps> = ({ url }) => {
  return (
    <div>
      <p>Shortened URL: {`http://localhost:3001/bitly/${url}`}</p>
      <button
        onClick={() =>
          navigator.clipboard.writeText(`http://localhost:3001/bitly/${url}`)
        }
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default ShortenedUrl;
