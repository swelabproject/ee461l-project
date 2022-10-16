import React, { useState } from "react"
import './stylesheet.css';

export const Forgot = (props) => {
    const [username, setUserName] = useState('')

    const handleSubmit = (e) => {
        // call API validateUsername
        fetch("/validateUsername").then(
            res => res.json()
        ).then(
            message => {
                console.log(message)
            }
        )
        e.preventDefault();
        console.log(username);
        authorized(e)
    }
    //if our username exists, generate a password and send it to the user's email
    const authorized = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        console.log("email password to user")
        props.Update('user-home')
    }

    const invalidUsername = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        alert('Invalid credentials. Try again, or create a new account.')
        props.onPageUpdate('login')
    }
    
    return (
        <div className="login-container">
            <h1>Forgot Your Password?</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username}
                       onChange={(e) => setUserName(e.target.value)}
                       type="username"
                       placeholder="username"
                       id="username"
                       name="username"></input>
            </form>
        </div>

    )
}