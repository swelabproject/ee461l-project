import React, { useState } from "react"
import './stylesheet.css';

export const CreateProject = () => {
    const [projectname, setProjectName] = useState('')
    const [projectid, setProjectID] = useState('')
    const [validUser1, setValidUser1] = useState('')
    const [validUser2, setValidUser2] = useState('')
    const [description, setDescription] = useState('')
    //const[data,setData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("in submit function");
        const reqOptions = {
            method: 'POST', 
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({'projectname': projectname, 'projectid' : projectid, 'validusers' : {validUser1, validUser2}, 'description' : description})
        }
        try {
            fetch("/createProject", reqOptions).then(
                res => res.json()
            ).then((data) => {
                console.log(data)
                if (data.existing === "true") {
                        console.log("project id exists")
                        duplicate(e)
                } else {
                        console.log("no existing project found")
                        //props.onPageUpdate('user-home')
                }
            })
        }
        catch (e) {
            console.log(e)
        }    
    }

    const duplicate = (e) => {
        alert('User ID is aleady in use. Please choose a different ID.')
    }

    return (
        <div className="create-project-container">
            <form onSubmit={handleSubmit}>
                <h2>Create Project</h2>
                <label htmlFor="projectname">Project Name</label>
                <input value={projectname}
                       onChange={(e) => setProjectName(e.target.value)}
                       name ="projectname"
                       type ="projectname"
                       placeholder ="project name"
                       id ="projectname">
                </input>
                <label htmlFor="projectid">Project ID</label>
                <input value={projectid}
                       onChange={(e) => setProjectID(e.target.value)}
                       name ="projectid"
                       type ="text"
                       placeholder ="project id">
                </input>
                <label htmlFor="validuser">Valid Users</label>
                <input value={validUser1}
                       onChange={(e) => setValidUser1(e.target.value)}
                       name ="validuser"
                       type ="text"
                       placeholder ="valid user1">
                </input>
                <input value={validUser2}
                       onChange={(e) => setValidUser2(e.target.value)}
                       name ="validuser"
                       type ="text"
                       placeholder ="valid user2">
                </input>
                <label htmlFor="description">Project Description</label>
                <input value={description}
                       onChange={(e) => setDescription(e.target.value)}
                       name ="description"
                       type ="text"
                       placeholder ="...">
                </input>
                

                <button type="submit">Create</button>
            </form>

        </div>

    )
}