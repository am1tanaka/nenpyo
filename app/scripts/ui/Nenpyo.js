'use strict';

/**
 * Nenpyo　年表用Reactファイル
 */

var React = require('react');

// 年月日のパーツを出力

// 内容の出力。desc、source、タグをまとめて出力

var NenpyoColgroup = React.createClass({
  render : function()  {
    var num = (this.props.tags.length <= 1) ? "col-xs-10" :
      (this.props.tags.length == 2) ? "col-xs-5" : "col-xs-3";
    var cols = this.props.tags.map(function(data) {
      return <col className={num} />;
    });

    // タグが1列
    return (
      <colgroup>
        <col className="col-xs-1" />
        <col className="col-xs-1" />
        {cols}
      </colgroup>
    );
  }
});

var NenpyoAddTagButton = React.createClass({
  render : function() {
    return  <button
                id={"btnAddTag"}
                className="btn btn-default col-xs-1"
                type="button"
                data-toggle="tooltip"
                data-placement="bottom"
                title="列追加"
                onClick={this.props.onaddcol}
              >
              <span className="glyphicon glyphicon-plus" />
            </button>;
  }
});

/** 年表の見出しを出力する*/
var NenpyoTHead = React.createClass({
  render : function() {
    var cnt = 0;
    var num = this.props.tags.length;
    var onaddcol = this.props.onaddcol;
    var onrmvcol = this.props.onremovecol;
    var body = this.props.tags.map(function (data) {
      var addtag = "";
      var grid = "col-xs-12";
      var rmvtag = "";
      cnt++;
      if ((num < 3) && (cnt == num)) {
          addtag =<NenpyoAddTagButton onaddcol={onaddcol} />
          grid = "col-xs-10";
      }
      if (num > 1) {
        rmvtag = (
                  <button className="btn btn-default" type="button" id={"btnRemove"+(cnt-1)} onClick={onrmvcol.bind(this,cnt-1)}>
                    <span className="glyphicon glyphicon-remove" />
                  </button>
                    );
      }

      return (
        <th>
          <form>
            <span className={grid}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="タグ"
                  className="form-control"
                  value={data}
                  id={"tagtext"+(cnt-1)} />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button" id={"btnErace"+(cnt-1)}>
                    <span className="glyphicon glyphicon-remove-circle" />
                  </button>
                  {rmvtag}
                </span>
              </div>
            </span>
            {addtag}
          </form>
        </th>
      );
    });

    return (
          <thead>
            <tr><th className="text-center text-nowrap">西暦 (和暦)</th>
              <th className="text-center text-nowrap">月日</th>
                {body}
            </tr>
          </thead>);
  }
});

/**
 * 年表ブロックを作成する。
 * tag stateの要素がない場合は、すべてのデータを出力。
 * 1つ要素がある場合は、1列でそのタグに対応するデータのみを出力
 * 2つ以上の場合は、列をその分増やして、列ごとにデータを出力
 * @returns {HTML} 作成した年表ブロックのReactタグ
 */
var Nenpyo = React.createClass({
  getInitialState: function() {
    return {tags: ["abc","abcd"]};
  },
  handleAddCol : function() {
    if (this.state.tags.length < 3) {
      this.state.tags.push("");
      this.setState({tags : this.state.tags});
    }
  },
  handleRemoveCol : function(e) {
    this.state.tags.splice(e,1);
    console.log("["+e+"]"+this.state.tags);
    this.setState({tags : this.state.tags});
  },
  convYear: function(ad,mon,dy) {
    mon = mon || 12;  // 省略時は最終日にする
    dy  = dy || 31;

    // 平成(1989/1/8以降)
    if (  (ad > 1989)
        ||  (   (ad === 1989)
            &&  (   (mon > 1)
                 || (dy >= 8))))
    {
      return "平成"+(ad-1988)+"年";
    }
    // 昭和(1926/12/25以降)
    else if (   (ad > 1926)
             || (   (ad === 1926)
                 && (mon === 12)
                 && (dy >= 25))) {
      return "昭和"+(ad-1925)+"年";
    }
    // 大正(1912/7/30以降)
    else if (   (ad > 1912)
             || (   (ad === 1912)
                 && (mon > 7)
                 || (   (mon === 7)
                     && (dy >= 30)))) {
      return "大正"+(ad-1911)+"年";
    }
    // 明治(1868/9/8以降)
    else if (   (ad > 1868)
             || (   (ad === 1868)
                 && (   (mon > 9)
                     || (   (mon === 9)
                         && (dy >= 8)))))
    {
      return "明治"+(ad-1867)+"年";
    }
    // それ以前
    else {
      return "-";
    }
  },
  render: function() {
    return (
      <div>
        <table className="table table-striped table-bordered">
          <NenpyoColgroup tags={this.state.tags} />
          <NenpyoTHead
            tags={this.state.tags}
            onaddcol={this.handleAddCol}
            onremovecol={this.handleRemoveCol} />
        </table>
      </div>
    );
  }
});

module.exports = Nenpyo;

