import { TextField } from '@material-ui/core';
import React from 'react';

function match(text, regexes) {
  const values = {};

  Object.keys(regexes)
    .every((key) => {
      const regex = regexes[key];
      const matches = text.match(regex);
      // If regex matches exactly
      if (matches !== null && matches.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        values[key] = matches[0];
        return false; // Stops the traversal
      }
      return true;
    });

  return values;
}

export default function RegexTextField({
  regexes,
  onChange,
  ...remProps
}) {
  return (
    <TextField
      id='outlined-basic'
      variant='outlined'
      color='secondary'
      onChange={(event) => onChange(match(event.target.value, regexes))}
      {...remProps}
    />
  );
}
