
/**
 * Module dependencies.
 */

var request = require('superagent');
var jquery = require('cheerio').load;

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Parse wiki `url` and invoke `fn(err, pkgs)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @api public
 */

function parse(url, fn) {
  request
  .get(url)
  .end(function(err, res){
    if (err) return fn(err);
    if (res.error) return fn(res.error);

    var $ = jquery(res.text);
    var data = {};
    var cat;

    $('#wiki-body h2, #wiki-body h2 + ul li').each(function(){
      var name = this[0].name;

      // heading
      if ('h' == name[0]) {
        var text = $(this).text().trim();
        cat = data[text] = [];
        return;
      }

      // package
      var tuple = $(this).text().split(':');
      var name = tuple[0].trim();
      var abbrs = tuple[1].split(',').map(function(abbr){return abbr.trim();});

      cat.push({
        name: name,
        abbrs: abbrs
      });
    });

    fn(null, data);
  });
}
