var protoclass = require("protoclass"),
glob = require("glob");

var crypto = require('crypto');

function Loader (config) {
  this.config = config;
}

protoclass(Loader, {
  load: function (complete) {
    var articleFilePaths = glob.sync(this.config.get("articlesPath"));
    complete(null, articleFilePaths.map(function (filepath) {
      var pkg = require(filepath);
      pkg._id = crypto.createHash('md5').update(filepath).digest('hex')
      return pkg;
    }))
  }
});

module.exports = Loader;