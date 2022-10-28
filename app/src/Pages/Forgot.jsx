import React, { useState } from "react"
import './stylesheet.css';

export const Forgot = (props) => {
    const [username, setUserName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // call API validateusername
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'user': username})
        }
        try {
            fetch("/validateUsername", reqOptions).then(
                res => res.json()
            ).then((data) => {
                    console.log(data)
                    if (data.validation === "valid") {
                        console.log("found user")
                        authorized(e)
                    } else {
                        console.log("DIDNT FIND username")
                       invalidUsername(e)
                    }
                })

        } catch (e) {
            console.log(e)
        }
    }
    //if our username exists, generate a password and send it to the user's email
    const authorized = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        console.log("email password to user")
        props.onPageUpdate('reset-password')
    }

    const invalidUsername = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        alert('Invalid Username. Try again, or create a new account.')
        props.onPageUpdate('reset-password')
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
                <button type="submit">Reset Password</button>
            </form>
        </div>

    )
}