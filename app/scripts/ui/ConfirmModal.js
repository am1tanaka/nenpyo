'use strict';

/**
 * SignUp　ユーザー登録ブロック用Reactファイル
 */

var React = require('react');

/**
 * 確認用モーダルを作成する
 * this.props.dataに表示データを設定
      // 確認ウィンドウ用クラス
      // title：タイトル
      // body：本文
      // id : 呼び出すためのid。これと同じ文字列をボタンんdata-targetに#を冒頭につけて設定する
      // btnYes:進めるボタンに表示する文字列
      // handleYes:進める処理
      // btnNo:閉じるボタンに表示する文字列。省略するとCancelと表示
 * @returns {HTML} [[Description]]
 */
var ConfirmModal = React.createClass({
  render: function() {
    // モーダルを返す
    return (
        <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog"
          aria-labelledby={this.props.id+"Label"} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span><span className="sr-only">{this.props.btnNo}</span></button>
                <h4 className="modal-title" id={this.props.id+"Label"}>{this.props.title}</h4>
              </div>
              <div className="modal-body">
      {this.props.body}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">{this.props.btnNo}</button>
                <button type="button" className="btn btn-primary" onClick={this.props.handleYes}>
                  {this.props.btnYes}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
});


module.exports = ConfirmModal;

