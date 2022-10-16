import React, { useState } from "react";
import { Login } from "./Pages/Login"
import { Forgot } from "./Pages/Forgot"
import './Pages/stylesheet.css';


function App() {
    const [currentPage, setCurrentPage] = useState('login')

    const togglePage = (page) => {
        console.log("updating page to " + page)
        setCurrentPage(page);
    }

    if (currentPage === 'login') {
        console.log("on the login page");
        return (
           <div>
               <Login onPageUpdate={togglePage}/>
               <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    } else if (currentPage === 'user-home') {
        console.log("on the user home page");
        return (
           <div>
               <p> user home page placeholder </p>
               <button onClick={() => setCurrentPage('login')}className="redirect"> Return to Login page.</button>
           </div>
        )
    } else if (currentPage === 'new-user') {
        console.log("on the create new user page")
        return (
           <div>
               <p> create new user placeholder </p>
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
}

export default App;
