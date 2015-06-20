'use strict';

/**
 * Nenpyo　入力ブロック用Reactファイル
 */

var React = require('react/addons'),
    DropdownButton = require('react-bootstrap/lib/DropdownButton'),
    MenuItem = require('react-bootstrap/lib/MenuItem');

/**
 * ヘッダコンテナ
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var InputField = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
    return {
      yeartype: "西暦",
      year: "",
      month: "",
      day: "",

    };
  },
  handleDropdownButton: function(e) {
  },
  handleChangeYearType: function(e) {
    this.setState({yeartype: e.currentTarget.textContent});
    //alert(e.currentTarget);
    /*
    var obj = e;
    for (var nm in obj) {
      if (    (typeof obj[nm] != 'function')
          &&  (obj[nm] != null)
          &&  (obj[nm] != ""))
      {
        alert("obj["+nm+"]="+obj[nm]);
      }
    }*/
  },
  render: function() {
    if (!this.props.dispInput)
    {
      return <div></div>;
    }

    return (
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
              <label
                className="col-sm-1 control-label text-right text-nowrap">
                日付
              </label>
              <div className="col-sm-11 form-inline">
                <DropdownButton bsStyle="default" title={this.state.yeartype} key="dropdownYearType" onSelect={this.handleDropdownButton}>
                  <MenuItem eventKey="1" onClick={this.handleChangeYearType}>西暦</MenuItem>
                  <MenuItem eventKey="2" onClick={this.handleChangeYearType}>平成</MenuItem>
                  <MenuItem eventKey="3" onClick={this.handleChangeYearType}>昭和</MenuItem>
                  <MenuItem eventKey="4" onClick={this.handleChangeYearType}>大正</MenuItem>
                  <MenuItem eventKey="5" onClick={this.handleChangeYearType}>明治</MenuItem>
                </DropdownButton>
                <input type="text" className="form-control" placeholder="年" size="4" maxsize="4" />
                <input type="text" className="form-control" placeholder="月" size="2" maxsize="2" />
                <input type="text" className="form-control" placeholder="日" size="2" maxsize="2" />
              </div>
            </div>

            <div className="form-group">
              <label
                className="col-sm-1 control-label text-right text-nowrap">
                出来事
              </label>
              <div className="col-sm-11">
                <textarea id="textDesc" className="form-control" rows="2" placeholder="出来事" />
              </div>
            </div>

            <div className="form-group">
              <label
                className="col-sm-1 control-label text-right text-nowrap">
                出典
              </label>
              <div className="col-sm-11">
                <input type="text" id="textSource" className="form-control" placeholder="出典(省略可)" />
                <input type="text" id="textSourceURL" className="form-control" placeholder="出典URL(省略可)" />
              </div>
            </div>

            <div className="form-group">
              <label
                className="col-sm-1 control-label text-right text-nowrap">
                タグ
              </label>
              <div className="col-sm-11">
                <input type="text" id="textTag" className="form-control" placeholder="タグ(省略可)" />
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
    );
  }
});


module.exports = InputField;

