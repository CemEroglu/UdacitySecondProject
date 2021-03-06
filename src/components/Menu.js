import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logOut } from "../actions/loggedUser";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const Menu = (props) => {
  const handleLogout = () => {
    props.dispatch(logOut());

    props.history.push("/login");
  };
  const { pic, name } = props;
  return (
    <Navbar style={{ background: 'rgb(0,162,232)' }} classname="my-3">
      <h2 className="text-white">WOULD YOU RATHER</h2>
      <Nav className="mr-auto nav-link">
        <Link to="/home" className="nav-link text-white" >Home</Link>
        <Link to="/add" className="nav-link text-white" >Add Question</Link>
        <Link to="/leaderboard" className="nav-link text-white" >Leaderboard</Link>
      </Nav>
      <Image
        src={pic}
        alt="profile pic"
        roundedCircle
        style={{ height: "50px", marginRight: '20px' }}
      />
      <span style={{ color: "white", marginRight: '20px' }}>{name}</span>
      <Button className="text-white"
        variant="outline-info"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </Navbar>
  );
};

function mapStateToProps({ users, loggedUser }) {
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join("");
  const currentUserId = uid.filter((uid) => { return (users[uid].name === currentUser) ? users[uid].answers : '' })
  if (loggedUser) {
    const name = users[currentUserId].name;
    const pic = users[currentUserId].avatarURL;

    return {
      pic,
      name,
    };
  }
}

export default withRouter(connect(mapStateToProps)(Menu));
