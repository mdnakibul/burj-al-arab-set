import React, { useContext } from 'react';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from '@material-ui/core';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // Google Sign In  

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                // The signed-in user info.
                const {displayName,email} = result.user;
                const signedInUser = {
                    name : displayName,
                    email : email,
                }
                setLoggedInUser(signedInUser)
                console.log(email,displayName);
                history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(`Error Code : ${errorCode} ; Error Message : ${errorMessage}; Email : ${email}; Credential : ${credential}`);
            });
    }
    return (
        <div>
            <br/>
            <Button variant="contained" color="primary" onClick={handleGoogleSignIn}> Sign in with google </Button>
        </div>
    );
};

export default Login;