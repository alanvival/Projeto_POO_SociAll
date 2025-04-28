import { Button } from '@mui/material';

export default function FormButton({ children, ...props }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 2 }}
      {...props}
    >
      {children}
    </Button>
  );
}
