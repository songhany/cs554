import React, {Component} from 'react';

class Clock extends Component {  // this component will be Clock, so it will have a state
  constructor(props) {  // set state
    super(props)
    this.state = {
      date: this.props.date,
      counter: 0
    };
  }

  componentDidMount() {  // this will function when component mount
    this.timerID = setInterval(() => this.tick(), 1000);  // set a timer to trigger this function every second
  }

  componentWillUnmount() {  // 
    clearInterval(this.timerID);
  }

  tick () {
    this.setState((state, props) => ({
      date: new Date(), 
      counter:state.counter + 1
    }));  // update state
  }

  render() {
    return (
      <div>
        <h2> It is: {this.state.date.toLocaleTimeString()} </h2>
        <h2>This tick function has fired: {this.state.counter} times </h2>
      </div>
    );
  }
}

export default Clock;