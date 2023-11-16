import { FC, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material';
import SvgComponentSee from '../../../assets/images/See';
import SvgComponent from '../../../assets/images/Arrow';
import SvgComponentHide from '../../../assets/images/Hide';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { API } from '../../../services/axios';
import { IFormInput, IProps } from './types';

import './index.css';

const UserForm: FC<IProps> = ({
  setShowModal,
  editData,
  onFinish,
}): JSX.Element => {
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required('Email is a required field').email(),
    username: yup.string().required('Username is a required field'),
    password: editData?.id ? yup.string() : yup.string().required('Password is a required field').min(8, 'Password must be at least 8 characters'),
    companyName: yup.string().required('Company name is a required field'),
    role: yup.string().required(),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IFormInput> = async (
    userData
  ): Promise<void> => {
    try {
      if (editData) {
        const newUser = { ...userData };
        await API.put(`users/${editData.id}`, newUser);
      } else {
        await API.post('users/signup', userData);
      }
      setShowModal(false);
      onFinish();
    } catch (err: any) {
      setError(err?.response?.data);
    }
  };

  const handleClose = (): void => {
    setError('');
  };

  return (
    <>
      <Box className="container">
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        <form className="user-content" onSubmit={handleSubmit(onSubmit)}>
          <Typography className="user-from-title">
            {editData ? 'Edit' : 'Add'} user
          </Typography>
          <div className="wrapInput">
            <p className="label">Username <span className='asterisk'>*</span></p>
            <Controller
              name="username"
              control={control}
              defaultValue={editData?.username ?? ''}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  type="text"
                  placeholder="Username"
                  variant="outlined"
                  error={!!errors.username}
                  fullWidth
                  margin="dense"
                  helperText={errors?.username?.message ?? ''}
                />
              )}
            />
          </div>
          <div className='wrapInput'>
            <p className="label">Email <span className='asterisk'>*</span></p>
            <Controller
              name="email"
              control={control}
              defaultValue={editData?.email ?? ''}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  placeholder="name.example@gmail.com"
                  type="text"
                  variant="outlined"
                  error={!!errors.email}
                  fullWidth
                  margin="dense"
                  helperText={errors.email?.message ?? ''}
                />
              )}
            />
          </div>
          <div className='wrapInput'>
            <p className="label">Company name <span className='asterisk'>*</span></p>
            <Controller
              name="companyName"
              control={control}
              defaultValue={editData?.companyName ?? ''}
              render={({ field }) => (
                <TextField
                  className="inputField"
                  {...field}
                  placeholder="Company name"
                  type="text"
                  variant="outlined"
                  error={!!errors.companyName}
                  fullWidth
                  margin="dense"
                  helperText={errors.companyName?.message ?? ''}
                />
              )}
            />
          </div>
          <div className='wrapInput'>
            <p className="label">Role </p>
            <Controller
              name="role"
              control={control}
              defaultValue={editData?.role ?? ''}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select
                    IconComponent={SvgComponent}
                    className="inputField"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    {...field}
                  >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>
          {!editData?.id && (
            <div className='wrapInput'>
              <p className="label">Password <span className='asterisk'>*</span></p>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    className="inputField"
                    {...field}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    error={!!errors.password}
                    fullWidth
                    margin="dense"
                    helperText={errors.password?.message ?? ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <SvgComponentSee /> : <SvgComponentHide />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
          )}
          <Box className="buttons">
            <Button className="submitButton" type="submit">
              {editData ? 'Save Changes' : 'Add User'}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default UserForm;
