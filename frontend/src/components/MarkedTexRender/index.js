/**
 * marked-tex-renderer
 *     A plug-in style renderer to produce TeX output for marked
 * https://github.com/sampathsris/marked-tex-renderer
 */

/*jshint node: true */
'use strict';

var NEWLINE = '\r\n';

function Renderer() {
}

Renderer.prototype.failOnUnsupported = function() {
	if (!this.options.hasOwnProperty('failOnUnsupported')) {
		return true;
	}
	
	return this.options.failOnUnsupported;
};

Renderer.prototype.code = function (code, lang, escaped) {
	return [
		'\\begin{verbatim}',
		code,
		'\\end{verbatim}'
	].join(NEWLINE) + NEWLINE;
};

Renderer.prototype.blockquote = function (quote) {
	return [
		'\\begin{quote}',
		quote,
		'\\end{quote}'
	].join(NEWLINE) + NEWLINE;
};

Renderer.prototype.html = function (html) {
	return html;
};

Renderer.prototype.heading = function (text, level, raw) {
	var command = '';

	switch (level) {
	case 1:
		command = '\\chapter';
		break;
	case 2:
		command = '\\section';
		break;
	case 3:
		command = '\\subsection';
		break;
	case 4:
		command = '\\subsubsection';
		break;
	case 5:
		command = '\\paragraph';
		break;
	case 6:
		command = '\\subparagraph';
		break;
	}

	if (command !== '' && text.indexOf('\\{-\\}') !== -1) {
		command += '*';
		text = text.replace(' \\{-\\}', '').replace('\\{-\\}', '');
	}
	
	return NEWLINE + command + '{' + text + '}' + NEWLINE;
};

Renderer.prototype.hr = function () {
	return '\\hrulefill' + NEWLINE;
};

Renderer.prototype.list = function (body, ordered) {
	if (ordered) {
		return [
			NEWLINE,
			'\\begin{enumerate}',
			body,
			'\\end{enumerate}',
			NEWLINE
		].join(NEWLINE);
	} else {
		return [
			NEWLINE,
			'\\begin{itemize}',
			body,
			'\\end{itemize}',
			NEWLINE
		].join(NEWLINE);
	}
};

Renderer.prototype.listitem = function (text) {
	return '\\item ' + text + NEWLINE;
};

Renderer.prototype.paragraph = function (text) {
	return '\\par ' + text;
};

Renderer.prototype.tablecell = function (content, flags) {
	// treat the cell as an element of a JSON array, and add a comma
	// to separate it from the subsequent cells
	return JSON.stringify({ content: content, flags: flags}) + ',';
};

Renderer.prototype.tablerow = function (content) {
	// remove trailing comma from the list of cells
	var row = content.substr(0, content.length - 1);
	
	// and return it as a JSON array. add a comma to separate the
	// row from the subsequent rows
	return '[' + row + '],';
};

Renderer.prototype.table = function (header, body) {
	var headerArr = [],
		bodyArr = [],
		hasHeader = false,
		firstRow,
		tex,
		tableSpec;
	
	// remove the trailing comma from header row
	if (header) {
		header = header.substr(0, header.length - 1);
		headerArr = JSON.parse(header);
		
		if (headerArr.length !== 0) {
			hasHeader = true;
		}
	}
	
	// remove the trailing comma from body row(s)
	if (body) {
		body = body.substr(0, body.length - 1);
		bodyArr = JSON.parse('[' + body + ']');
	}
	
	if (headerArr.length !== 0) {
		firstRow = headerArr;
	} else {
		firstRow = bodyArr[0];
	}
	
	tex = '\\begin{tabular}';
	
	// create table spec
	tableSpec = '{|';
	
	for (var i = 0; i < firstRow.length; i++) {
		var alignFlag = firstRow[i].flags.align || 'none';
		var align = 'l|';
		
		switch (alignFlag) {
		case 'right':
			align = 'r|';
			break;
		case 'center':
			align = 'c|';
			break;
		}
		
		tableSpec += align;
	}
	
	tableSpec += '}';
	tex += tableSpec + NEWLINE;
	
	// create table body
	tex += '\\hline' + NEWLINE;
	
	if (hasHeader) {
		tex += createTableRow(headerArr);
		tex += '\\hline' + NEWLINE;
	}
	
	for (var j = 0; j < bodyArr.length; j++) {
		tex += createTableRow(bodyArr[j]);
	}
	
	tex += '\\hline' + NEWLINE;
	
	tex += '\\end{tabular}' + NEWLINE;
	
	return tex;
};

