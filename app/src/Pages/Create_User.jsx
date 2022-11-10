import React, { useState } from "react"
import './stylesheet.css';

export const Create_User = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [id, setID] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handle submit")
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'user': username, 'password': password, 'UserID': id})
        }
        try {
            fetch("/createNewUser", reqOptions).then(
                res => res.json()
            ).then((data) => {
                    console.log(data)
                    if (data.existing === "true") {
                        console.log("Error: User already exists")
                        alert('Error: User already exists\ntry another userID')
                    } else {
                        console.log("Created New User")
                        props.onPageUpdate('login')
                    }
                })

        } catch (e) {
            console.log(e)
        }
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

                <label htmlFor="New ID">New ID</label>
                <input value={id}
                       onChange={(e) => setID(e.target.value)}
                       type="id"
                       placeholder="User ID"
                       id="id"
                       name="id"></input>

                <button type="submit">Create New User</button>

            </form>

        </div>

    )
}
