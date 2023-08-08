import { authService } from "fbase";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState();

    const onSocialClcick = async (event) => {
        const {
            target: { name },
        } = event;

        let provider;

        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }


    const onChange = (event) => {
        //console.log(event.target.name);
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;

            const auth = authService;
            if (newAccount) {
                //create Account 
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // log in
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }

    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange} />
                <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign in"} />
                {error}
            </form>
            <span onClick={toggleAccount}> {newAccount ? "Sign in" : "Create Account"} </span>
            <div>
                <button name="google" onClick={onSocialClcick}>Continue with Google</button>
                <button name="github" onClick={onSocialClcick}>Continue with Github</button>
            </div>
        </div>
    );
}



export default Auth;