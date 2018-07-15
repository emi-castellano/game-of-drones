import React, { Component } from 'react';
import { connect } from 'react-redux';
import closeIcon from '../assets/images/close-icon.svg';
import SuggestionInput from './SuggestionInput';
import { addMove } from '../actions/MovesActions';

class NewMoveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            move: '',
            kill: '',
            error: ''
        }
    }

    changeKill = (kill) => {
        this.setState({ kill: kill });
    }

    changeMoveName = (e) => {
        this.setState({ move: e.target.value });
    }

    addNewMove = () => {
        // Check if the move already exists
        let move = this.props.moveState.moves.find((move) => { return move.move === this.state.move });
        // Check if the kill is a existing move
        let kill = this.props.moveState.moves.find((move) => { return move.kills === this.state.kill });

        if (move !== undefined) {
            this.setState({error: "Can't add an already saved move."})
        }
        if (kill === undefined) {
            this.setState({error: "Kill value must be an existing move."})
        }

        if (this.state.kill === this.state.move) {
            this.setState({error: "Can't add a move with the same values."})
        }
        
        if (this.state.error === '') {
            this.props.addMove({ move: this.state.move, kills: this.state.kill });
            this.props.closeModal();
        }
    }

    render() {
        return (
            <div className="card config modal">
                <h3>Add new move</h3>
                <img src={closeIcon} alt="Close icon" onClick={this.props.closeModal} />
                <div className="item">
                    <label>Move</label>
                    <input type="text" onChange={this.changeMoveName} />
                </div>
                <div className="item">
                    <label>Kills</label>
                    <SuggestionInput selectSuggestion={this.changeKill} action={"add"} />
                </div>
                <span className="error">{this.state.error}</span>
                <div className="btn-wrapper">
                    <button className="primary-btn" onClick={this.addNewMove}>ADD</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ moveState }) => ({ moveState });

export default connect(mapStateToProps, { addMove })((NewMoveModal));