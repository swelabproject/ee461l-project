import React from 'react';
import './stylesheet.css';

var projectID;
var hw1_ava;
var hw2_ava;

function checkIn_hardware1(){
    fetch('/manageproject/in1/' + projectID + '&' + document.getElementById("input1").value + '&' + hw1_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          hw1_ava = hw1_ava + text.qty;
          alert(text.qty + " hardware sets checked in by project " + projectID + " in set 1.");
          window.location.reload();
      });
}

function checkIn_hardware2(){
    fetch('/manageproject/in2/' + projectID + '&' + document.getElementById("input2").value + '&' + hw2_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          hw2_ava = hw2_ava + text.qty;
          alert(text.qty + " hardware sets checked in by project " + projectID + " in set 2.");
          window.location.reload();
      });
}

function checkOut_hardware1(){
    fetch('/manageproject/out1/' + projectID + '&' + document.getElementById("input1").value + '&' + hw1_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          hw1_ava = hw1_ava - text.qty;
          alert(text.qty + " hardware sets checked out by project " + projectID + " in set 1.");
          window.location.reload();
      });
}

function checkOut_hardware2(){
    fetch('/manageproject/out2/' + projectID + '&' + document.getElementById("input2").value + '&' + hw2_ava)
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          hw2_ava = hw2_ava - text.qty;
          alert(text.qty + " hardware sets checked out by project " + projectID + " in set 2.");
          window.location.reload();
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
        <p>
          <span id="set1"/>
          <input id="input1" type="text" placeholder="Quantity"/>
          <CheckInButton set="1"/>
          <CheckOutButton set="1"/>
        </p>
        <p>
          <span id="set2"/>
          <input id="input2" type="text" placeholder="Quantity"/>
          <CheckInButton set="2"/>
          <CheckOutButton set="2"/>
        </p>
      </div>
    );
  }
}

export const Project_Home = (props) => {
   fetch('/manageproject')
      .then(function (response) {
          return response.json();
      }).then(function (text) {
          hw1_ava = text.Ava1;
          document.getElementById('set1').innerHTML = 'HWSet1: ' + hw1_ava + '/100 ';
          hw2_ava = text.Ava2;
          document.getElementById('set2').innerHTML = 'HWSet2: ' + hw2_ava + '/100 ';
      });

   return (
    <div className="login-container">
      <h1> Manage project </h1>
      <label> Project ID: {projectID} </label>
      <Project av1={hw1_ava} av2={hw2_ava}/>
      <p/>
    </div>
  )
}

export default Project_Home;
