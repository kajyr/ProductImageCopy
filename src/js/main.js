(function() {
  var $inputDestPath, $inputSourcePath, $results, $submit, copyFile, destDir, fs, logError, logResult, parseCode, sourceDir;

  $submit = $('#go');

  $results = $('#results ul');

  $inputSourcePath = $('#srcDir');

  $inputDestPath = $('#destDir');

  sourceDir = null;

  destDir = null;

  fs = require('fs');

  $inputSourcePath.on('change', function(evt) {
    return sourceDir = $(this).val();
  });

  $inputDestPath.on('change', function(evt) {
    return destDir = $(this).val();
  });

  logResult = function(msg) {
    return $results.append("<li class='" + "'>" + msg + "</li>");
  };

  logError = function(msg) {
    return $results.append("<li class='error'>" + msg + "</li>");
  };

  copyFile = function(source, to) {
    fs.createReadStream(source).pipe(fs.createWriteStream(to));
    return logResult("" + source + "<br/> copiato in <br />" + to);
  };

  parseCode = function(from, to) {
    var dest, source;
    source = sourceDir + "/" + from + ".jpg";
    dest = destDir + "/" + to + ".jpg";
    if (fs.existsSync(source)) {
      return copyFile(source, dest);
    } else {
      return logError("" + from + " non esiste");
    }
  };

  $submit.on('click', function() {
    var lines, template;
    if ((sourceDir == null) || (destDir == null)) {
      alert("Scegli la cartella sorgente e quella di destinazione");
      return;
    }
    template = $('#template').val().trim();
    if (template === '') {
      alert("il template sembra essere vuoto..");
      return;
    }
    lines = template.split('\n');
    return _.each(lines, function(element, index, list) {
      var from, to, _ref;
      _ref = element.split(','), from = _ref[0], to = _ref[1];
      return parseCode(from, to);
    });
  });

  $('[role="close"]').on('click', function() {
    return gui.App.quit();
  });

}).call(this);
