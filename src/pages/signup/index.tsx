import { useNavigate } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { API } from "../../services/axios";

import "./index.css";

interface IFormInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().required().email(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().min(6).required(),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined])
        .required(),
});

const SignUp = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });
    const onSubmit: SubmitHandler<IFormInput> = async (registerData) => {
        try {
            const { data } = await API.post("register", {
                ...registerData,
                repeatPassword: undefined,
            });
            localStorage.setItem("access_token", data);
            navigate("/");
        } catch (err: any) {
            setError(err?.response?.data);
        }
    };

    const handleClose = () => {
        setError("");
    };

    return (
        <>
            <Box className="signup">
            <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
                <form className="content" onSubmit={handleSubmit(onSubmit)}>
                    <Typography className="title">Sign Up</Typography>
                    <Box className="inputs">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    fullWidth
                                    margin="dense"
                                    helperText={
                                        errors.email
                                            ? errors.email?.message
                                            : ""
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First Name"
                                    variant="outlined"
                                    error={!!errors.firstName}
                                    fullWidth
                                    margin="dense"
                                    helperText={
                                        errors.firstName
                                            ? errors.firstName?.message
                                            : ""
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Last Name"
                                    variant="outlined"
                                    error={!!errors.lastName}
                                    fullWidth
                                    margin="dense"
                                    helperText={
                                        errors.lastName
                                            ? errors.lastName?.message
                                            : ""
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    error={!!errors.password}
                                    fullWidth
                                    margin="dense"
                                    helperText={
                                        errors.password
                                            ? errors.password?.message
                                            : ""
                                    }
                                />
                            )}
                        />
                        <Controller
                            name="repeatPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Repeat Password"
                                    variant="outlined"
                                    error={!!errors.repeatPassword}
                                    fullWidth
                                    margin="dense"
                                    helperText={
                                        errors.repeatPassword
                                            ? errors.repeatPassword?.message
                                            : ""
                                    }
                                />
                            )}
                        />
                    </Box>
                    <Box className="buttons">
                        <Button
                            className="auth-navigate-button"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </Button>
                        <Button className="auth-submit-button" type="submit">
                            Sign Up
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default SignUp;
