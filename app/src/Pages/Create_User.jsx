import React, { useState } from "react"
import './stylesheet.css';

export const Create_User = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        // call API validateCredentials
        fetch("/createNewUser").then(
            res => res.json()
        ).then(
            message => {
                console.log(message)
            }
        )
        e.preventDefault();
        console.log(username + " " + password);
        //authorized(e)
    }

    /*const authorized = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        console.log("changing the page to user home page")
        props.onPageUpdate('user-home')
    }

    const invalidCredentials = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        alert('Invalid credentials. Try again, or create a new account.')
        props.onPageUpdate('login')
    }*/

    return (
        <div className="login-container">
            <h1> Create New User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="New Username">New Username</label>
                <input value={username}
                       onChange={(e) => setUserName(e.target.value)}
                       type="username"
                       placeholder="username"
                       id="username"
                       name="username"></input>

                <label htmlFor="New Password">New Password</label>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       placeholder="password"
                       id="password"
                       name="password"></input>
                <button type="submit">Create New User</button>
            </form>
            <div id="redirect-container">
                <button className="redirect" onClick={() => props.onPageUpdate('login')}>go back to login page</button>
            </div>
        </div>

    )
}