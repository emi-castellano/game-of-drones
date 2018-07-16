import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { resetGame } from '../../actions/GameActions';
import audio from '../../assets/sounds/winner.mp3';
import PropTypes from 'prop-types';

class WinnerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            request: false
        }
        this.winnerSound = new Audio(audio);

        this.checkIfTheGameHasToRestart();
        this.saveGameResults();
    }

    render() {
        return (
            <div className="content winner">
                <div className="card final box">
                    <h1>We have a winner!</h1>
                    <h4>{this.props.gameState.players.length > 0 ? this.props.gameState.results.winnerPlayer.name : ''} is the new emperor!</h4>
                    <button onClick={this.props.resetGame} className="primary-btn" disabled={!this.state.request}>Play Again</button>
                </div>
            </div>
        );
    }

    saveGameResults() {
        if (this.props.gameState.players.length > 0) {
            fetch('http://localhost:8080/api/set-results', {
                method: 'POST',
                body: JSON.stringify({
                    winner: this.props.gameState.results.winnerPlayer.name,
                    loser: this.props.gameState.results.loserPlayer.name
                }),
                headers: { "Content-Type": "application/json" }
            }).then((res) => res.json())
                .then((data) => {
                    // If the response has RESULTS_ADDED is ok to continue
                    if (data.response === 'RESULTS_ADDED') {
                        this.setState({ request: true });
                    }
                });
        }
    }

    componentDidMount() {
        this.checkIfTheGameHasToRestart();
        this.winnerSound.play();
    }

    componentDidUpdate() {
        this.checkIfTheGameHasToRestart();
    }

    checkIfTheGameHasToRestart() {
        if (this.props.gameState.players.length === 0) {
            this.props.history.push("/");
        }
    }
}

const mapStateToProps = state => ({
    gameState: state.gameState
});

WinnerPage.propTypes = {
    gameState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    resetGame: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { resetGame })(withRouter(WinnerPage));