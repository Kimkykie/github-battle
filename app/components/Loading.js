import React from 'react';
import Proptypes from 'prop-types';

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
};

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    componentDidMount() {
        const stopper = `${this.state.text}...`;
        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState(() => ({
                        text: this.props.text
                    }));
            } else {
                this.setState((prevState) => ({
                        text: `${prevState.text}.`
                    }));
            }
        }, this.props.speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <p style={styles.content}>
            {this.state.text}
            </p>
        );
    }
}

Loading.propTypes = {
    text: Proptypes.string.isRequired,
    speed: Proptypes.number.isRequired
};

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
};
export default Loading;
