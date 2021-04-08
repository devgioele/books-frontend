import React from 'react';

export default function WebImg(props) {
  const { avif, webp, jp2, jxr, ...remProps } = props;

  // noinspection HtmlRequiredAltAttribute
  return (
    // Insert sources in all formats supported by our app.
    // Browsers start with the first one and try the next one
    // if it wasn't compatible. Once they find a suitable source,
    // they use it to set the src of the img.
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <source srcSet={jp2} type="image/jp2" />
      <source srcSet={jxr} type="image/vnd.ms-photo" />
      {/* Pass remaining props to img element */}
      <img {...remProps} />
    </picture>
  );
}
