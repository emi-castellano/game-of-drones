import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavMenu from './NavMenu';
import SuggestionInput from './SuggestionInput';
import { addMove } from '../actions/MovesActions';

class NewMoveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            move: '',
            kill: ''
        }
    }

    changeKill = (kill) => {
        this.setState({ kill: kill.target.value });
    }

    changeMoveName = (e) => {
        this.setState({ move: e.target.value });
    }

    addNewMove = () => {
        this.props.addMove({ move: this.state.move, kills: this.state.kill});
    }

    render() {
        return (
            <div className="content">
                <div className="card config modal">
                    <h3>Add new move</h3>
                    <div className="item">
                        <label>Move</label>
                        <input type="text" onChange={this.changeMoveName}/>
                    </div>
                    <div className="item">
                        <label>Kills</label>
                        <SuggestionInput selectSuggestion={this.changeMove} action={'update'} changeKill={this.changeKill} />
                    </div>
                    <button onClick={this.addNewMove}>ADD</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ moveState }) => ({ moveState });

export default connect(mapStateToProps, { addMove })((NewMoveModal));