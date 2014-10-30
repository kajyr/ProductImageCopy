$submit = $('#go')
$results = $('#results ul')

$inputSourcePath = $('#srcDir')
$inputDestPath = $('#destDir')

sourceDir = null
destDir = null

fs = require('fs-extra')


$inputSourcePath.on('change', (evt) ->
	sourceDir = $(this).val()
)

$inputDestPath.on('change', (evt) ->
	destDir = $(this).val()
)


logResult = (msg) ->
	$results.append "<li class='#{}'>#{msg}</li>"

logError = (msg) ->
	$results.append "<li class='error'>#{msg}</li>"

copyFile = (source, to) ->
	fs.copy(source, to, (err) ->
		  return logError("#{from} errore durante la copia") if (err) 
		  logResult("#{source}<br/> copiato in <br />#{to}")
	)

parseCode = (from, to) ->
	source = sourceDir + "/" + from + ".jpg"
	dest = destDir + "/" + to + ".jpg" 

	if (fs.existsSync(source))
		copyFile(source, dest)
	else
		logError("#{from} non esiste")
	

$submit.on('click', () ->

	if !sourceDir? or !destDir?
		alert "Scegli la cartella sorgente e quella di destinazione"
		return

	template = $('#template').val().trim()

	if template == ''
		alert "il template sembra essere vuoto.."
		return

	lines = template.split('\n')

	_.each(lines, (element, index, list) ->

		[from, to] = element.split(',')

		parseCode(from, to)


	)

	
)


#
#  CLOSE
#
#
$('[role="close"]').on('click', () -> gui.App.quit() )