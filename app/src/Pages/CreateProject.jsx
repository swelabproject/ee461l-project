import React, { useState } from "react"
import './stylesheet.css';

export const CreateProject = (props) => {

    const handleSubmit = (e) => {}
    return (
        <div className="create-project-container">
            <h1> Create Project</h1>
            <form>
                <input name ="projectname"
                       type ="text"
                       placeholder ="project name">
                </input>
                <input name ="validuser"
                       type ="text"
                       placeholder ="valid user">
                </input>

                <button type="submit">Submit</button>
            </form>

            <script>
                const form El = document.querySelector('.form');

                formEl.addEventListner('submit', () => {});
            </script>

        </div>

    )
}