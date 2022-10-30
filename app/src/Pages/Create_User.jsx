import React, { useState } from "react"
import './stylesheet.css';

export const Create_User = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    // const handleSubmit = (e) => {
    //     // call API validateCredentials
    //     fetch("/createNewUser").then(
    //         res => res.json()
    //     ).then(
    //         message => {
    //             console.log(message)
    //         }
    //     )
    //     e.preventDefault();
    //     console.log(username + " " + password);
    //     //authorized(e)
    // }

    //added from jhanvis
    const handleSubmit = (e) => {
        e.preventDefault()
        // call API validateCredentials
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'user': username, 'password': password})
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

    //added from jhanvis
    const authorized = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        console.log("changing the page to user home page")
        props.onPageUpdate('user-home')
    }

    //added from jhanvis
    const invalidCredentials = (e) => {
        // we can access handleLogin from App since it was passed as a prop
        alert('Invalid credentials. Try again, or create a new account.')
        props.onPageUpdate('login')
    }

    return (
        <div className="login-container">
            <h1> Create New User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="New Username">New Username</label>
                <input value={username}
                       onChange={(e) => setUserName(e.target.value)}
                       type="username"
                       placeholder="Username"
                       id="username"
                       name="username"></input>

                <label htmlFor="New Password">New Password</label>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type="password"
                       placeholder="Password"
                       id="password"
                       name="password"></input>

                <label htmlFor="New Name">New Name</label>
                <input value={name}
                       onChange={(e) => setName(e.target.value)}
                       type="name"
                       placeholder="Name"
                       id="name"
                       name="name"></input>


                <button type="submit">Create New User</button>

            </form>

        </div>

    )
}