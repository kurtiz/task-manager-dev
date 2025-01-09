import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {AuthProvider} from "react-oidc-context";
import App from "@/App.tsx";
import {LOGIN_REDIRECT} from "@/constants.ts";


const cognitoAuthConfig = {
    authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_QD3Q3j768",
    client_id: "7ed028j7isbb9je8k6sung8764",
    redirect_uri: LOGIN_REDIRECT,
    response_type: "code",
    scope: "email openid phone profile",
};


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App/>
        </AuthProvider>
    </StrictMode>
)
