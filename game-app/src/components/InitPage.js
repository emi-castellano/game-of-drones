import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { addPlayers } from '../actions/GameActions';
import MaterialIcon from 'material-icons-react';
import ToastMessage from './ToastMessage';
import ConfigModal from './ConfigModal';

class InitPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player1: '',
            player2: '',
            error: '',
            errorMessageClass: ''
        };
    }

    handlePlayer1Change = (e) => {
        this.setState({ player1: e.target.value.toUpperCase() });
    }

    handlePlayer2Change = (e) => {
        this.setState({ player2: e.target.value.toUpperCase() });
    }

    startGame = () => {
        this.props.addPlayers([this.state.player1, this.state.player2]);
        if (this.validatePlayersName()) {
            this.props.history.push("/gameplay");
        }
    }

    validatePlayersName = () => {
        if (this.state.player1 === '' || this.state.player2 === '') {
            this.setState({ error: 'Any of the players name can be blank.', errorMessageClass: 'active' });
            return false;
        } else {
            if (this.state.player1 === this.state.player2) {
                this.setState({ error: 'Please, enter two differents names for each player.', errorMessageClass: 'active' });
                return false;
            } else {
                this.setState({ error: '', errorMessageClass: ''});
                return true;
            }
        }
    }

    render() {
        return (
            <div className="content init">
                <div className="card register-step">
                    <div className="form-box">
                        <h2>Welcome to Game of Drones</h2>
                        <span>Enter players name to start the game</span>
                        <div className="input-wrapper">
                            <label>Player 1</label>
                            <input type="text" name="player1-name" onChange={this.handlePlayer1Change} />
                        </div>
                        <div className="input-wrapper">
                            <label>Player 2</label>
                            <input type="text" name="player2-name" onChange={this.handlePlayer2Change} />
                        </div>
                        <button className="primary-btn" onClick={this.startGame}>
                            Start
                            <MaterialIcon icon="keyboard_arrow_right" color='#FFF' />
                        </button>
                    </div>
                    <ToastMessage class={this.state.errorMessageClass} message={this.state.error} />
                </div>
                <ConfigModal />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    gameState: state.gameState
});

export default connect(mapStateToProps, { addPlayers })(withRouter(InitPage));