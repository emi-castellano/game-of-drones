import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import NavMenu from '../NavMenu';
import SuggestionInput from '../containers/SuggestionInput';
import { updateMove } from '../../actions/MovesActions';
import NewMoveModal from '../containers/NewMoveModal';
import PropTypes from 'prop-types';

class ConfigPage extends Component {

    constructor(props) {
        super(props);
        const { moveState: { moves } } = props;

        this.state = {
            moves,
            results: [],
            showModal: false
        }
    }

    changeMove = (move, kill) => {
        this.props.updateMove(move, kill);
    }

    addNewMoveRow = () => {
        this.setState({ showModal: true });
    }

    renderModal = () => {
        if (this.state.showModal) {
            return <NewMoveModal closeModal={this.closeModal}/>
        }
    }
    
    closeModal = () => {
        this.setState({ showModal: false });
    }

    changeModalVisibility = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { moves } = this.state;
        return (
            <div className="content">
                <NavMenu />
                {this.renderModal()}
                <div className="card config">
                    <h3>Games rules configuration</h3>
                    <button className="add-move primary-btn" onClick={this.changeModalVisibility}>ADD MOVE</button>
                    <ul>
                        {moves.map((item, index) =>
                            <li key={index}>
                                <label>Move</label>
                                <input type="text" defaultValue={item.move} disabled />

                                <label>Kills</label>
                                <SuggestionInput selectSuggestion={this.changeMove} move={item.move} action={"update"} value={item.kills} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

ConfigPage.propTypes = {
    updateMove: PropTypes.func.isRequired,
    moveState: PropTypes.object.isRequired
};

const mapStateToProps = ({ moveState }) => ({ moveState });

export default connect(mapStateToProps, { updateMove })(withRouter(ConfigPage));