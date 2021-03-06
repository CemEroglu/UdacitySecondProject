import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

class Leaderboard extends Component {
  render() {
    const { names, pics, noOfAnswers, noOfQuestions, sum } = this.props;
    const userData = names.map((name, i) => {
      return {
        name: name,
        pic: pics[i],
        noOfAnswer: noOfAnswers[i],
        noOfQuestion: noOfQuestions[i],
        sum: sum[i],
      };
    });


    userData.sort((a, b) => {
      return b.sum - a.sum;
    });


    return (
      <div>
        {userData.map((userData) => (
          <Row key={userData.name}>
            <div className="leaderboard-info">
              <Col className="leaderboard-card">
                <h3 className="leaderboard-name">{userData.name}</h3>
                <div className="leaderboard-img-div">
                  <Image
                    src={userData.pic}
                    alt="profile pic"
                    className="leaderboard-img"
                    roundedCircle
                  />
                </div>
              </Col>
              <Col>
                <p className="leaderboard-text">
                  Total Number Of Question Created :{userData.noOfQuestion}{" "}
                </p>
                <p className="leaderboard-text">
                  Total Number Of Answers :{userData.noOfAnswer}{" "}
                </p>
              </Col>
              <Col>
                <span className="leaderboard-score">SCORE :{userData.sum}</span>
              </Col>
            </div>
          </Row>
        ))}
      </div>
    );
  }
}
function mapStateToProp({ users, questions }) {
  const uid = Object.keys(users);
  const pics = uid.map((uid) => users[uid].avatarURL);
  const names = uid.map((uid) => users[uid].name);
  const noOfAnswers = uid.map((uid) => Object.keys(users[uid].answers).length);
  const noOfQuestions = uid.map((uid) => users[uid].questions.length);
  const sum = noOfAnswers.map((ans, i) => ans + noOfQuestions[i]);

  uid.forEach((uid) => {});
  return {
    uid,
    pics,
    names,
    noOfAnswers,
    noOfQuestions,
    sum,
  };
}
export default connect(mapStateToProp)(Leaderboard);
