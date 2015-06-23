'use strict';

/**
 * Nenpyo　入力ブロック用Reactファイル
 */

var React = require('react/addons'),
    Variables = require('../variables'),
    YearConverter = require('../YearConverter');

var MenuYearType = React.createClass({
  render: function()
  {
    return <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" onClick={this.props.handleChange}>{this.props.yearType}</a></li>

  }
});

/**
 * ヘッダコンテナ
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var InputField = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  // state
  getInitialState: function() {
    return {
      yearType: "西暦",
      year: "",
      month: "",
      day: "",
      desc: "",
      source: "",
      soueceUrl: "",
      tags: ""
    };
  },
  // 西暦、和暦をドロップダウンから選択した時の処理
  handleChangeYearType: function(e) {
    this.setState({yearType: e.currentTarget.textContent});
  },
  // 年の整合性チェック
  handleChangeYear: function(e) {
    // 年は空白か、0〜9999
    var newval = e.target.value;
    if ((newval.length == 0) || ((newval-0 >=0) && (newval-0 <= 9999))) {
      this.setState({year: newval});
    }
  },
  // 月の整合性チェック
  handleChangeMonth: function(e) {
    // 月は空白か、1〜12までの値のみ有効
    var newval = e.target.value;
    if ((newval.length == 0) || ((newval-0 >=1) && (newval-0 <= 12))) {
      this.setState({month: newval});
    }
  },
  // 日の整合性チェック
  handleChangeDay: function(e) {
    // 日は空白か、1〜31までの値
    var newval = e.target.value;
    if ((newval.length == 0) || ((newval-0 >= 1) && (newval-0 <= 31))) {
      this.setState({day: newval});
    }
  },
  // 西暦と和暦を変換したものを表示する
  getConvYear: function() {
    var mon = 0;
    var day = 0;
    if (this.state.year.length == 0) {
      return "-";
    }

    if (this.state.yearType == "西暦") {
      // 西暦＞和暦変換
      mon = this.state.month.length == 0 ? 12 : this.state.month;
      day = this.state.day.length == 0 ? 31 : this.state.day;
      return YearConverter.convYear(this.state.year,mon,day);
    }

    // 和暦＞西暦変換
    return "-";
  },
  render: function() {
    if (!this.props.dispInput)
    {
      return <div></div>;
    }

    // 和暦と西暦を確認のために変換する
    var convYear = this.getConvYear();

    return (
      <div>
        <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
          年表の新規入力&nbsp;&nbsp;
          <button id="btnCloseInputField" className="btn btn-default"
            title="入力欄を閉じる" data-placement="bottom" data-toggle="tooltip"
            type="button" onClick={this.props.handleCloseInput}>
              <span className="glyphicon glyphicon-remove" />閉じる
          </button>
          </div>
        </div>
        <div className="panel-body">
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="dropdownDate"
                className="col-sm-1 control-label text-right text-nowrap">
                日付
              </label>
              <div className="col-sm-11 form-inline">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownDate"
                  data-toggle="dropdown" aria-expanded="true">
                {this.state.yearType}&nbsp;<span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                  <MenuYearType handleChange={this.handleChangeYearType} yearType={"西暦"} />
                  <MenuYearType handleChange={this.handleChangeYearType} yearType={"平成"} />
                  <MenuYearType handleChange={this.handleChangeYearType} yearType={"昭和"} />
                  <MenuYearType handleChange={this.handleChangeYearType} yearType={"大正"} />
                  <MenuYearType handleChange={this.handleChangeYearType} yearType={"明治"} />
                </ul>
                <input type="text" className="form-control" placeholder="年"
                  onChange={this.handleChangeYear} value={this.state.year} size="4" />
                <input type="text" className="form-control" placeholder="月" size="2"
                  onChange={this.handleChangeMonth} value={this.state.month} />
                <input type="text" className="form-control" placeholder="日" size="2"
                  onChange={this.handleChangeDay} value={this.state.day} />
                <p className='help-block'>({convYear})</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="textDesc"
                className="col-sm-1 control-label text-right text-nowrap">
                出来事
              </label>
              <div className="col-sm-11">
                <textarea id="textDesc" className="form-control" rows="2" placeholder="出来事"
                  valueLink={this.linkState('desc')}
                  maxLength={Variables.DESC_MAX} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="textSource"
                className="col-sm-1 control-label text-right text-nowrap">
                出典
              </label>
              <div className="col-sm-11">
                <input type="text" id="textSource" className="form-control" placeholder="出典(省略可)"
                 maxLength={Variables.SOURCE_MAX}
                 valueLink={this.linkState('source')}
                />
                <input type="text" id="textSourceURL" className="form-control" placeholder="出典URL(省略可)"
                  maxLength={Variables.SOURCE_URL_MAX}
                  valueLink={this.linkState('sourceUrl')} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="textTag"
                className="col-sm-1 control-label text-right text-nowrap">
                タグ
              </label>
              <div className="col-sm-11">
                <input type="text" id="textTag" className="form-control" placeholder="タグ(省略可)"
                  maxLength={Variables.TAG_MAX}
                  />
                <p className='help-block'>複数指定する場合は、スペースで区切ってください。</p>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-1 col-sm-11">
                <div className="col-sm-2">
                  <button type="submit" id="btnEntry" className="btn btn-primary form-control"
                    title="入力した年表を登録する" data-placement="bottom" data-toggle="tooltip"
                    onClick={this.props.handleInput}>
                    <span className="glyphicon glyphicon-plus" />登録
                  </button>
                </div>
                <div className="col-sm-2">
                  <button id="btnCloseInputField" className="btn btn-default form-control"
                    title="入力欄を閉じる" data-placement="bottom" data-toggle="tooltip"
                    type="button" onClick={this.props.handleCloseInput}>
                      <span className="glyphicon glyphicon-remove" />閉じる
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      </div>
    );
  }
});


module.exports = InputField;

