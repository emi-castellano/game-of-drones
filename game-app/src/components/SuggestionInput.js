import React, { Component } from 'react';
import { connect } from 'react-redux';

class SuggestionInput extends Component {

    constructor(props) {
        super(props);
        const { moveState: { moves } } = props;

        this.state = {
            moves,
            results: [],
            selectedValue: props.value
        }
    }

    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    searchMove = (e) => {
        const { moves } = this.state;
        const escapedValue = this.escapeRegexCharacters(e.target.value.trim());
        let results;
        if (escapedValue === '') {
            results = []
        } else {
            const regex = new RegExp('^' + escapedValue, 'i');
            results = moves.filter(({ move }) => move != this.props.move && regex.test(move));
        }
        this.setState({ results, selectedValue: e.target.value });
    }

    selectSuggestion = (move, kill) => {
        this.setState({ results: [], selectedValue: kill });
        this.props.selectSuggestion(move, kill);
    }

    render() {
        return (
            <div className="suggest-input">
                <input type="text" className="no-margin" onChange={this.props.action === 'add' ? this.searchMove : this.props.changeKill} value={this.state.selectedValue} />
                {this.state.results.length > 0 &&
                    <ul className="suggestions">
                        {this.state.results.map((item, index) =>
                            <li key={index} onClick={(e) => this.selectSuggestion(this.props.move, item.move)}>{item.move}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ moveState }) => ({ moveState });

export default connect(mapStateToProps, null)(SuggestionInput);