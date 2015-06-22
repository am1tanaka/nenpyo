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


/** @jsx React.DOM */

var App = React.createClass({
    render: function () {
        return <div>
<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>

<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    }
});


React.render(<App/>, document.body);


/*
React.render(<SignUp />,signUpNode);
React.render(<SignIn />,signInNode);
React.render(<Nenpyo />,nenpyoNode);
React.render(<TodoApp />, mountNode);
*/
