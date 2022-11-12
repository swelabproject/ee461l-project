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

    useEffect(() => {
        listOfProjects();
    }, []); 

    let buttonslist = []
    console.log(projects)
    // const res = fetch("/getAuthorizedProjectNames", projects)
    // const projname = res.json()
    projects.map((project) => {
        // const res = fetch("/getAuthorizedProjectNames", project)
        // const projname = res.json()
        buttonslist.push(<button type="button" onClick={(e) => props.onPageUpdate('new-user')} className="project-button">
            {project}
        </button>)
    })

    // const handlePage = (val) => {
    //     props.onPageUpdate('new-user') //change to vistors page
    // }


        

    return (
        <div className="login-container">
            <h1> Welcome {props.username} !</h1>
            <h2> Project List </h2>
            {buttonslist}
            {/*/!* <button type="button" onClick={(e) => handlePage("added to buttons")}className="project-button"> {projects[0]} </button>  *!/*/}
            {/*/!* <Buttons>1</Buttons> *!/*/}
            {/*/!* <ul>{projects}</ul> *!/*/}
            {/*{Buttons}*/}
        </div>
    );

};


// async function makeButtons(projects){
//     return(
//         <button
//             type="button"
//             onClick={(e) => handlePage("added to buttons")}className="redirect"> {project} Project1 </button>
//     );
// }


 {/* for projID in user["joinedProjects"]:
            Projects.append(get_project_info(projID, proj_collection))
             */}
    
// {/* <        div className={styles.splitScreen}>
//             <div className={styles.topPane}>{topPane}</div>
//             <div className={styles.bottomPane}>{bottomPane}</div>
//         </div> */}

  