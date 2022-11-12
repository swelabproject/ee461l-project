import React, { useState } from "react";
import { Login } from "./Pages/Login"
import './Pages/stylesheet.css';
import {Create_User} from "./Pages/Create_User";
import {UserHomePage} from "./Pages/UserHomePage"; 
import {CreateProject} from "./Pages/CreateProject"; 
import {Forgot} from "./Pages/Forgot"; 



function App() {
    const [currentPage, setCurrentPage] = useState('login')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const togglePage = (page) => {
        console.log("updating page to " + page)
        setCurrentPage(page);
    }

    if (currentPage === 'login') {
        console.log("on the login page");
        return (
           <div>
               <Login onPageUpdate={togglePage} username={username} setUserName={setUserName} password = {password} setPassword={setPassword} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
               <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    } else if (currentPage === 'user-home') {
        console.log("on the user home page");
        return (
           <div>
               <UserHomePage onPageUpdate={togglePage} username={username}/>
               <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    } else if (currentPage === 'new-user') {
        console.log("on the create new user page")
        return (
           <div>
               <Create_User onPageUpdate={togglePage}/>
               <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    } else if (currentPage === 'reset-password') {
        console.log("on the reset password page")
        return (
            <div>
               <Forgot onPageUpdate={togglePage}/>
                <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    }
    else if (currentPage === 'create-project') {
        console.log("on the create project page")
        return (
            <div>
               <CreateProject onPageUpdate={togglePage}/>
               <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    }
}

export default App;
