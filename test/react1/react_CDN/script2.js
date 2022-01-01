class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      'h1',
      this.props,
      `Welcome to ${this.props.frameworkname},

    ${this.props.message}`
    );
  }
}

ReactDOM.render(
  React.createElement(
    'div',
    null,
    React.createElement(HelloWorld, { id: 'react', frameworkname: 'React.js', message: 'React is awesome!' }),
    React.createElement(HelloWorld, { id: 'vue', frameworkname: 'Vue.js', message: 'Vue JS is nice.'}),
    React.createElement(HelloWorld, { id: 'angular', frameworkname: 'angular', message: 'Angular is angular :P'})
  ),
  document.getElementById('content')
)