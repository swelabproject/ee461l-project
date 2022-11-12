import React, { useState } from "react"
import './stylesheet.css';

export const Login = (props) => {
    const [show, setShow] = useState(false)
    const[user, setUser] = useState("")
    const[pwd, setPwd] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // call API validateCredentials
        props.setUserName(user.toString());
        console.log(props.username)
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'user': user, 'password': pwd})
        }
        try {
            fetch("/validateCredentials", reqOptions).then(
                res => res.json()
            ).then((data) => {
                    console.log(data)
                    if (data.validation === "valid") {
                        console.log("found user and password")
                        authorized(e)
                    } else {
                        console.log("DIDNT FIND user and password")
                       invalidCredentials(e)
                    }
                })

        } catch (e) {
            console.log(e)
        }
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

    const handleShowPass = (e) => {

    }

    return (
        <div className="login-container">
            <h1> Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={user}
                       onChange={(e) => setUser(e.target.value)}
                       type="username"
                       placeholder="username"
                       id="username"
                       name="username"></input>
                <label htmlFor="password">Password</label>
                <input value={pwd}
                       onChange={(e) => setPwd(e.target.value)}
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