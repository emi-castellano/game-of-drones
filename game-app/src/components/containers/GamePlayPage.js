import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { scoreUp, setGameResults } from '../../actions/GameActions';
import PropTypes from 'prop-types';

class GamePlayPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentRound: 1,
      currentTurn: 0,
      playerMoves: [],
      roundWinner: [],
      moves: this.props.moveState.moves,
      selectedMove: 'default'
    }
  }

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
    let player1Move = this.props.moveState.moves.find((move) => { return move.move === this.state.playerMoves[0] });
    let player2Move = this.props.moveState.moves.find((move) => { return move.move === this.state.playerMoves[1] });

    if (player1Move.kills === player2Move.move) {
      // Player 1 wins
      this.setState(
        {
          roundWinner: [...this.state.roundWinner, {
            round: this.state.currentRound,
            winner: this.props.gameState.players[0]
          }]
        }
      );
      this.props.scoreUp(this.props.gameState.players[0].name);
    } else if (player2Move.kills === player1Move.move) {
      // Player 2 wins
      this.setState(
        {
          roundWinner: [...this.state.roundWinner, {
            round: this.state.currentRound,
            winner: this.props.gameState.players[1]
          }]
        }
      );
      this.props.scoreUp(this.props.gameState.players[1].name)
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
    const loser = this.props.gameState.players.find((player) => { return player.score < 3 })
    if (winner !== undefined) {
      this.props.setGameResults({winnerPlayer: winner, loserPlayer: loser});
      this.props.history.push("/results")
    }
  }

  render() {
    return (
      <div className="content gameplay">
        <div className="card round-content">
          <div className="center">
            <div className="plays">
              <h2>Round {this.state.currentRound}</h2>
              <h4>Player turn: <span>{this.props.gameState.players[this.state.currentTurn].name}</span></h4>
              <select onChange={this.pickMove} value={this.state.selectedMove}>
                <option value="default">Select move</option>
                {this.props.moveState.moves.map((move) =>
                  <option key={move.move} value={move.move}>{move.move}</option>
                )}
              </select>
              <button className="primary-btn" onClick={this.makeMove}>OK</button>
            </div>
            <div className="results">
              <h3>Score</h3>
              <div className="score-list">
                <ul className="list">
                  <li>
                    <div className="item">
                      <span>Round</span>
                    </div>
                    <div className="item">
                      <span>Winner</span>
                    </div>
                  </li>
                  {this.state.roundWinner.map((item) =>
                    <li key={item.round} className="animated fadeInRight">
                      <div className="item">
                        <span className="tag round">{item.round}</span>
                      </div>
                      <div className="item">
                        <span className="tag winner">{item.winner === 'TIE' ? item.winner : item.winner.name}</span>
                      </div>                      
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

const mapStateToProps = ({ gameState, moveState }) => ({ gameState, moveState });

GamePlayPage.propTypes = {
  setGameResults: PropTypes.func.isRequired,
  scoreUp: PropTypes.func.isRequired,
  gameState: PropTypes.object.isRequired,
  moveState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { scoreUp, setGameResults })(withRouter(GamePlayPage));