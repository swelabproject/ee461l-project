import React, { useState } from "react"
import './stylesheet.css';

export const Login = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        // call API validateCredentials
        e.preventDefault();
        console.log(username + " " + password);
        authorized(e)
    }

    const authorized = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        console.log("changing the page to user home page")
        props.onPageUpdate('user-home')
    }

    const invalidCredentials = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        alert('Invalid credentials. Try again, or create a new account.')
        props.onPageUpdate('login')
    }

    return (
        <div className="login-container">
            <h1> Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username}
                       onChange={(e) => setUserName(e.target.value)}
                       type="username"
                       placeholder="username"
                       id="username"
                       name="username"></input>

                <label htmlFor="password">Password</label>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       placeholder="password"
                       id="password"
                       name="password"></input>
                <button type="submit">Log In</button>
            </form>
            <div id="redirect-container">
                <button className="redirect" onClick={() => props.onPageUpdate('reset-password')}>Forgot password? Reset here.</button>
                <button className="redirect" onClick={() => props.onPageUpdate('new-user')}>First time here? Create an account.</button>
            </div>
        </div>

    )
}