import React, { useRef, useState } from 'react';
import {
  FormControl,
  FormHelperText,
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

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

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
      <InputLabel htmlFor={id} id={inputLabelId} {...InputLabelProps}>
        {label}
      </InputLabel>
      <OutlinedInput
        label={label}
        aria-describedby={helperTextId}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        multiline={multiline}
        name={name}
        rows={rows}
        rowsMax={rowsMax}
        type={showPassword ? 'text' : 'password'}
        value={value ?? password}
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
      />
      {helperText && (
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
