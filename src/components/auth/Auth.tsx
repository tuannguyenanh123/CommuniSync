import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type AuthProps = {
    submitButtonLabel: string;
    onSubmit: () => Promise<void>; //credentials: { email: string; password: string }
    children: React.ReactNode;
    additionalFields?: React.ReactNode[];
    error?: string;
};

const Auth = ({
    submitButtonLabel,
    onSubmit,
    error,
    children,
    additionalFields,
}: AuthProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { data } = useGetMe();
    const navigate = useNavigate();

    useEffect(() => {
        // if (data) {
        // navigate("/");
        // }
    }, [navigate]);
    return (
        <Stack
            spacing={4}
            sx={{
                height: "100vh",
                maxWidth: {
                    xs: "100%",
                    sm: "50%",
                },
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <TextField
                label="Email"
                type="email"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={Boolean(error)}
                helperText={error}
            />
            {additionalFields}
            <TextField
                label="Password"
                type="password"
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={!!error}
                helperText={error}
            />
            <Button variant="contained"
                onClick={() => onSubmit()}
            >
                {submitButtonLabel}
            </Button>
            {children}
        </Stack>

    )
}

export default Auth