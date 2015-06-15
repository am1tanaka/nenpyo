'use strict';

/**
 * Nenpyo　年表の本体表示用Reactファイル
 */

var React = require('react');

/**
 * データに設定されたタグと、列のtag文字列を指定して、含まれているかを判定する
 * @param {[[Type]]} datatag 年表データのtag要素
 * @param {[[Type]]} tagline Nenpyoのstate.tags.tag
 *                           @return true=マッチする / false=該当しない
 */
var matchTag = function(datatag, tagline) {
  var tgs;
  var tglist;
  var i,j;
  // タグが未指定の場合は全てにマッチ
  tgs = tagline.trim();
  if (tgs.length == 0) {
    return true;
  }

  // もとデータにタグがない場合はヒットさせない
  if (!datatag) {
    return false;
  }

  tglist = tgs.split(/[:blank:]/);
  for (i=0 ; i<tglist.length ; i++) {
    for (j=0 ; j<datatag.length ; j++) {
      // タグがヒットしたら残す
      if (tglist[i] === datatag[j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 年表の年度の欄を出力する
 * @param   {[[Type]]} data 1つ分のデータ
 *                          @returns {HTML}     <td>で西暦と和暦を囲んだReactエレメントを返す
 */
var NenpyoYear = React.createClass({
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
  render : function() {
    var dt = this.props.data;
    var wa = this.convYear(dt.year,dt.month,dt.day);
    return (
      <td className="text-nowrap">{dt.year} ({wa})</td>
    );
  }
});

/**
 * 与えられたデータの日付に従って月日の列を出力する
 * @param data １つ分のデータ
 * @returns {HTML} 月と日をtdタグで囲んだReactエレメントを返す
 */
var NenpyoMonthDay = React.createClass({
  render : function() {
    var dt = this.props.data;

    // 日付の設定
    var mondy = "-";
    if (dt.month) {
      mondy = dt.month+"月";
      if (dt.day) {
        mondy += dt.day+"日";
      }
    }

    return <td className="text-right text-nowrap">{mondy}</td>;
  }
});

/**
 * 年表本体を描画する
 * @param   {[[Type]]} data 年表のデータ
 *                          @param {} tags Nenpyoのthis.state.tags
 *                          @returns {HTML}     作成したReactタグを返す
 */
var NenpyoTBody = React.createClass({
  /**
   * 年表の説明文章を作成する。出典やコメントなどを合成する
   * @param nenpyo 表示させたい年表の１つ分のデータ
   */
  makeNenpyoDesc : function(nenpyo) {
    var desc = nenpyo.desc;
    var srcdesc = "";
    var src = "";
    var hd = nenpyo.desc;
    var ft = "";

    // 出典があるか
    if (nenpyo.source) {
      hd=hd+" (出典：";
      ft = ")";

      // 出典(desc)があって、リンクもある(descがリンク)
      // リンクのみ(リンクURLを表示してリンク)
      if (nenpyo.source.link) {
        srcdesc = nenpyo.source.link;
        // 出典があるときは、表示を説明に変更
        if (nenpyo.source.desc) {
          srcdesc = nenpyo.source.desc;
        }
        return <div>{hd}<a href={nenpyo.source.link} target='_blank'>{srcdesc}</a>{ft}</div>;
      }
      else {
        // 説明(desc)があって、リンクがない(descを表示してリンクなし)
        src = nenpyo.source.desc;
      }
    }

    return hd+src+ft;
  },

  /**
   * 年表の列を生成されている列数分、生成して部分Reactエレメントを返す
   * @param nenpyo １つ分の年表データ
   * @param tags Nenpyo.state.tags
   * @return 列数分の年表データReact部分エレメント
   */
  makeNenpyoCols : function(nenpyo, tags) {
    var cnt = 0;
    var mkdesc = this.makeNenpyoDesc;

    // 列ループ
    var line = tags.map(function(tag) {
      var key = "td"+nenpyo.year+""+nenpyo.month+""+nenpyo.day+nenpyo.desc+""+cnt;
      cnt++;
      if (matchTag(nenpyo.tag,tag.tag)) {
        return <td key={key}>{mkdesc(nenpyo)}</td>;
      }
      else {
        return <td key={key}>-</td>;
      }
    });

    return line;
  },

  /**
   * フィルタ済みのデータをループさせて、タグに応じて行を作成して返す
   * @param data フィルタリング済みの年表データ配列
   * @param tags Nenpyo.state.tags
   * @return テーブルの行を表すReactエレメント
   */
  makeBody : function(data, tags) {
    var makeDate = this.makeDate;
    var makeNenpyoCols = this.makeNenpyoCols;
    // データをループ
    var tbody = data.map(function(data) {
      var key = data.year+""+data.month+""+data.day+data.desc;
      var bodycols = makeNenpyoCols(data, tags);

      return (
        <tr key={key}>
          <NenpyoYear data={data} />
          <NenpyoMonthDay data={data} />
          {bodycols}
        </tr>
      );
    });

    return tbody;
  },

  render : function() {
    var tags = this.props.tags;

    // 表示するデータのみに整理しておく
    var filtered = this.props.data.filter(function(data) {
      for (var i=0 ; i<tags.length ; i++) {
        if (matchTag(data.tag,tags[i].tag)) return true;
      }
      return false;
    });

    var body = this.makeBody(filtered, this.props.tags);

    // 本体部を返す
    return (
      <tbody>
        {body}
      </tbody>
    );
  }
});

module.exports = NenpyoTBody;
