import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class StadisticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    render() {
        return (
            <div className="content game-results">
                <div className="card stadistics">
                    {this.state.results.map((item, index) =>
                        <p key={index}>{item._id.winner + item.count}</p>
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/games-results')
            .then((res) => res.json())
            .then((data) => {
                this.setState({ results: data.results });
            });
    }
}

export default (withRouter(StadisticsPage));