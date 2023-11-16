import React, { useState } from 'react';
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { API } from '../../services/axios';
import LoginBackground from '../../assets/images/loginPage.svg';
import SvgComponentHide from '../../assets/images/Hide';
import SvgComponentSee from '../../assets/images/See';
import logo from '../../assets/images/logo.svg';
import * as userEnum from '../../utils/enum/userEnum';
import Progress from '../../components/shared/Progress';
import { schema } from './schema';
import { IFormInput } from './type';

import './index.css';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (
     event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  
  watch(() => {
    setError('');
  });
  
  const onSubmit: SubmitHandler<IFormInput> = async (loginData) => {
    setIsLoading(true);
    try {
      const { data } = await API.post('/auth/login', loginData);
      localStorage.setItem('access_token', data.AuthToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(data.user.role === userEnum.UserRole.ADMIN ? '/admin' : '/');
    } catch (err: any) {
      setError(err?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
     <>
       <Box className="login">
         <Box className="login-left-side">
           <img
              className="imgLogin"
              src={LoginBackground}
              alt="login welcome back"
           />
           <img className="logoLogin" src={logo} alt="login welcome back" />
         </Box>
         <form className="contentLogin" onSubmit={handleSubmit(onSubmit)}>
           <Typography variant="h2" className="loginWord">
             Login
           </Typography>
           <Typography variant="h3" className="back">
             Welcome back! Please login to your account.
           </Typography>
           <div className="dataContainer">
             <Box className="dataBox">
               <div className="titleLogin">Email</div>
               <Controller
                  {...register('email')}
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                     <>
                       <TextField
                          {...field}
                          placeholder="name.example@gmail.com"
                          variant="outlined"
                          error={!!errors.email}
                          fullWidth
                          margin="dense"
                          style={{ borderColor: '#FF4242' }}
                          helperText={
                            errors.email && !field.value
                               ? `Please enter your email address.`
                               : errors.email
                                  ? 'Invalid Email. Please try again.'
                                  : ''
                          }
                       />
                     </>
                  )}
               />
             </Box>
             <Box className="dataBox">
               <div className="titleLogin">Password</div>
               <Controller
                  {...register('password')}
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                     <>
                       <OutlinedInput
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          error={!!errors.password}
                          fullWidth
                          margin="dense"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                              >
                                {showPassword ? (
                                   <SvgComponentSee />
                                ) : (
                                   <SvgComponentHide />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                       />
                       {errors.password ? (
                          <FormHelperText error id="accountId-error">
                            {errors.password && !field.value
                               ? 'Please enter your password.'
                               : errors.password
                                  ? 'Invalid password. Please try again.'
                                  : ''}
                          </FormHelperText>
                       ) : (
                          ''
                       )}
                     </>
                  )}
               />
             </Box>
           </div>
           <Button className="auth-submit-button" type="submit">
             {!isLoading ? 'Login' : <Progress color="inherit" size={20} />}
           </Button>
           <span className="errorMassage">
             {error ? 'The email address or password is incorrect. Please retry' : ''}
           </span>
         </form>
       </Box>
     </>
  );
};

export default Login;
