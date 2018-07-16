import React, { Component } from 'react';
import { connect } from 'react-redux';
import closeIcon from '../../assets/images/close-icon.svg';
import SuggestionInput from '../containers/SuggestionInput';
import { addMove } from '../../actions/MovesActions';
import PropTypes from 'prop-types';

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
        console.log(move);
        if (move !== undefined || kill === undefined) {
            this.setState({error: "Be sure to add a unexisting move."})
        } else {
            if (this.state.kill === this.state.move) {
                this.setState({error: "Can't add a move with the same values."})
            } else {
                this.props.addMove({ move: this.state.move, kills: this.state.kill });
                this.props.closeModal();
            }
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

NewMoveModal.propTypes = {
    moveState: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    addMove: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { addMove })((NewMoveModal));