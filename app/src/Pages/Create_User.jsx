import React, { useState } from "react"
import './stylesheet.css';

export const Create_User = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [id, setID] = useState('')

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






    // //added from jhanvis
    // const authorized = (e) => {
    //     // we can access handleLogin from App since it was passed as a prop
    //     console.log("changing the page to user home page")
    //     props.onPageUpdate('user-home')
    // }
    //
    // //added from jhanvis
    // const invalidCredentials = (e) => {
    //     // we can access handleLogin from App since it was passed as a prop
    //     alert('Invalid credentials. Try again, or create a new account.')
    //     props.onPageUpdate('login')
    // }

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

                {/* <label htmlFor="New userID">New Name</label>*/}
                {/*<input value={name}*/}
                {/*       onChange={(e) => setName(e.target.value)}*/}
                {/*       type="userID"*/}
                {/*       placeholder="UserID"*/}
                {/*       id="UserID"*/}
                {/*       name="UserID"></input>*/}


                <button type="submit">Create New User</button>

            </form>

        </div>

    )
}