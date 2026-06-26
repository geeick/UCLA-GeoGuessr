import { useState } from "react";

export default function CampusImage({ src, alt, label = "Add UCLA image here", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`image-placeholder ${className}`}>
        <div>
          <strong>{label}</strong>
          <span>Replace the placeholder path with your own photo.</span>
        </div>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}
