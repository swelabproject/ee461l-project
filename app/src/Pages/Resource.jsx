import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import logo from './logo.svg';
import './stylesheet.css';

// further in the project, these values will be taken from the MongoDB database, and updated accordingly
const projectId = "Project name";
const hw1_ava = 100;
const hw2_ava = 100;

function checkIn_hardware1(){
    fetch('/manageproject/in1/' + projectId + '&' + document.getElementById("input1").value + '&' + hw1_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          //increase in database
          hw1_ava = hw1_ava + text.qty;
          alert(text.qty + " hardware sets checked in by " + text.projectID + " in set 1.");
          alert("new availability = " + hw1_ava);
      });
}

function checkIn_hardware2(){
    fetch('/manageproject/in2/' + projectId + '&' + document.getElementById("input2").value + '&' + hw2_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          //increase in database
          hw2_ava = hw2_ava + text.qty;
          alert(text.qty + " hardware sets checked in by " + text.projectID + " in set 2.");
          alert("new availability = " + hw2_ava);
      });
}

function checkOut_hardware1(){
    fetch('/manageproject/out1/' + projectId + '&' + document.getElementById("input1").value + '&' + hw1_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          //decrease in database
          hw1_ava = hw1_ava - text.qty;
          alert(text.qty + " hardware sets checked out by " + text.projectID + " in set 1.");
          alert("new availability = " + hw1_ava);
      });
}

function checkOut_hardware2(){
    fetch('/manageproject/out2/' + projectId + '&' + document.getElementById("input2").value + '&' + hw2_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          //decrease in database
          hw2_ava = hw2_ava - text.qty;
          alert(text.qty + " hardware sets checked out by " + text.projectID + " in set 2.");
          alert("new availability = " + hw2_ava);
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
      </div>
    );
  }
}

function App() {
  return (
    <div className="login-container">
      <h1> Manage project </h1>
      <Project name={projectId} av1={hw1_ava} av2={hw2_ava}/>
      <p/>
    </div>
  );
}

export default App;
