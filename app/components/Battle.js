import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';


class PlayerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;

        this.setState(() => ({
                username: value
            }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
               <label className="header" htmlFor="username" />
               {this.props.label} 
               <input
                id="username"
                placeholder="github username"
                type="text"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange} 
               />
                <button
                    className="button"
                    type="submit"
                    disabled={!this.state.username}
                >
                    Submit
                </button>    
            </form>
        );
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => {
            const newState = {};
            newState[`${id}Name`] = username;
            newState[`${id}Image`] = `http://github.com/${username}.png?size=200`;
            return newState;
        });
    }

    handleReset(id) {
        this.setState(() => {
            const newState = {};
            newState[`${id}Name`] = '';
            newState[`${id}Image`] = null;
            return newState;
        });
    }
    render() {
        const match = this.props.match;
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImage = this.state.playerOneImage;
        const playerTwoImage = this.state.playerTwoImage;
        return (
            <div>
                <div className="row">
                {/*Render player one input if there is no Player One */}
                {!playerOneName && 
                    <PlayerInput 
                        id={'playerOne'}
                        label={'Player One'}
                        onSubmit={this.handleSubmit}
                    />
                }
                {/*Render player one image and username if image is available*/}
                {playerOneImage !== null && 
                    <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}
                    >
                        <button 
                            className="reset"
                            onClick={this.handleReset.bind(null, 'playerOne')}
                        >
                            Reset
                        </button>
                    </PlayerPreview>
                }
                {/*Render player two input if there is no Player Two */}
                 {!playerTwoName && 
                    <PlayerInput 
                        id={'playerTwo'}
                        label={'Player Two'}
                        onSubmit={this.handleSubmit}
                    />
                }
                {/*Render player two image and username if image is available*/}
                {playerTwoImage !== null && 
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}
                    >
                    <button 
                            className="reset"
                            onClick={this.handleReset.bind(null, 'playerTwo')}
                    >
                        Reset
                    </button>
                    </PlayerPreview>
                }
                </div>

                {playerOneImage && playerTwoImage &&
                <Link
                    className="button"
                    to={{
                        pathname: `${match.url}/results`,
                        search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                    }}
                >
                Battle
                </Link>}
            </div>
        );
    }
}

export default Battle;
