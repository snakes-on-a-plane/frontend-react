import React from 'react';
import './Plane.css';
import superagent from 'superagent';

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
            const gameData = await superagent.get('https://nower-snakes.jb-tellez.now.sh/api')

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

        const url = `https://nower-snakes.jb-tellez.now.sh/api?direction=${direction}&x=${this.state.player_pos.x}&y=${this.state.player_pos.y}`
        
        const gameData = await superagent.get(url)

        this.setState(gameData.body);

    }

    render() {

        return (
            <div>
                <div className="Plane">
                    {this.getRows()}

                </div>
                <div>
                    <button onClick={() => this.move("west")}>Move West</button>
                    <button onClick={() => this.move("east")}>Move East</button>
                    <button onClick={() => this.move("north")}>Move North</button>
                    <button onClick={() => this.move("south")}>Move South</button>
                </div>
            </div>
        )
    }
}