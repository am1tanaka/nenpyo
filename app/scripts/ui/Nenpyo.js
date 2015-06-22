'use strict';

/**
 * Nenpyo　年表用Reactファイル
 */

var React = require('react');
var NenpyoTBody = require('./NenpyoTBody'),
    Header = require("./Header"),
    InputField = require("./InputField"),
    ConfirmModal = require("./ConfirmModal"),
    TestData = require("../TestData");

// 年月日のパーツを出力

// 内容の出力。desc、source、タグをまとめて出力

var NenpyoColgroup = React.createClass({
  render : function()  {
    var num = (this.props.tags.length <= 1) ? "col-xs-10" :
      (this.props.tags.length == 2) ? "col-xs-5" : "col-xs-3";
    var cols = this.props.tags.map(function(data) {
      return <col className={num} key={"col"+data.key} />;
    });

    // タグが1列
    return (
      <colgroup>
        <col className="col-xs-1" />
        <col className="col-xs-1" />
        {cols}
      </colgroup>
    );
  }
});

var NenpyoAddTagButton = React.createClass({
  render : function() {
    return  <button
                id={"btnAddTag"}
                className="btn btn-default col-xs-1"
                type="button"
                data-toggle="tooltip"
                data-placement="bottom"
                title="列追加"
                onClick={this.props.onaddcol}
              >
              <span className="glyphicon glyphicon-plus" />
            </button>;
  }
});

/** 年表の見出しを出力する*/
var NenpyoTHead = React.createClass({
  render : function() {
    var cnt = 0;
    var num = this.props.tags.length;
    var onaddcol = this.props.onaddcol;
    var onrmvcol = this.props.onremovecol;
    var onchgtag = this.props.onchangetag;
    var onclrtag = this.props.oncleartag;
    var body = this.props.tags.map(function (data) {
      var addtag = "";
      var grid = "col-xs-12";
      var rmvtag = "";
      cnt++;
      if ((num < 3) && (cnt == num)) {
          addtag =<NenpyoAddTagButton onaddcol={onaddcol} />
          grid = "col-xs-10";
      }
      if (num > 1) {
        rmvtag = (
                  <button
                    className="btn btn-default"
                    type="button"
                    data-index={cnt-1}
                    onClick={onrmvcol} >
                    <span className="glyphicon glyphicon-remove" />
                  </button>
                    );
      }

      return (
        <th key={"th"+data.key}>
          <form>
            <span className={grid}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="タグ"
                  className="form-control"
                  value={data.tag}
                  data-index={cnt-1}
                  key={"text"+data.key}
                  onChange={onchgtag}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={onclrtag}
                    data-index={cnt-1}>
                    <span className="glyphicon glyphicon-remove-circle" />
                  </button>
                  {rmvtag}
                </span>
              </div>
            </span>
            {addtag}
          </form>
        </th>
      );
    });

    return (
          <thead>
            <tr><th className="text-center text-nowrap">西暦 (和暦)</th>
              <th className="text-center text-nowrap">月日</th>
                {body}
            </tr>
          </thead>);
  }
});



/**
 * 年表ブロックを作成する。
 * tag stateの要素がない場合は、すべてのデータを出力。
 * 1つ要素がある場合は、1列でそのタグに対応するデータのみを出力
 * 2つ以上の場合は、列をその分増やして、列ごとにデータを出力
 * @returns {HTML} 作成した年表ブロックのReactタグ
 */
var Nenpyo = React.createClass({
  getInitialState: function() {
    return {
      // 現在選択されているタグのリスト。最大3つ
      tags: [{tag:"",key:new Date().getTime()}],
      // 現在のシーンのデータ
      nowScene: {},
      // 次に切り替えたいシーンデータ
      nextScene: {},
      // 権限
      permission : "none",
      // 年表入力フォームの表示
      dispInput : true,
      // 年表データ
      nenpyo: TestData,
      // 確認ウィンドウ用クラス
      // disp:表示の有無
      // title：タイトル
      // body：本文
      // btnYes:進めるボタンに表示する文字列
      // handleYes:進める処理
      // btnNo:閉じるボタンに表示する文字列。省略するとCancelと表示
      confirmModal: {disp: false}
    };
  },
  handleAddCol : function(e) {
    if (this.state.tags.length < 3) {
      var newtags = this.state.tags.concat({tag:"",key: new Date().getTime()});
      this.setState({tags : newtags});
    }
  },
  handleRemoveCol : function(e) {
    var newtags = this.state.tags;
    newtags.splice(e.target.getAttribute("data-index"),1);
    this.setState({tags : newtags});
  },
  handleChangeTag : function(e) {
    var newtags = this.state.tags;
    newtags[e.target.getAttribute("data-index")].tag = e.target.value;
    this.setState({tags : newtags});
  },
  handleClearTag : function(e) {
    var newtags = this.state.tags;
    newtags[e.target.getAttribute("data-index")].tag = "";
    this.setState({tags : newtags});
  },
  doSignIn: function() {
    // TODO: サインイン処理
    this.setState({permission: "user"});
  },
  handleSignOut : function() {
    // TODO: サインアウト処理
    this.setState({permission: "none"});
  },
  handleOpenInput: function() {
    this.setState({dispInput: true});
  },
  handleCloseInput: function() {
    this.setState({dispInput: false});
  },
  handleCloseConfirmModal: function()
  {
    this.setState({confirmModal: {disp: false}});
  },
  // 年表データを登録する
  entryNenpyo: function() {
    // データを登録する

    // 不要なデータを削除する
    this.setState({

    });

    // モーダルを閉じる
    this.handleCloseConfirmModal();
  },
  // 入力画面で入力ボタンを押したので、確認ウィンドウを出力する
  handleInput: function() {
    var entryNenpyo = this.entryNenpyo;

    this.setState({
      confirmModal:{
        disp: true,
        title: "以下の通り、登録しますか？",
        body: <p>データリスト</p>,
        btnYes: "登録",
        btnNo: "Cancel",
        handleYes: entryNenpyo
      }
    });
  },
  render: function() {

    return (
      <div>
        <ConfirmModal data={this.state.confirmModal} handleClose={this.handleCloseConfirmModal} />
        <Header
          permission={this.state.permission}
          doSignIn={this.doSignIn}
          handleSignOut={this.handleSignOut}
          handleOpenInput={this.handleOpenInput} />
        <InputField
          dispInput={this.state.dispInput}
          handleCloseInput={this.handleCloseInput}
          handleInput={this.handleInput}
        />
        <table className="table table-striped table-bordered">
          <NenpyoColgroup tags={this.state.tags} />
          <NenpyoTHead
            tags={this.state.tags}
            onaddcol={this.handleAddCol}
            onremovecol={this.handleRemoveCol}
            onchangetag={this.handleChangeTag}
            oncleartag={this.handleClearTag}
            />
          <NenpyoTBody data={this.state.nenpyo.data} tags={this.state.tags} />
        </table>
      </div>
    );
  }
});

module.exports = Nenpyo;

