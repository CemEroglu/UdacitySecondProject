import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionOverview from "./QuestionOverview";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class AllQuestion extends Component {
  state = {
    whichCategory:"unanswered",
    answeredQuesBtn: false,
    unansweredQuesBtn: true,
    pollView: true,
  };
  showAnswered = () => {
    

    this.setState(() => ({
      whichCategory:'answered',
      answeredQuesBtn: true,
      unansweredQuesBtn: false,
      pollView: false,
    }));
  };
  showUnanswered = () => {
    
    this.setState(() => ({
      whichCategory:"unanswered",
      answeredQuesBtn: false,
      unansweredQuesBtn: true,
      pollView: true,
    }));
  };

  render() {
    
    const {unanswered,answered} = this.props
    const {
      whichCategory,
      unansweredQuesBtn,
      answeredQuesBtn,
      pollView,
    } = this.state;

    const pass = whichCategory==='unanswered' ? unanswered : answered;
    
    return (
      <Container classname="my-3" fluid style={{width: "60%" }}>
        <Row style={{'marginTop':'50px'}} classname="mt-3">
          <Col>
            <Button
              variant="danger"
              size="lg"
              style={{ width: "50%" }}
              onClick={this.showUnanswered}
              disabled={unansweredQuesBtn}
            >
              Unanswered Questions
            </Button>
            <Button
              variant="info"
              size="lg"
              style={{ width: "50%" }}
              onClick={this.showAnswered}
              disabled={answeredQuesBtn}
            >
              Answered Questions
            </Button>
          </Col>
        </Row>
        <ul className="overview-ul">
          {pass.map((id) => (
            <li key={id} className="overview-li">
              <QuestionOverview
                id={id}
                pollView={pollView}
                toPollView={this.props.toPollView}
                toResultView={this.props.toResultView}
              />
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
function mapStateToProps({ users, questions, loggedUser }) {
  if (loggedUser) {
    const qid = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    const uid = Object.keys(users);
    const currentUser = Object.values(loggedUser).join("");
    const currentUserId = uid.filter((uid) =>{return (users[uid].name === currentUser)? users[uid].answers : ''})
    

    const answered = Object.keys(users[currentUserId].answers);

    const unanswered = qid.filter(id => !answered.includes(id))
    return {
      loggedUser,
      currentUserId,
      qid,
      answered,
      unanswered,
    };
  }
}

export default connect(mapStateToProps)(AllQuestion);
