'use strict';

var YearConverter = {
  //
  // gengoに元号を日本語の文字列
  // nenに年数を数値で指定
  //

  /**
   * 和暦を西暦に変換する
   * @param {string} gengo 言語の日本語文字列
   *                       @param {number} nen   年数
   *                       @return {String} 無効な時は-。それ以外は西暦を返す
   */
  convWareki2AD: function(gengo,nen) {
    nen = nen-0;
    if (gengo == "平成") {
      return nen+1988;
    }
    else if (gengo == "昭和") {
      return nen+1925;
    }
    else if (gengo == "大正") {
      return nen+1911;
    }
    else if (gengo == "明治") {
      return nen+1867;
    }
    return "-";
  },
  //
  convYear: function(inad,inmon,indy) {
    var ad = inad-0;
    var mon = inmon-0 || 12;  // 省略時は最終日にする
    var dy  = indy-0 || 31;

    // 平成(1989/1/8以降)
    if (  (ad > 1989)
        ||  (   (ad === 1989)
            &&  (   (mon > 1)
                 || (dy >= 8))))
    {
      if (ad === 1989) {
        return "平成元年";
      }
      return "平成"+(ad-1988)+"年";
    }
    // 昭和(1926/12/25以降)
    else if (   (ad > 1926)
             || (   (ad === 1926)
                 && (mon === 12)
                 && (dy >= 25))) {
      if (ad === 1926) {
        return "昭和元年";
      }
      return "昭和"+(ad-1925)+"年";
    }
    // 大正(1912/7/30以降)
    else if (   (ad > 1912)
             || (   (ad === 1912)
                 && (mon > 7)
                 || (   (mon === 7)
                     && (dy >= 30)))) {
      if (ad === 1912) {
        return "大正元年";
      }
      return "大正"+(ad-1911)+"年";
    }
    // 明治(1868/9/8以降)
    else if (   (ad > 1868)
             || (   (ad === 1868)
                 && (   (mon > 9)
                     || (   (mon === 9)
                         && (dy >= 8)))))
    {
      if (ad === 1868) {
        return "明治元年";
      }
      return "明治"+(ad-1867)+"年";
    }
    // それ以前
    else {
      return "-";
    }
  }
};

module.exports = YearConverter;
