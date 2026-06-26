import { useState } from "react";

export default function ImageWithFallback({ src, alt, className = "", label = "Add UCLA image here" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`image-fallback ${className}`}>
        <div>
          <strong>{label}</strong>
          <span>Replace the placeholder path in the data file.</span>
        </div>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}
