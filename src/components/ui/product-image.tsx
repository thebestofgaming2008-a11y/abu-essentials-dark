import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

const ProductImage = ({ src, alt, className = "", loading = "lazy" }: ProductImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/placeholder.svg");
    }
  };

  // Encode special characters in the path for consistency
  const encodedSrc = hasError ? imgSrc : encodeURI(imgSrc);

  return (
    <img
      src={encodedSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

export default ProductImage;
