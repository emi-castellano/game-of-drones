import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { resetGame } from '../actions/GameActions';
import audio from '../assets/sounds/winner.mp3';

class WinnerPage extends Component {

    constructor(props) {
        super(props);
        this.winnerSound = new Audio(audio);
    }

    render() {
        return (
            <div className="content winner">
                <div className="card final box">
                    <h1>We have a winner!</h1>
                    <h4>{this.props.gameState.winner} is the new emperor!</h4>
                    <button onClick={this.props.resetGame} className="primary-btn">Play Again</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.checkIfTheGameHasToRestart();
        this.winnerSound.play();
    }

    componentDidUpdate() {
        this.checkIfTheGameHasToRestart();
    }

    checkIfTheGameHasToRestart() {
        if (this.props.gameState.winner === '') {
            this.props.history.push("/");
        }
    }
}

const mapStateToProps = state => ({
    gameState: state.gameState
});

export default connect(mapStateToProps, { resetGame })(withRouter(WinnerPage));