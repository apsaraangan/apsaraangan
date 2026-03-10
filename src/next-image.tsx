import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function Image({ src, alt, fill, sizes, priority, className = "", ...rest }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`${fill ? "absolute inset-0 w-full h-full object-cover" : ""} ${className}`.trim()}
      {...rest}
    />
  );
}
