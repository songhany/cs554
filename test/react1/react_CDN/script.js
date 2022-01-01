let h1 = React.createElement('h1', null, 'Hello world!');  // create h1 element
let p = React.createElement('p', null, "I'm a P tag");

class HelloWorld extends React.Component {
  render() {
    return React.createElement('div', null, h1, p);  // 'div' lement have two children element 'h1' and 'p'
  }
}

// create an instance of HelloWorld element. 'null' means there is no data. Render it to 'content'
ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('content'));