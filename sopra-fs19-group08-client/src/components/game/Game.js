import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { withRouter } from "react-router-dom";
import gameboard from "../../views/images/boardonly_2.png";
import Field from "./Field";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  margin-top: 5px;
`;


const Fields = (props) => {
  return(<FieldsContainer>
            <Field id={11} /><Field id={12} /><Field id={13} /><Field id={14} /><Field id={15} />
            <Field id={21} /><Field id={22} /><Field id={23} /><Field id={24} /><Field id={25} />
            <Field id={31} /><Field id={32} /><Field id={33} /><Field id={34} /><Field id={35} />
            <Field id={41} /><Field id={42} /><Field id={43} /><Field id={44} /><Field id={45} />
            <Field id={51} /><Field id={52} /><Field id={53} /><Field id={54} /><Field id={55} />
      </FieldsContainer>
      );
};

const FieldsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: inline-block;
  text-align: left;
  padding-top: 9%;
  padding-left: 8%;
`;


const GameContainer = styled.div`
  align-items: center;
  float: left;
  display: inline-block;
  height: 100vh;
`;

const LeftSideContainer = styled.div`
  border: 3px azure solid;
  height: 100%;
  width: 30%;
  float: left;
`;

const CenterContainer = styled.div`
  border: 3px rosybrown solid;
  float: left;
  height: 100%;
  width: 40%;
`;

const RightSideContainer = styled.div`
  border: 3px greenyellow solid;
  float: left;
  width: 30%;
  height: 100%;
`;

const TurnContainer = styled.div`
  background-color: rgba(188,225,255,0.3);
  border: 3px solid;
  border-radius: 10px;
  height: 10%;
  padding-top: 3%;
  margin-bottom: 5px;
  font-size: 18px;
  text-align: center;
  
  button {
    float: right;
    margin-right: 3%;
    };
`;


const GameBoardContainer = styled.div`
  background-image: url(${gameboard});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 80%;
  width: 100%;
  padding: 0px;
  //height: 876px;
  //width: 812px;
  border: 3px blue solid;
  text-align: center;
    
`;


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        player1workers: null,
        player2workers: null,
        gameboard: null,
        turn: "player1"
    };
  }


  componentWillMount() {

      // fetch game board from backend
      fetch(`${getDomain()}/gameboard/1`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
          .then(response => {
              if (response.status === 200){
                  response.json().then(json => this.setState({gameboard: json}))
              } else if (response.status === 404) {
                  response.json().then(json => alert(json.status + "\n" + json.message + "\n" + json.path))
              } else {
                  throw Error(response.statusText);
              }


          })


          .catch(err => {
              if (err.message.match(/Failed to fetch/)) {
                  alert("The server cannot be reached. Did you start it?");
              } else {
                  alert(`Something went wrong during fetching the game board from server: ${err.message}`);
              }
          });

  }


    componentDidMount() {

      // analyze the content of gameboard and update fields


  }

  render() {
    return (
      <GameContainer>

          <LeftSideContainer>

          </LeftSideContainer>




          <CenterContainer>

          <TurnContainer>
                It's {this.state.gameboard ? JSON.parse(this.state.gameboard.players[0].username).Username : 'nobody'}'s turn.
              <button>End Turn</button>
          </TurnContainer>




        <GameBoardContainer>
            <Fields/>
        </GameBoardContainer>

          </CenterContainer>


          <RightSideContainer>

          </RightSideContainer>
        
      </GameContainer>
    );
  }
}

export default withRouter(Game);
