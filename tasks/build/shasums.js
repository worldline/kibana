var { promisify } = require('bluebird');
var readdir = promisify(require('fs').readdir);
var exec = promisify(require('child_process').exec);
var platform = require('os').platform();
var cmd = /^win/.test(platform) ? 'sha1sum ' : 'shasum ';

module.exports = function (grunt) {
  grunt.registerTask('_build:shasums', function () {
    var targetDir = grunt.config.get('target');

    readdir(targetDir)
    .map(function (archive) {
      // only sha the archives
      if (!archive.match(/\.zip$|\.tar.gz$/)) return;

      return exec(cmd + archive + ' > ' + archive + '.sha1.txt', {
        cwd: targetDir
      });
    })
    .nodeify(this.async());
  });

};
