import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { scoreUp, setWinner } from '../actions/GameActions';
import MaterialIcon from 'material-icons-react';

class GamePlayPage extends Component {

  makeMove = () => {
    // Check if the selected move isn't the default one
    if (this.state.selectedMove !== 'default') {
      let newCurrentTurn = this.state.currentTurn === 0 ? 1 : 0;
      let newCurrentRound = this.state.currentTurn === 1 ? this.state.currentRound + 1 : this.state.currentRound;

      // Check if is the second turn in order to get the round winner
      if (this.state.currentTurn === 1) {
        this.getRoundWinner();
      }

      this.setState({
        currentTurn: newCurrentTurn,
        currentRound: newCurrentRound,
        selectedMove: 'default'
      });
    }
  }

  getRoundWinner = () => {
    // Get player moves
    let player1Move = this.state.moves.find((move) => { return move.move === this.state.playerMoves[0] });
    let player2Move = this.state.moves.find((move) => { return move.move === this.state.playerMoves[1] });

    if (player1Move.kills === player2Move.move) {
      // Player 1 wins
      this.setState(
        {
          roundWinner: [...this.state.roundWinner, {
            round: this.state.currentRound,
            winner: this.state.players[0]
          }]
        }
      );
      this.props.scoreUp(this.state.players[0].name);
    } else if (player2Move.kills === player1Move.move) {
      // Player 2 wins
      this.setState(
        {
          roundWinner: [...this.state.roundWinner, {
            round: this.state.currentRound,
            winner: this.state.players[1]
          }]
        }
      );
      this.props.scoreUp(this.state.players[1].name)
    } else {
      // Tie
      this.setState(
        {
          roundWinner: [...this.state.roundWinner, {
            round: this.state.currentRound,
            winner: 'TIE'
          }]
        }
      );
    }
    // Clear player moves for the next round
    this.setState({ playerMoves: [] });
  }

  pickMove = (e) => {
    this.setState({
      playerMoves: [...this.state.playerMoves, e.target.value],
      selectedMove: e.target.value
    });
  }

  componentDidMount() {
    if (this.props.gameState.players.length === 0) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    const winner = this.props.gameState.players.find((player) => { return player.score === 3 })
    if (winner !== undefined) {
      this.props.setWinner(winner.name);
      this.props.history.push("/results")
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentRound: 1,
      currentTurn: 0,
      playerMoves: [],
      roundWinner: [],
      players: this.props.gameState.players,
      moves: [
        { move: "paper", kills: "rock" },
        { move: "rock", kills: "scissors" },
        { move: "scissors", kills: "paper" }
      ],
      selectedMove: 'default'
    }
  }

  render() {
    return (
      <div className="content gameplay">
        <div className="card round-content">
          <div className="center">
            <div className="plays">
              <h2>Round {this.state.currentRound}</h2>
              <h4>Player turn: {this.state.players.length > 0 ? <span>{this.state.players[this.state.currentTurn].name}</span> : ''}</h4>
              <select onChange={this.pickMove} value={this.state.selectedMove}>
                <option value="default">Select move</option>
                {this.state.moves.map((move) =>
                  <option key={move.move} value={move.move}>{move.move}</option>
                )}
              </select>
              <button className="primary-btn" onClick={this.makeMove}>OK</button>
            </div>
            <div className="results">
              <h3>Score</h3>
              <div className="score-list">
                <ul className="list">
                  {this.state.roundWinner.map((item) =>
                    <li key={item.round} className="animated fadeInRight">
                      <span className="tag round">Round {item.round}</span>
                      <MaterialIcon icon="keyboard_arrow_right" color='#000' />
                      <span className="tag winner">{item.winner === 'TIE' ? item.winner : 'Winner ' + item.winner.name}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameState: state.gameState
});

export default connect(mapStateToProps, { scoreUp, setWinner })(withRouter(GamePlayPage));