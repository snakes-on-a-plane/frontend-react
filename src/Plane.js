import React from 'react';
import './Plane.css';
import superagent from 'superagent';

const url = 'https://mediator-git-blocker-awareness.snakes-on-a-plane.now.sh/api';

export default class Plane extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            player_pos: {}
        }
    }

    async componentDidMount() {
        try {
            const gameData = await superagent.get(url)

            console.log(gameData.body);
            this.setState(gameData.body);

        } catch (e) {
            console.log(e);
        }
    }

    getRows() {
        return this.state.grid.map((row, rowIndex) => {
            return row.map((info, colIndex) => {
                let className = 'cell ' + info;
                let label = info;

                if (rowIndex === this.state.player_pos.y && colIndex === this.state.player_pos.x) {
                    className = 'cell player';
                    label = 'player';
                }

                let seat = <div className={className}>{label}</div>;

                return seat;
            });
        })
    }

    move = async (direction) => {

        const full_url = `${url}?direction=${direction}&x=${this.state.player_pos.x}&y=${this.state.player_pos.y}`
        
        const gameData = await superagent.get(full_url)

        this.setState(gameData.body);

    }

    render() {

        return (
            <div>
                <div className="Plane">
                    {this.getRows()}

                </div>
                <div>
                    <button onClick={() => this.move("left")}>Move Left</button>
                    <button onClick={() => this.move("right")}>Move Right</button>
                    <button onClick={() => this.move("up")}>Move Up</button>
                    <button onClick={() => this.move("down")}>Move Down</button>
                </div>
            </div>
        )
    }
}