Renderer.prototype.strong = function (text) {
	return '\\textbf{' + text + '}';
};

Renderer.prototype.em = function (text) {
	return '\\emph{' + text + '}';
};

Renderer.prototype.codespan = function (text) {
	return '\\texttt{' + this.text(text) + '}';
};

Renderer.prototype.br = function () {
	return '\\\\';
};

Renderer.prototype.del = function (text) {
	if (this.options.delRenderer) {
		return this.options.delRenderer(text);
	} else if (this.failOnUnsupported()) {
		throw new Error(
			'Client should provide a function to render deleted texts. ' +
			'Use options.delRenderer = function (text)');
	} else {
		// deleted text is meant to be deleted. return ''.
		return '';
	}
};

Renderer.prototype.link = function (href, title, text) {
	if (this.options.linkRenderer) {
		return this.options.linkRenderer(href, title, text);
	} else if (this.failOnUnsupported()) {
		throw new Error(
			'Client should provide a function to render hyperlinks. ' +
			'Use options.linkRenderer = function (href, title, text)');
	} else {
		// omit hyperlink and just return the text.
		return text;
	}
};

Renderer.prototype.image = function (href, title, text) {
	if (this.options.imageRenderer) {
		return this.options.imageRenderer(href, title, text);
	} else if (this.failOnUnsupported()) {
		throw new Error(
			'Client should provide a function to render images. ' +
			'Use options.imageRenderer = function (href, title, text)');
	} else {
		// some text without an image would be weird. return ''.
		return '';
	}
};

Renderer.prototype.text = function (text) {
	return texEscape(htmlUnescape(text));
};

/*
 * Implementation for unsupported features of plain TeX
 */
Renderer.delImpl = function (text) {
	// requires \usepackage{ulem}
	// use \normalem to retain normal emphasis
	return '\\sout{' + text + '}';
};

Renderer.linkImpl = function (href, title, text) {
	// requires \usepackage{hyperref}
	return '\\href{' + href + '}{' + text + '}';
};

Renderer.imageImpl = function (herf, title, text) {
	// requires \usepackage{graphicx}
	return [
		NEWLINE,
		'\\begin{figure}[h!]',
		'\\caption{' + text + '}',
		'\\centering',
		'\\includegraphics{' + herf + '}',
		'\\end{figure}'
	].join(NEWLINE) + NEWLINE;
};

/*
 * Helpers
 */
function createTableRow(rowArr) {
	var tex = '';
	
	for (var c = 0; c < rowArr.length; c++) {
		tex += rowArr[c].content;

		if (c < rowArr.length - 1) {
			tex += ' & ';
		} else {
			tex += ' \\\\' + NEWLINE;
		}
	}
	
	return tex;
}

function htmlUnescape(html) {
	return html.replace(/&([#\w]+);/g, function(_, n) {
		n = n.toLowerCase();

		if (n === 'colon') return ':';
		if (n === 'amp') return '&';

		if (n.charAt(0) === '#') {
			var charCode = 0;
			
			if (n.charAt(1) === 'x') {
				charCode = parseInt(n.substring(2), 16);
			} else {
				charCode = +n.substring(1);
			}
			
			return String.fromCharCode(charCode);
		}
		
		return '';
	});
}

function texEscape(text) {
	// some characters have special meaning in TeX
	//     \ & % $ # _ { } ~ ^
	return text
		.replace(/\\/g, '\\textbackslash')
		.replace(/\&/g, '\\&')
		.replace(/%/g, '\\%')
		.replace(/\$/g, '\\$')
		.replace(/#/g, '\\#')
		.replace(/\_/g, '\\_')
		.replace(/\{/g, '\\{')
		.replace(/\}/g, '\\}')
		.replace(/~/g, '\\textasciitilde')
		.replace(/\^/g, '\\textasciicircum');
}

module.exports = Renderer;