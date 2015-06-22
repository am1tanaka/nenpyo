/**
 * TMNM-Nenpyo　構築
 * 2015/5/19 YuTanaka(@am1tanaka)
 */
var React = window.React = require('react'),
    Timer = require("./ui/Timer"),
    Nenpyo = require("./ui/Nenpyo"),
    SignUp = require("./ui/SignUp"),
    SignIn = require("./ui/SignIn"),
    mountNode = document.getElementById("app"),
    nenpyoNode = document.getElementById("nenpyo"),
    signUpNode = document.getElementById("signup"),
    signInNode = document.getElementById("signin");


var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <Timer />
      </div>
    );
  }
});


React.render(<SignUp />,signUpNode);
React.render(<SignIn />,signInNode);
React.render(<Nenpyo />,nenpyoNode);
React.render(<TodoApp />, mountNode);

