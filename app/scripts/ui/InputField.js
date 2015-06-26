'use strict';

/**
 * Nenpyo　入力ブロック用Reactファイル
 */

var React = require('react/addons'),
    ConfirmModal = require('./ConfirmModal'),
    Variables = require('../variables'),
    YearConverter = require('../YearConverter');

var MenuYearType = React.createClass({
  render: function()
  {
    return <li role="presentation"><a role="menuitem" tabIndex="-1" href="#" onClick={this.props.handleChange}>{this.props.yearType}</a></li>

  }
});

var PanelHead = React.createClass({
  render: function() {
    var handleClose = this.props.onClick;
    return (
      <div className="panel-heading">
        <div className="panel-title">
          年表の新規入力&nbsp;&nbsp;
          <button id="btnCloseInputField" className="btn btn-default"
            title="入力欄を閉じる" data-placement="bottom" data-toggle="tooltip"
            type="button" onClick={handleClose}>
              <span className="glyphicon glyphicon-remove" />閉じる
          </button>
        </div>
      </div>
    );
  }
});

/**
 * this.props.tags配列で渡されたタグの文字列を、ボタン形式で、
 * 削除つきのブロックとして返す
 */
var ButtonTagList = React.createClass({
  render: function() {
    var handleRemove = this.props.handleRemove;
    var ret = this.props.tags.map(function(tag) {
      return (
        <span key={'tagkouho_'+tag} className='framed-text'>{tag}&nbsp;
          <span className='btn' key={tag}
            onClick={function(e){
              handleRemove(tag);
            }}>&times;</span>
        </span>
      );
    });

    return <div>{ret}</div>;
  }
});

/**
 * 日付の入力ブロックを返す
 * onChangeYearType 暦を変更した時の関数を渡す
 * onChangeYear 年を書き換えた時のイベントハンドラ
 * onChangeMonth 月を書き換えた時のイベントハンドラ
 * onChangeDay 日を書き換えた時のイベントハンドラ
 * nowState 現在のthis.stateを渡す
 */
var InputDate = React.createClass({
    render: function() {
      return (
      <div className="form-group">
        <label htmlFor="dropdownDate"
          className="col-sm-1 control-label text-right text-nowrap">
          日付
        </label>
        <div className="col-sm-11 form-inline">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownDate"
            data-toggle="dropdown" aria-expanded="true">
            {this.props.nowState.yearType}&nbsp;<span className="caret"></span>
          </button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            <MenuYearType handleChange={this.props.onChangeYearType} yearType={"西暦"} />
            <MenuYearType handleChange={this.props.onChangeYearType} yearType={"平成"} />
            <MenuYearType handleChange={this.props.onChangeYearType} yearType={"昭和"} />
            <MenuYearType handleChange={this.props.onChangeYearType} yearType={"大正"} />
            <MenuYearType handleChange={this.props.onChangeYearType} yearType={"明治"} />
          </ul>
          <input type="text" className="form-control" placeholder="年"
            onChange={this.props.onChangeYear} value={this.props.nowState.year} size="4" />
          <input type="text" className="form-control" placeholder="月" size="2"
            onChange={this.props.onChangeMonth} value={this.props.nowState.month} />
          <input type="text" className="form-control" placeholder="日" size="2"
            onChange={this.props.onChangeDay} value={this.props.nowState.day} />
          <p className='help-block'>({this.props.convYear})</p>
        </div>
      </div>
      );
    }
});

/**
 * できごとの入力ブロックの出力
 * valueLink 2wayバインディングのvalueLink
 */
