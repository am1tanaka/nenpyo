'use strict';

/**
 * nt-nenpyo　ヘッダ用Reactファイル
 */

var React = require('react');

/**
 * ヘッダのテキストを描画
 * @param   {string} children 表示する文字列
 *                            @returns {HTML}     ヘッダ用テキストのReactタグを返す
 */
var HeaderText = React.createClass({
  render : function() {
    return (
      <li>
          <p className="navbar-text">{this.props.children}</p>
      </li>
    );
  }
});

/**
 * ヘッダ用のボタンを返す
 * @param   {string} icon     表示するアイコンの指定
 * @param   {string} children 表示する文字列
 *                            @returns {HTML}   ヘッダ用のボタンのReactタグを返す
 */
var HeaderButton = React.createClass({
 render: function() {
   var icon = "glyphicon "+this.props.icon;
   return (
      <li data-toggle="tooltip" data-placement="bottom" title={this.props.children}>
          <a href="#" onClick={this.props.onClick}>
              <span className={icon} aria-hidden="true"></span>
              <span className="hidden-xs hidden-sm">{this.props.children}</span>
          </a>
      </li>
   );
 }
});

/**
 * ヘッダーの左右に配置するブロック
 * @param   {string} addclass クラスに付加する要素。左右やhiddenなどを追加
 *                            @returns {HTML}   ヘッダーブロックのReactのタグを返す
 */
var HeaderBlock = React.createClass({
  render: function() {
    return (
      <div className={this.props.addclass} role="navigation">
        <ul className="nav nav-pills tmnt-nav-pills-top">
          {this.props.children}
        </ul>
      </div>
    );
  }
});

/**
 * ヘッダコンテナ
 * permission string none=サインインしていない / user=ユーザーモード / admin=管理者モード
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var Header = React.createClass({
  handleCSV: function(e) {
    alert("表示している年表をCSVファイルに出力する予定です。");
  },
  handleImport: function() {
    alert("CSVファイルやWordファイルから年表をインポートする予定です。");
  },
  handleUserSetting:function() {
    alert("ユーザー設定画面を呼び出す予定です。");
  },
  render: function() {
    if (this.props.permission == "admin") {
      // 管理者モード
    }
    else if (this.props.permission == "user") {
      // ユーザーモード
      return (
        <div>
          <nav className="navbar navbar-default navbar-fixed-top container-fluid">
            <HeaderBlock addclass="pull-left">
              <HeaderText>多摩NT年表</HeaderText>
              <HeaderButton icon="glyphicon-plus" key="nenpyo" onClick={this.props.handleOpenInput}>&nbsp;年表追加</HeaderButton>
              <HeaderButton icon="glyphicon-download" key="csv" onClick={this.handleCSV}>&nbsp;CSV取得</HeaderButton>
              <HeaderButton icon="glyphicon-upload" key="import" onClick={this.handleImport}>&nbsp;インポート</HeaderButton>
            </HeaderBlock>
            <HeaderBlock addclass="pull-right">
              <HeaderText>Username</HeaderText>
              <HeaderButton icon="glyphicon-cog" key="setting" onClick={this.handleUserSetting}>&nbsp;Settings</HeaderButton>
              <HeaderButton icon="glyphicon-log-out" key="signout" onClick={this.props.handleSignOut}>&nbsp;Sign Out</HeaderButton>
            </HeaderBlock>
          </nav>
        </div>
      );
    }

    // 権限なし時のトップ
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top container-fluid">
          <HeaderBlock addclass="pull-left">
            <HeaderText>多摩NT年表</HeaderText>
          </HeaderBlock>
          <HeaderBlock addclass="pull-right">
            <HeaderButton icon="glyphicon-hand-up" key="signup">&nbsp;Sign Up</HeaderButton>
            <HeaderButton icon="glyphicon-log-in" key="signin" onClick={this.props.doSignIn}>&nbsp;Sign In</HeaderButton>
          </HeaderBlock>
        </nav>
      </div>
    );
  }
});

/*
      style="display: inline-block" role="navigation">

    <nav class="navbar navbar-default navbar-fixed-top container-fluid">
        <div class="pull-left" style="display: inline-block" role="navigation">
            <ul class="nav nav-pills tmnt-nav-pills-top">
                <li>
                    <p class="navbar-text">多摩NT年表</p>
                </li>
                <li data-toggle="tooltip" data-placement="bottom" title="年表追加">
                    <a href="#">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        <span class="hidden-xs hidden-sm">年表追加</span>
                    </a>
                </li>
                <li data-toggle="tooltip" data-placement="bottom" title="CSV取得">
                    <a href="#">
                        <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                        <span class="hidden-xs hidden-sm">CSV取得</span>
                    </a>
                </li>
                <li data-toggle="tooltip" data-placement="bottom" title="インポート">
                    <a href="#">
                        <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
                        <span class="hidden-xs hidden-sm">インポート</span>
                    </a>
                </li>
            </ul>
        </div>

        <div id="" class="pull-right" style="display: inline-block" role="navigation">
            <ul class="nav nav-pills tmnt-nav-pills-top">
                <li>
                    <p class="navbar-text">Username</p>
                </li>
                <li data-toggle="tooltip" data-placement="bottom" title="Settings">
                    <a href="#"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                        <span class="hidden-xs hidden-sm">Settings</span>
                    </a>
                </li>
                <li data-toggle="tooltip" data-placement="bottom" title="Sign out">
                    <a href="#"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                        <span class="hidden-xs hidden-sm">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="pull-right hidden" style="display: inline-block" role="navigation">
            <ul class="nav nav-pills tmnt-nav-pills-top">
                <li data-toggle="tooltip" data-placement="bottom" title="Sign Up">
                    <a href="#"><span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span>
                    <span class="hidden-xs hidden-sm">Sign Up</span>
                    </a>
                </li>
                <li data-toggle="tooltip" data-placement="bottom" title="Sign In">
                    <a href="#"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>
                        <span class="hidden-xs hidden-sm">Sign In</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

*/

module.exports = Header;
