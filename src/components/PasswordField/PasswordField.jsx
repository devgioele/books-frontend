import React, { useRef, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function PasswordField(props) {
  const {
    autoComplete,
    autoFocus = false,
    children,
    // classes,
    className,
    color = 'primary',
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    helperText,
    hiddenLabel,
    id,
    InputLabelProps,
    inputProps,
    InputProps,
    label,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    rowsMax,
    SelectProps,
    type,
    value,
    variant = 'standard',
    ...other
  } = props;
  const inputRef = useRef();
  const [selectionStart, setSelectionStart] = React.useState();
  const updateSelectionStart = () => {
    // noinspection JSUnresolvedVariable
    setSelectionStart(inputRef.current.selectionStart);
  };
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={className}
      color={color}
      disabled={disabled}
      error={error}
      required={required}
      variant={variant}
      onSelect={updateSelectionStart}
      {...other}
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        multiline={multiline}
        name={name}
        rows={rows}
        rowsMax={rowsMax}
        type={showPassword ? 'text' : 'password'}
        value={password}
        id={id}
        inputRef={inputRef}
        onBlur={onBlur}
        onChange={(event) => {
          setPassword(event.target.value);
          onChange(event);
        }}
        onFocus={onFocus}
        placeholder={placeholder}
        inputProps={inputProps}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
                setTimeout(() => {
                  inputRef.current.selectionStart = selectionStart;
                }, 0);
              }}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
}
