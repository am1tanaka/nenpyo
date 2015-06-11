'use strict';

/**
 * SignUp　ユーザー登録ブロック用Reactファイル
 */

var React = require('react');

/**
 * ヘッダコンテナ
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var SignUp = React.createClass({
  /**
   * ステータスの準備
   * @returns {Object} 状態
   */
  getInitialState: function() {
    return {enabled: true};
  },
  /** 有効、無効を切り替える
   * @param bool flag
  */
  setEnabled : function(flag) {
    this.state.enabled = !!flag;
  },
  render: function() {
    if (!this.state.enabled)
    {
      return <div></div>;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
          ユーザー登録&nbsp;&nbsp;
          <button id="btnCloseInputField" className="btn btn-default"
            title="閉じる" data-placement="bottom" data-toggle="tooltip"
            type="button">
              <span className="glyphicon glyphicon-remove" />閉じる
          </button>
          </div>
        </div>
        <div className="panel-body">
          <form className="form-horizontal">
            <div className="form-group">
              <label for="inputEMail"
                className="col-sm-2 control-label text-right text-nowrap">
                メールアドレス
              </label>
              <div className="col-sm-10 form-inline">
                <input type="text" className="form-control" placeholder="メールアドレス" size="64" maxsize="64" />
              </div>
            </div>

            <div className="form-group">
              <label for="inputNum"
                className="col-sm-2 control-label text-right text-nowrap">
                学会番号(省略可)
              </label>
              <div className="col-sm-10 form-inline">
                <input type="text" className="form-control" placeholder="学会番号(省略可)" size="4" maxsize="4" />
                  <div className="small">(省略可)</div>
              </div>
            </div>

            <div className="form-group">
              <label for="textName"
                className="col-sm-2 control-label text-right text-nowrap">
                ユーザー名
              </label>
              <div className="col-sm-10">
                <input type="text" id="textName" className="form-control" size="16" maxsize="16" placeholder="ユーザー名" />
                  <div className="small">(16文字まで)</div>
              </div>
            </div>

            <div className="form-group">
              <label for="textPass"
                className="col-sm-2 control-label text-right">
                パスワード
              </label>
              <div className="col-sm-10">
                <input type="password" id="textPass" className="form-control" placeholder="パスワード(8文字以上で、アルファベットと数字を利用したもの)" />
                  <div className="small">(8文字以上で、アルファベットと数字を利用したもの)</div>
              </div>
            </div>

            <div className="form-group">
              <label for="textPassCheck"
                className="col-sm-2 control-label text-right text-nowrap">
                パスワードを再入力
              </label>
              <div className="col-sm-10">
                <input type="password" id="textPassCheck" className="form-control" placeholder="パスワードを再入力" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-1 col-sm-11">
                <div className="col-sm-3">
                  <button type="submit" id="btnEntry" className="btn btn-primary form-control"
                    title="ユーザー登録" data-placement="bottom" data-toggle="tooltip">
                    <span className="glyphicon glyphicon-plus" />ユーザー登録
                  </button>
                </div>
                <div className="col-sm-3">
                  <button id="btnCloseInputField" className="btn btn-default form-control"
                    title="閉じる" data-placement="bottom" data-toggle="tooltip"
                    type="button">
                      <span className="glyphicon glyphicon-remove" />閉じる
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});


module.exports = SignUp;

