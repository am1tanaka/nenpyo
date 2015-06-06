'use strict';

/**
 * Nenpyo　入力ブロック用Reactファイル
 */

var React = require('react');

/**
 * ヘッダコンテナ
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var InputField = React.createClass({
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
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          年表の新規入力
          <button id="btnCloseInputField" className="btn btn-default"
            title="入力欄を閉じる" data-placement="bottom" data-toggle="tooltip"
            type="button">
              <span className="glyphicon glyphicon-remove" />閉じる
          </button>
        </div>
        <div className="panel-body">
          <table className="table-bordered">
          <thead>
          <tr>
            <th>日付</th>
            <th>内容</th>
            <th>タグ</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="text-nowrap">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                西暦
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">西暦</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">平成</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">昭和</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">大正</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">明治</a></li>
              </ul>
              <input type="text" placeholder="年" size="4" maxsize="4" />
              <input type="text" placeholder="月" size="2" maxsize="2" />
              <input type="text" placeholder="日" size="2" maxsize="2" />
            </td>
            <td>
              <textarea />
            </td>
            <td>
              <input type="text" placeholder="タグ" />
            </td>
          </tr>
          </tbody>
          </table>
        </div>
       項目(消すボタン) タグ(消すボタン) 登録ボタン 閉じるボタン
      <hr />
      </div>
    );
  }
});


module.exports = InputField;

