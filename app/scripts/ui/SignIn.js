'use strict';

/**
 * SignIn　ログインブロック用Reactファイル
 */

var React = require('react');

/**
 * ヘッダコンテナ
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var SignIn = React.createClass({
  /**
   * ステータスの準備
   * @returns {Object} 状態
   */
  getInitialState: function() {
    return {enabled: false};
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
          サインイン&nbsp;&nbsp;
          <button id="btnCloseInputField" className="btn btn-default"
            title="閉じる" data-placement="bottom" data-toggle="tooltip"
            type="button">
              <span className="glyphicon glyphicon-remove" /> 閉じる
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
              <label for="textPass"
                className="col-sm-2 control-label text-right">
                パスワード
              </label>
              <div className="col-sm-10">
                <input type="password" id="textPass" className="form-control" placeholder="パスワード" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="col-sm-3">
                  <button type="submit" id="btnEntry" className="btn btn-primary form-control"
                    title="サインイン" data-placement="bottom" data-toggle="tooltip">
                    <span className="glyphicon glyphicon-log-in" /> サインイン
                  </button>
                </div>
                <div className="col-sm-3">
                  <button id="btnCloseInputField" className="btn btn-default form-control"
                    title="閉じる" data-placement="bottom" data-toggle="tooltip"
                    type="button">
                      <span className="glyphicon glyphicon-remove" /> 閉じる
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


module.exports = SignIn;

