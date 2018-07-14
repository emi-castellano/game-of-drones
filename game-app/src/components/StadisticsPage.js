import React, { Component } from 'react';
import NavMenu from './NavMenu';

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
                <NavMenu />
                <div className="card stadistics">
                    {this.state.results.length > 0 &&
                        <div>
                            <h2>Leaderboard</h2>
                            <ul className="list">
                                {this.state.results.map((item, index) =>
                                    <li key={index}>
                                        <div className="position">
                                            <span>{index + 1}</span>
                                        </div>
                                        <span className="player">{item._id.player}</span>
                                        <span>Wins: {item.count}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                    {this.state.results.length === 0 &&
                        <h2>No game results saved yet.</h2>
                    }
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

export default StadisticsPage;