import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import logo from './logo.svg';
import './stylesheet.css';

// further in the project, these values will be taken from the MongoDB database, and updated accordingly
const projectId = "The project";
const joined = false;
const hw1_ava = 100;
const hw2_ava = 100;

function checkIn_hardware1(){
    fetch('/projects/in/' + projectId + '&' + document.getElementById("input1").value)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          alert(text.qty + " hardware sets checked in.");
          projectId = text.projectID;
          hw1_ava = hw1_ava + text.qty;
      });
}

function checkIn_hardware2(){
    fetch('/projects/in/' + projectId + '&' + document.getElementById("input2").value)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          alert(text.qty + " hardware sets checked in.");
          projectId = text.projectID;
          hw1_ava = hw1_ava + text.qty;
      });
}

function checkOut_hardware1(){
    fetch('/projects/out/' + projectId + '&' + document.getElementById("input1").value)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          alert(text.qty + " hardware sets checked out.");
          projectId = text.projectID;
          hw1_ava = hw1_ava - text.qty;
      });
}

function checkOut_hardware2(){
    fetch('/projects/out/' + projectId + '&' + document.getElementById("input2").value)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          alert(text.qty + " hardware sets checked out.");
          projectId = text.projectID;
          hw1_ava = hw1_ava - text.qty;
      });
}

function joinProject(id){
  fetch('/projects/join/' + projectId)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          alert("Joined " + text.projectID + ".");
          projectId = text.projectID;
          joined = true;
      });
}

function leaveProject(id){
  fetch('/projects/leave/' + projectId)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          alert("Left " + text.projectID + ".");
          projectId = text.projectID;
          joined = false;
      });
}

class CheckInButton extends React.Component {
  render(){
    if (this.props.set==1){
      return (<button onClick={() => checkIn_hardware1()}> Check in </button>);
    } else {
      return (<button onClick={() => checkIn_hardware2()}> Check in </button>);
    }
  }
}

class CheckOutButton extends React.Component {
  render(){
    if (this.props.set==1){
      return (<button onClick={() => checkOut_hardware1()}> Check out </button>);
    } else {
      return (<button onClick={() => checkOut_hardware2()}> Check out </button>);
    }
  }
}

class JoinLeaveButton extends React.Component {
  render(){
    if (this.props.joined==false) {
      return (
        <button onClick={() => joinProject("Project Alpha")}> JOIN PROJECT </button>
      );
    } else {
      return (
        <button onClick={() => leaveProject("Project Alpha")}> LEAVE PROJECT </button>
      );
    }
  }
}

class Project extends React.Component {
  render(){
    return (
      <div>
        <label> {this.props.name} </label>
        <p>
          HWSet1: {this.props.av1}/100
          <input id="input1" type="text" placeholder="Quantity"/>
          <CheckInButton set="1"/>
          <CheckOutButton set="1"/>
        </p>
        <p>
          HWSet2: {this.props.av2}/100
          <input id="input2" type="text" placeholder="Quantity"/>
          <CheckInButton set="2"/>
          <CheckOutButton set="2"/>
        </p>
        <JoinLeaveButton joined={this.props.joinstatus}/>
      </div>
    );
  }
}

function App() {
  return (
    <div className="login-container">
      <h1> My projects </h1>
      <Project name={projectId} joinstatus={joined} av1={hw1_ava} av2={hw2_ava}/>
      <p/>
    </div>
  );
}

export default App;
