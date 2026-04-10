import React from 'react';

class CreateRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [Number(this.props.firstValue)]
        };
    }

    addNext = () => {
        this.setState((state) => {
            const { numbers } = state;
            const last = numbers[numbers.length - 1];
            const next = last + Number(this.props.step);

            return {
                numbers: [...numbers, next]
            };
        });
    };

    render() {
        return (
            <p>
                {this.state.numbers.join(' ')}
                <span
                    onClick={this.addNext}
                    style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}
                >
                  ...
                </span>
            </p>
        );
    }
}

export default CreateRange;
