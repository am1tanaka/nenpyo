'use strict';

/**
 * SignUp　ユーザー登録ブロック用Reactファイル
 */

var React = require('react');

/**
 *確認用モーダルを表示する
 * this.props.dataに表示データを設定
      // 確認ウィンドウ用クラス
      // disp:表示の有無
      // title：タイトル
      // body：本文
      // btnYes:進めるボタンに表示する文字列
      // handleYes:進める処理
      // btnNo:閉じるボタンに表示する文字列。省略するとCancelと表示
 * @returns {HTML} [[Description]]
 */
var ConfirmModal = React.createClass({
  render: function() {
    if (this.props.data.disp == false) {
      return <div></div>;
    }

    // モーダルを表示
    return (
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" aria-label="Close" onClick={this.props.handleClose}>
                <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{this.props.data.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.data.body}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.handleNo} data-dismiss="modal">{this.props.data.btnNo}</button>
              <button type="button" className="btn btn-primary" onClick={this.props.data.handleYes}>{this.props.data.btnYes}</button>
            </div>
          </div>
        </div>
    );

  }
});


module.exports = ConfirmModal;

