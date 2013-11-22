var util = require('util');
var wiki = require('./index');

wiki('https://github.com/CatTail/abbr/wiki/Packages', function(err, dict) {
  console.log(util.inspect(dict, {depth: null}));
});
