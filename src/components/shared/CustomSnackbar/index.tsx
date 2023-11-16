import { Alert, Snackbar } from '@mui/material';
import { CustomSnackbarProps } from './type';

const CustomSnackbar = ({ error, handleClose }: CustomSnackbarProps) =>
   <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
     <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
       {error}
     </Alert>
   </Snackbar>;

export default CustomSnackbar;