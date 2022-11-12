import React, { useState } from "react"
import './stylesheet.css';
import { CreateProject } from "./CreateProject";
import { useEffect } from "react";

//do the let project = [call the API for array under authorized users]
//return is just displaying the create user bs 


export const UserHomePage = (props) => {
    const  [projects, setProjects] = useState([]); 
    console.log(props.username); 
    async function listOfProjects() {
        const information = {
            method: "POST", 
            headers: { 'content-type': 'application/json'}, 
            body: JSON.stringify({ "username": props.username})
        }
        const response = await fetch("/getAuthorizedProjects", information); 
        const value = await response.json(); 
        console.log("reached")
        setProjects(value.projects); 
        console.log(value.projects); 
    } 

    const handlePage = (val) => {
        //depends on setCurrentPage to resources and pass in username
    }

    // const buttons = projects.map((proj_name) => {
    //     <button value={proj_name} onClick={(e) => handlePage(e.target.value)}className="redirect"> {proj_name} </button>
    //     console.log("inside the map")
    // });
    
    useEffect(() => {
        listOfProjects(); 
    }, []); 

    const loadProjects = (val) => {
        
    }

    return (
        <div className="login-container">
            <h1> UserName Home </h1>
            <h2> Project List </h2>
            <button></button>
            {/* {buttons} */}
        </div>
    );
}



 {/* for projID in user["joinedProjects"]:
            Projects.append(get_project_info(projID, proj_collection))
             */}
    
// {/* <        div className={styles.splitScreen}>
//             <div className={styles.topPane}>{topPane}</div>
//             <div className={styles.bottomPane}>{bottomPane}</div>
//         </div> */}

  