/**
 * TMNM-Nenpyo　構築
 * 2015/5/19 YuTanaka(@am1tanaka)
 */
var React = window.React = require('react'),
    Timer = require("./ui/Timer"),
    Header = require("./ui/Header"),
    Nenpyo = require("./ui/Nenpyo"),
    InputField = require("./ui/InputField"),
    SignUp = require("./ui/SignUp"),
    SignIn = require("./ui/SignIn"),
    mountNode = document.getElementById("app"),
    headerNode = document.getElementById("header"),
    nenpyoNode = document.getElementById("nenpyo"),
    inputFieldNode = document.getElementById("inputfield"),
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

var nenpyodata= [
    {
      "year":1868,
      "month":1,
      "day":1,
      "desc":"明治以前元日"
    },
    {
      "year":1868,
      "month":9,
      "day":7,
      "desc":"明治前日"
    },
    {
      "year":1868,
      "month":9,
      "day":8,
      "desc":"明治初日"
    },
    {
      "year":1868,
      "month":12,
      "day":31,
      "desc":"明治大晦日"
    },

    {
      "year":1912,
      "month":1,
      "day":1,
      "desc":"大正以前元日"
    },
    {
      "year":1912,
      "month":7,
      "day":29,
      "desc":"大正前日"
    },
    {
      "year":1912,
      "month":7,
      "day":30,
      "desc":"大正初日"
    },
    {
      "year":1912,
      "month":12,
      "day":31,
      "desc":"大正大晦日"
    },

    {
      "year":1926,
      "month":1,
      "day":1,
      "desc":"昭和以前元日"
    },
    {
      "year":1926,
      "month":12,
      "day":24,
      "desc":"昭和前日"
    },
    {
      "year":1926,
      "month":12,
      "day":25,
      "desc":"昭和初日"
    },
    {
      "year":1926,
      "month":12,
      "day":31,
      "desc":"昭和大晦日"
    },

    {
      "year":1989,
      "month":1,
      "day":1,
      "desc":"平成以前元日"
    },
    {
      "year":1989,
      "month":1,
      "day":7,
      "desc":"平成前日"
    },
    {
      "year":1989,
      "month":1,
      "day":8,
      "desc":"平成初日"
    },
    {
      "year":1989,
      "month":12,
      "day":31,
      "desc":"平成大晦日",
      "source":{"link":"http://am1.jp/"}
    },


  {
      "year":1959,
      "month":11,
      "day":3,
      "desc":"テスト文言1",
      "source":{"desc":"ソーステスト1","link":"http://am1.jp/"},
      "tag": ["多摩NT"]
    },
    {
      "year":1960,
      "month":12,
      "desc":"1960年12月テスト",
      "source":{desc:"ソーステスト2",link:"http://am1.jp/"},
      "tag": ["多摩NT"],
    },
    {
      "year":1961,
      "desc":"1961年テスト。略が多いデータ",
      "tag": ["多摩NT","東京"],
    },
    {
      "year":1961,
      "month":2,
      "day":24,
      "desc": "2月24日テスト",
      "source":{desc:"ソーステスト3",link:"http://am1.jp/"},
      "tag": ["多摩NT"],
    },
    {
      "year":1961,
      "month":2,
      "day":24,
      "desc":"同日テスト",
      "source":{desc:"ソーステスト4。リンクなし"},
      "tag": ["多摩NT","東京"],
    },
    {
      "year":1962,
      "month":12,
      "day":31,
      "desc":"大晦日",
      "source":{desc:"ソーステスト5",link:"http://am1.jp/"},
      "tag": ["多摩NT"],
    }
  ];

React.render(<Header />,headerNode);
React.render(<InputField />,inputFieldNode);
React.render(<SignUp />,signUpNode);
React.render(<SignIn />,signInNode);
React.render(<Nenpyo data={nenpyodata} />,nenpyoNode);
React.render(<TodoApp />, mountNode);

