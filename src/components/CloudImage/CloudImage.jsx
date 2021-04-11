import React from 'react';

export default function CloudImage(props) {
  const { url, ...remProps } = props;

  // noinspection HtmlRequiredAltAttribute
  return (
    // Insert sources in all formats supported by our app.
    // Browsers start with the first one and try the next one
    // if it wasn't compatible. Once they find a suitable source,
    // they use it to set the src of the img.
    <picture>
      {/* avif disabled, because due to avif's long encoding times,
       cloudinary's support is currently limited */}
      {/* <source srcSet={`${url}avif`} type="image/avif" /> */}
      <source srcSet={`${url}webp`} type="image/webp" />
      <source srcSet={`${url}jp2`} type="image/jp2" />
      <source srcSet={`${url}jxr`} type="image/vnd.ms-photo" />
      {/* Pass remaining props to img element */}
      <img {...remProps} />
    </picture>
  );
}
