import { TextField } from '@mui/material';

export default function FormInput({ label, type = 'text', value, onChange, ...props }) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
