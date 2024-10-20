import React from 'react'
import Auth from './Auth';
import { Link as MuiLink } from "@mui/material";
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <Auth onSubmit={async () => { console.log("???") }} submitButtonLabel='Sign up' >
            <div style={{ alignSelf: "center" }}>
                <MuiLink component={Link} to="/sign-in">
                    Already have an account? Sign in
                </MuiLink>
            </div>
        </Auth>
    )
}

export default SignUp;
