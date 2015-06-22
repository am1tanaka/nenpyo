'use strict';

/**
 * Nenpyo　入力ブロック用Reactファイル
 */

var React = require('react'),
    Button = require('react-bootstrap/lib/Button'),
    ButtonInput = require('react-bootstrap/lib/ButtonInput'),
    Col = require('react-bootstrap/lib/Col'),
    DropdownButton = require('react-bootstrap/lib/DropdownButton'),
    FormControls = require('react-bootstrap/lib/FormControls'),
    Glyphicon = require('react-bootstrap/lib/Glyphicon'),
    Grid = require('react-bootstrap/lib/Grid'),
    Input = require('react-bootstrap/lib/Input'),
    MenuItem = require('react-bootstrap/lib/MenuItem'),
    Panel = require('react-bootstrap/lib/Panel'),
    Row = require('react-bootstrap/lib/Row'),
    YearConverter = require('../YearConverter');

/**
 * ヘッダコンテナ
 * @returns {HTML} ヘッダのReactオブジェクトを返す
 */
var InputField = React.createClass({
  // state
  getInitialState: function() {
    return {
      yeartype: "西暦",
      year: "",
      month: "",
      day: ""
    };
  },
  // 西暦、和暦をドロップダウンから選択した時の処理
  handleChangeYearType: function(e) {
    this.setState({yeartype: e.currentTarget.textContent});
  },
  // 年の整合性チェック
  handleChangeYear: function() {
    // 年は空白か、0〜9999
    var newval = this.refs.inputYear.getValue();
    if ((newval.length == 0) || ((newval-0 >=0) && (newval-0 <= 9999))) {
      this.setState({year: newval});
    }
  },
  // 月の整合性チェック
  handleChangeMonth: function() {
    // 月は空白か、1〜12までの値のみ有効
    var newval = this.refs.inputMonth.getValue();
    if ((newval.length == 0) || ((newval-0 >=1) && (newval-0 <= 12))) {
      this.setState({month: newval});
    }
  },
  // 日の整合性チェック
  handleChangeDay: function() {
    // 日は空白か、1〜31までの値
    var newval = this.refs.inputDay.getValue();
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

    if (this.state.yeartype == "西暦") {
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

        <Panel header={
          <h4>年表の新規入力&nbsp;&nbsp;
          <Button
            title='入力欄を閉じる' data-placement="bottom" data-toggle="tooltip"
            onClick={this.props.handleCloseInput}>
            <Glyphicon glyph='remove' /> 閉じる
          </Button></h4>
          }>

          <form className="form-horizontal">
            <Input label='日付' labelClassName='col-sm-1 text-nowrap' wrapperClassName="col-sm-10">
              <Row>
                <Col sm={1}>
                  <DropdownButton bsStyle="default" title={this.state.yeartype} key="dropdownYearType" onSelect={function(){}}>
                    <MenuItem eventKey="1" onClick={this.handleChangeYearType}>西暦</MenuItem>
                    <MenuItem eventKey="2" onClick={this.handleChangeYearType}>平成</MenuItem>
                    <MenuItem eventKey="3" onClick={this.handleChangeYearType}>昭和</MenuItem>
                    <MenuItem eventKey="4" onClick={this.handleChangeYearType}>大正</MenuItem>
                    <MenuItem eventKey="5" onClick={this.handleChangeYearType}>明治</MenuItem>
                  </DropdownButton>
                </Col>
                <Col sm={2}>
                  <Input type="text" placeholder="年" size="4" maxsize="4"
                    ref='inputYear'
                    onChange={this.handleChangeYear}
                    value={this.state.year}
                    help={convYear} />
                </Col>
                <Col sm={2}>
                  <Input type="text" placeholder="月" size="2" maxsize="2"
                    ref='inputMonth'
                    onChange={this.handleChangeMonth}
                    value={this.state.month} />
                </Col>
                <Col sm={2}>
                  <Input type="text" placeholder="日" size="2" maxsize="2"
                    ref='inputDay'
                    onChange={this.handleChangeDay}
                    value={this.state.day} />
                </Col>
              </Row>
            </Input>
            <Input type="textarea" wrapperClassName="col-sm-11" placeholder="出来事" rows="2"
              label='出来事' labelClassName='col-sm-1 text-nowrap' />
            <Input label="出典" labelClassName='col-sm-1 text-nowrap' wrapperClassName="col-sm-10">
                <Input type="text" wrapperClassName="col-sm-11" placeholder="出典(省略可)" />
                <Input type="text" wrapperClassName="col-sm-11" placeholder="出典URL(省略可)" />
           </Input>

            <Input type="text" wrapperClassName="col-sm-11" placeholder="タグ(省略可)"
              label='タグ' labelClassName='col-sm-1 text-nowrap' />

            <Row>
              <Col sm={2} smOffset={1}>
              <Button bsStyle='primary' type='submit'
                title="入力した年表を登録する" data-placement="bottom" data-toggle="tooltip"
                onClick={this.props.handleInput}>

                <Glyphicon glyph='plus' /> 登録
              </Button>
              </Col>

              <Col sm={2}>
              <Button type='cancel'
                title='入力欄を閉じる' data-placement="bottom" data-toggle="tooltip"
                onClick={this.props.handleCloseInput}>
                <Glyphicon glyph='remove' /> 閉じる
              </Button>
                                   </Col>
                                   </Row>

        </form>


        </Panel>


      </div>
    );
  }
});


module.exports = InputField;

