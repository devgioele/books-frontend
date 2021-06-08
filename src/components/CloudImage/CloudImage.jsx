import React from 'react';

export default function CloudImage({
  url,
  cutExtension,
  style = undefined,
  showAlt = true,
  ...remProps
}) {
  let validUrl = url;
  /*
  If the given url ends with an extension, like .jpg,
  we cut it such that only the dot remains
   */
  if (cutExtension) validUrl = url.slice(0, url.lastIndexOf('.') + 1);

  // noinspection HtmlRequiredAltAttribute
  return (
    /*
    Insert sources in all formats supported by our app.
    Browsers start with the first one and try the next one
    if it wasn't compatible. Once they find a suitable source,
    they use it to set the src of the img.
     */
    <picture style={style}>
      {/*
      avif disabled, because due to avif's long encoding times,
      cloudinary's support is currently limited
      <source srcSet={`${url}avif`} type="image/avif" />
       */}
      <source srcSet={`${validUrl}webp`} type="image/webp" />
      <source srcSet={`${validUrl}jp2`} type="image/jp2" />
      <source srcSet={`${validUrl}jxr`} type="image/vnd.ms-photo" />
      <img
        {...remProps}
        style={{ margin: 'auto' }}
        alt={showAlt ?? `cloud-image-${validUrl}`}
      />
    </picture>
  );
}
