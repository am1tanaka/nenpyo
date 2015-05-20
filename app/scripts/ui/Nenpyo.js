'use strict';

/**
 * Nenpyo　年表用Reactファイル
 */

var React = require('react');

// 年月日のパーツを出力

// 内容の出力。desc、source、タグをまとめて出力

/**
 * 年表ブロックを作成する。
 * tag stateの要素がない場合は、すべてのデータを出力。
 * 1つ要素がある場合は、1列でそのタグに対応するデータのみを出力
 * 2つ以上の場合は、列をその分増やして、列ごとにデータを出力
 * @returns {HTML} 作成した年表ブロックのReactタグ
 */
var Nenpyo = React.createClass({
  getInitialState: function() {
    return {tag: []};
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
    var tableNodes = this.props.data.map(function (row) {
      var wa = this.convYear(row.year,row.month,row.day);
      var mondy = "-";
      if (row.month) {
        mondy = row.month+"月";
        if (row.day) {
          mondy += row.day+"日";
        }
      }
      return (
        <tr>
          <td className="text-nowrap">{row.year} ({wa})</td>
          <td className="text-right text-nowrap">{mondy}</td>
          <td>{row.desc}</td>
        </tr>
      );
    },this);
    return (
      <div>
        <table className="table table-striped table-bordered">
          <colgroup>
            <col className="col-xs-1" />
            <col className="col-xs-1" />
            <col className="col-xs-10" />
          </colgroup>
          <thead>
            <tr><th className="text-center">西暦 (和暦)</th>
              <th className="text-center">月日</th>
              <th className="text-center">内容</th>
            </tr>
          </thead>
          <tbody>
            {tableNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Nenpyo;