var InputDesc = React.createClass({
      render: function() {
        return (
          <div className="form-group">
            <label htmlFor="textDesc"
              className="col-sm-1 control-label text-right text-nowrap">
              出来事
            </label>
            <div className="col-sm-11">
              <textarea id="textDesc" className="form-control" rows="2" placeholder="出来事"
                valueLink={this.props.valueLink}
                maxLength={Variables.DESC_MAX} />
            </div>
          </div>
        );
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
      sourceUrl: "",
      tag: "",
      nowSelectedTags: []
    };
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
    return YearConverter.convWareki2AD(this.state.yearType, this.state.year);
  },
  // this.stateから、確認文字列を出力して返す
  getConfirmBody: function() {
    var ret = "";
    for (var dt in this.state) {
      ret += "["+dt+"]"+this.state[dt]+" / ";
    }
    return <div className='btn btn-default'>{ret}</div>;
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
  // タグ追加ボタン
  handleAddTag: function(e) {
    var txttag = $('#textTag');
    var intag = txttag.val();
    if (intag.length > 0) {
      var newar = this.state.nowSelectedTags;
      newar.push(intag);
      // 選択中のタグを更新する
      this.setState({nowSelectedTags:newar});

      // 入力欄をクリアする
      txttag.typeahead('val','');

      // 既存の選択肢リストから、選択済みの選択肢を外した配列を作成する
      this.refreshBloodhoundTag();
        txttag.focus().typeahead('open');
    }
  },
  // オートコンプリートの候補を再設定する
  refreshBloodhoundTag: function() {
    var nowsel = this.state.nowSelectedTags;
    var newlist = this.props.tagList.filter(function(tag) {
        return ($.inArray(tag,nowsel) === -1);
    });

    var txttag = $('#textTag');
    // 選択肢を再設定
    this.bloodhoundTag.clear();
    this.bloodhoundTag.local = newlist;
    this.bloodhoundTag.initialize(true);
    txttag.typeahead('destroy');
    txttag.typeahead({
        hint: true,
        highlight: true,
        minLength: 0
      },
      {
        name: 'tags',
        source: this.tagsWithDefaults
      });
  },
  // 候補としてあげたタグを削除
  handleRemoveNowSelectedTag: function(tag) {
    var newar = this.state.nowSelectedTags;
    var idx = $.inArray(tag,newar);
    if (idx !== -1)
    {
      newar.splice(idx,1);
      // タグリストを更新する
      this.refreshBloodhoundTag(newar);
      this.setState({nowSelectedTags: newar});
    }
  },
  // オートコンプリートの候補出しオブジェクト
  bloodhoundTag: null,
  // オートコンプリートのデフォルト挙動のハンドル
  tagsWithDefaults(q, sync) {
    if (q === '') {
      // 空欄の時は全てを返す
      sync(this.bloodhoundTag.all());
    }
    else {
      // 一致するリストを返す
      this.bloodhoundTag.search(q, sync);
    }
  },
  // コンポーネントが実装された後の処理。オートコンプリートを設定する
  componentDidMount: function() {
    // suggestion engine
    this.bloodhoundTag = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // an array of tags defined in "The Basics"
      local: this.props.tagList
    });

    this.bloodhoundTag.initialize();

    // set typeahead
    $ ('#textTag').typeahead({
      hint: true,
      highlight: true,
      minLength: 0
    },
    {
      name: 'tags',
      source: this.tagsWithDefaults
    });
  },
  // 描画
  render: function() {
    // 和暦と西暦を確認のために変換する
    var convYear = this.getConvYear();
    var hidden = this.props.dispInput ? "" : "hidden";
    var confBody = this.getConfirmBody(this.state);

    return (
      <div className={hidden}>
        <ConfirmModal title='登録' body={confBody} btnYes='登録' handleYes={function() {}}
          btnNo='閉じる'
          id='confirmEntry' />

        <div className="panel panel-default">
          <PanelHead onClick={this.props.handleCloseInput} />
          <div className="panel-body">
            <form className="form-horizontal">

              <InputDate
                nowState={this.state}
                onChangeYearType={this.handleChangeYearType}
                onChangeYear={this.handleChangeYear}
                onChangeMonth={this.handleChangeMonth}
                onChangeDay={this.handleChangeDay}
                convYear={convYear}
              />

              <InputDesc
                valueLink={this.linkState('desc')}
              />

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
                  <ButtonTagList tags={this.state.nowSelectedTags} handleRemove={this.handleRemoveNowSelectedTag} />
                  <div className='form-inline'>
                    <div className="bloodhound">
                      <input type="text"
                        id="textTag"
                        name="inputTag"
                        className="typeahead form-control"
                        placeholder="タグ(省略可)"
                        maxLength={Variables.TAG_MAX}
                        size={Variables.TAG_MAX*2}
                        valueLink={this.linkState('tag')}
                        />
                    </div>
                    <button type='button'
                      className='btn btn-default form-control'
                      onClick={this.handleAddTag}
                      >
                      <span className="glyphicon glyphicon-plus" />&nbsp;タグ追加
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-1 col-sm-11">

                  <div className="col-sm-2">
                    <button type="button"
                      className="btn btn-primary form-control"
                      data-toggle="modal"
                      data-target="#confirmEntry"
                      title="入力した年表を登録する"
                      data-placement="bottom"
                      >
                      <span className="glyphicon glyphicon-plus" />&nbsp;登録
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
