import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from './Auth'

const SignIn = () => {
    return (
        <Auth onSubmit={async () => { console.log("???") }} submitButtonLabel='Sign in'>
            <div style={{ alignSelf: "center" }}>
                <MuiLink component={Link} to="/sign-up">
                    Don't have an account? Sign up
                </MuiLink>
            </div>
        </Auth>
    )
}

export default SignIn;
