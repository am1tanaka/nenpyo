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
    return <div>modal</div>
  }
});

module.exports = ConfirmModal;

