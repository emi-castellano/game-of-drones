import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import MaterialIcon from 'material-icons-react';

class ConfigModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moves: [
                { move: "paper", kills: "rock" },
                { move: "rock", kills: "scissors" },
                { move: "scissors", kills: "paper" }
            ]
        };
    }

    render() {
        return (
            <div className="modal">
                <h3>Games rules configuration</h3>
                <ul>
                    {this.state.moves.map((item, index) =>
                        <li key={index}>
                            <label>Move</label>
                            <input type="text" defaultValue={item.move} />
                            <label>Kills</label>
                            <input type="text" defaultValue={item.kills} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    gameState: state.gameState
});

export default connect(mapStateToProps, {})(withRouter(ConfigModal));