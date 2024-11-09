/*! Cazary (jQuery 1.2.4+) - JavaScript WYSIWYG editor (https://github.com/shimataro/cazary) */
(function($, window, undefined)
{
	var document = window.document;

	/**
	 * simplified translation function that can be used just like GNU gettext
	 * @function
	 * @param {String} text text to be translated
	 * @return {String} translated text
	 */
	var _ = (function()
	{
		/**
		 * Translation Data
		 * see i18n directory
		 */
		var translation_data = {
			"po": {"Insert Image": "Wstaw obrazek", "Size 5": "Rozmiar 5", "Show Source": "Poka\u017c \u017ar\u00f3d\u0142o", "Size 4": "Rozmiar 4", "Justify Right": "Wyr\u00f3wnaj do prawej", "Remove Format": "Usu\u0144 formatowanie", "Justify Center": "Wyr\u00f3wnaj do \u015brodka", "Italic": "Kursywa", "Size 1": "Rozmiar 1", "Subscript": "Indeks dolny", "Preview": "Podgl\u0105d", "Input link URL or E-mail address": "Wprowad\u017a adres URL lub E-mail", "Bold": "Pogrubienie", "Unordered List": "Punktory", "Input image URL": "Adres obrazka", "Undo": "Cofnij", "Strike-Through": "Przekre\u015blenie", "Horizontal Rule": "Pozioma linia", "Superscript": "Indeks g\u00f3rny", "Outdent": "Zmniejsz wci\u0119cie", "Background Color": "Kolor t\u0142a", "Size 7": "Rozmiar 7", "Size 6": "Rozmiar 6", "Indent": "Zwi\u0119ksz wci\u0119cie", "Size 3": "Rozmiar 3", "Size 2": "Rozmiar 2", "Insert": "Wstaw", "Ordered List": "Numerowanie", "Justify Left": "Wyr\u00f3wnanie do lewej", "Justify Full": "Wyjustowanie", "Foreground Color": "Kolor czcionki", "Unlink": "Usu\u0144 link", "Insert Link": "Wstaw link", "Font": "Czcionka", "Redo": "Powt\u00f3rz", "Underline": "Podkre\u015blenie", "Size": "Rozmiar"},
			"ja": {"Insert Image": "\u753b\u50cf\u633f\u5165", "Size 5": "\u30b5\u30a4\u30ba5", "Show Source": "HTML\u30bd\u30fc\u30b9\u8868\u793a", "Size 4": "\u30b5\u30a4\u30ba4", "Justify Right": "\u53f3\u63c3\u3048", "Remove Format": "\u66f8\u5f0f\u3092\u30af\u30ea\u30a2", "Justify Center": "\u4e2d\u592e\u63c3\u3048", "Italic": "\u659c\u4f53", "Size 1": "\u30b5\u30a4\u30ba1", "Subscript": "\u4e0b\u4ed8\u304d\u6587\u5b57", "Preview": "\u30d7\u30ec\u30d3\u30e5\u30fc", "Input link URL or E-mail address": "\u30ea\u30f3\u30af\u5148URL\u307e\u305f\u306f\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044", "Bold": "\u592a\u5b57", "Unordered List": "\u7b87\u6761\u66f8\u304d", "Input image URL": "\u753b\u50cfURL\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044", "Undo": "\u5143\u306b\u623b\u3059", "Strike-Through": "\u6253\u3061\u6d88\u3057\u7dda", "Horizontal Rule": "\u6a2a\u7dda", "Superscript": "\u4e0a\u4ed8\u304d\u6587\u5b57", "Outdent": "\u5b57\u4e0b\u3052\u89e3\u9664", "Background Color": "\u80cc\u666f\u8272", "Size 7": "\u30b5\u30a4\u30ba7", "Size 6": "\u30b5\u30a4\u30ba6", "Indent": "\u5b57\u4e0b\u3052", "Size 3": "\u30b5\u30a4\u30ba3", "Size 2": "\u30b5\u30a4\u30ba2", "Insert": "\u633f\u5165", "Ordered List": "\u756a\u53f7\u4ed8\u304d\u30ea\u30b9\u30c8", "Justify Left": "\u5de6\u63c3\u3048", "Justify Full": "\u4e21\u7aef\u63c3\u3048", "Foreground Color": "\u6587\u5b57\u8272", "Unlink": "\u30ea\u30f3\u30af\u89e3\u9664", "Insert Link": "\u30ea\u30f3\u30af\u633f\u5165", "Font": "\u30d5\u30a9\u30f3\u30c8", "Redo": "\u3084\u308a\u76f4\u3057", "Underline": "\u4e0b\u7dda", "Size": "\u30b5\u30a4\u30ba"}
		};
		var current_translation_data = _getCurrentTranslationData();

		return function(text)
		{
			if(current_translation_data[text] === undefined)
			{
				return text;
			}
			return current_translation_data[text];
		};

		function _getCurrentTranslationData()
		{
			var language = _detectBrowserLanguage();
			var result = translation_data[language];
			if(result !== undefined)
			{
				return result;
			}

			// 'en-us' -> 'en'
			language = language.split('-')[0];
			result = translation_data[language];
			if(result !== undefined)
			{
				return result;
			}

			return {};
		}

		/**
		 * @see http://blog.masuidrive.jp/index.php/2008/09/19/how-to-detect-your-browser-language-from-javascript/
		 */
		function _detectBrowserLanguage()
		{
			try
			{
				var navigator = window.navigator;
				return (navigator.browserLanguage || navigator.language || navigator.userLanguage);
			}
			catch(e)
			{
				return undefined;
			}
		}
	})();

	/**
	 * validate email
	 * @function
	 * @param {String} string email
	 * @return {Boolean} OK/NG
	 */
	var checkEmail = (function()
	{
		var regexp = /^[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~](\.?[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~])*@([\w\-]+\.)+(\w+)$/;

		return function(string)
		{
			if(string.length > 256)
			{
				// length is up to 256 characters（cf. RFC 5321 4.5.3.1.3.）
				return false;
			}
			if(string.indexOf("@") > 64)
			{
				// length of local part is up to 64 characters（cf. RFC 5321 4.5.3.1.1.）
				return false;
			}
			if(string.match(regexp) == null)
			{
				return false;
			}
			return true;
		};
	})();

	/**
	 * validate URL
	 * @function
	 * @param {String} string URL
	 * @return {Boolean} OK/NG
	 */
	var checkURL = (function()
	{
		var regexp = /^https?:\/\//;

		return function(string)
		{
			if(string.match(regexp) == null)
			{
				return false;
			}
			return true;
		};
	})();

	/**
	 * Editor Component
	 * @class
	 */
	var EditorCore = (function()
	{
		var
			STATUS_NORMAL   = 0,
			STATUS_ACTIVE   = 1,
			STATUS_DISABLED = 2;

		var
			COMMAND_FONTNAME             = "fontname",
			COMMAND_FONTSIZE             = "fontsize",
			COMMAND_BOLD                 = "bold",
			COMMAND_ITALIC               = "italic",
			COMMAND_UNDERLINE            = "underline",
			COMMAND_STRIKETHROUGH        = "strikethrough",
			COMMAND_REMOVEFORMAT         = "removeformat",
			COMMAND_FORECOLOR            = "forecolor",
			COMMAND_BACKCOLOR            = "backcolor",
			COMMAND_HILITECOLOR          = "hilitecolor",
			COMMAND_SUPERSCRIPT          = "superscript",
			COMMAND_SUBSCRIPT            = "subscript",
			COMMAND_JUSTIFYLEFT          = "justifyleft",
			COMMAND_JUSTIFYCENTER        = "justifycenter",
			COMMAND_JUSTIFYRIGHT         = "justifyright",
			COMMAND_JUSTIFYFULL          = "justifyfull",
			COMMAND_INDENT               = "indent",
			COMMAND_OUTDENT              = "outdent",
			COMMAND_ORDEREDLIST          = "insertorderedlist",
			COMMAND_UNORDEREDLIST        = "insertunorderedlist",
			COMMAND_INSERTHORIZONTALRULE = "inserthorizontalrule",
			COMMAND_INSERTIMAGE          = "insertimage",
			COMMAND_CREATELINK           = "createlink",
			COMMAND_UNLINK               = "unlink",
			COMMAND_UNDO                 = "undo",
			COMMAND_REDO                 = "redo";

		return function(edit, value, style)
		{
			// init
			var contentWindow   = edit.contentWindow;
			var contentDocument = contentWindow.document;
			if(edit.contentDocument)
			{
				// if contentDocument exists, W3C compliant
				contentDocument = edit.contentDocument;
			}

			// TextRange object (selected range for IE)
			var range = null;

			// public properties
			this.STATUS_NORMAL   = STATUS_NORMAL;
			this.STATUS_ACTIVE   = STATUS_ACTIVE;
			this.STATUS_DISABLED = STATUS_DISABLED;
			this.COMMAND_FONTNAME             = COMMAND_FONTNAME;
			this.COMMAND_FONTSIZE             = COMMAND_FONTSIZE;
			this.COMMAND_BOLD                 = COMMAND_BOLD;
			this.COMMAND_ITALIC               = COMMAND_ITALIC;
			this.COMMAND_UNDERLINE            = COMMAND_UNDERLINE;
			this.COMMAND_STRIKETHROUGH        = COMMAND_STRIKETHROUGH;
			this.COMMAND_REMOVEFORMAT         = COMMAND_REMOVEFORMAT;
			this.COMMAND_FORECOLOR            = COMMAND_FORECOLOR;
			this.COMMAND_BACKCOLOR            = COMMAND_BACKCOLOR;
			this.COMMAND_SUPERSCRIPT          = COMMAND_SUPERSCRIPT;
			this.COMMAND_SUBSCRIPT            = COMMAND_SUBSCRIPT;
			this.COMMAND_JUSTIFYLEFT          = COMMAND_JUSTIFYLEFT;
			this.COMMAND_JUSTIFYCENTER        = COMMAND_JUSTIFYCENTER;
			this.COMMAND_JUSTIFYRIGHT         = COMMAND_JUSTIFYRIGHT;
			this.COMMAND_JUSTIFYFULL          = COMMAND_JUSTIFYFULL;
			this.COMMAND_INDENT               = COMMAND_INDENT;
			this.COMMAND_OUTDENT              = COMMAND_OUTDENT;
			this.COMMAND_ORDEREDLIST          = COMMAND_ORDEREDLIST;
			this.COMMAND_UNORDEREDLIST        = COMMAND_UNORDEREDLIST;
			this.COMMAND_INSERTHORIZONTALRULE = COMMAND_INSERTHORIZONTALRULE;
			this.COMMAND_INSERTIMAGE          = COMMAND_INSERTIMAGE;
			this.COMMAND_CREATELINK           = COMMAND_CREATELINK;
			this.COMMAND_UNLINK               = COMMAND_UNLINK;
			this.COMMAND_UNDO                 = COMMAND_UNDO;
			this.COMMAND_REDO                 = COMMAND_REDO;

			this.contentWindow   = contentWindow;
			this.contentDocument = contentDocument;

			// public methods
			this.getCurrentStatus = _getCurrentStatus;
			this.execCommand      = _execCommand;
			this.canExecCommand   = _canExecCommand;
			this.value            = _value;
			this.getSelectedText  = _getSelectedText;
			this.insertText       = _insertText;
			this.setFocus         = _setFocus;

			// construction
			_construct(value);

			function _construct(value)
			{
/*
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<style type="text/css">[STYLE]</style>
	</head>
	<body></body>
</html>
*/
				var iframehtml = '<!DOCTYPE html><html><head><meta charset="UTF-8" /><style type="text/css">' + style + '</style></head><body></body></html>';

//				contentDocument.body.contentEditable = true;
				contentDocument.designMode = "on";

				_setHTML(iframehtml);
				_setValue(value);
			}

			function _execCommand(commandName, parameters)
			{
				// if browser supports "hilitecolor", use it.
				if(commandName == COMMAND_BACKCOLOR && _canExecCommand(COMMAND_HILITECOLOR))
				{
					commandName = COMMAND_HILITECOLOR;
				}

				_setFocus();
				contentDocument.execCommand(commandName, false, parameters);
			}
			function _canExecCommand(commandName)
			{
				try
				{
					return contentDocument.queryCommandEnabled(commandName);
				}
				catch(e)
				{
					return false;
				}
			}

			function _value(value)
			{
				if(value === undefined)
				{
					return _getValue();
				}
				else
				{
					_setValue(value);
				}
			}

			function _getValue()
			{
				var html = contentDocument.body.innerHTML;

				// replace tags
				html = html
					.replace(/(<\/?)p\b/gi, "$1div")
					.replace(/(<\/?)em\b/gi, "$1i")
					.replace(/(<\/?)strong\b/gi, "$1b")
					.replace(/(<\/?)del\b/gi, "$1s")
					.replace(/^<br\s*\/?>$/i, "")
				;
				return html;
			}
			function _setValue(value)
			{
				contentDocument.body.innerHTML = value;
			}
			function _setHTML(html)
			{
				contentDocument.open();
				contentDocument.write(html);
				contentDocument.close();
			}

			function _getCurrentStatus()
			{
				var result = {
					fontname: null,
					fontsize: null,

					forecolor: null,
					backcolor: null,

					bold         : STATUS_NORMAL,
					italic       : STATUS_NORMAL,
					underline    : STATUS_NORMAL,
					strikethrough: STATUS_NORMAL,

					superscript: STATUS_NORMAL,
					subscript  : STATUS_NORMAL,

					justifyleft  : STATUS_NORMAL,
					justifycenter: STATUS_NORMAL,
					justifyright : STATUS_NORMAL,
					justifyfull  : STATUS_NORMAL,

					insertorderedlist  : STATUS_NORMAL,
					insertunorderedlist: STATUS_NORMAL,

					createlink: STATUS_NORMAL,
					unlink    : STATUS_NORMAL,

					undo: STATUS_NORMAL,
					redo: STATUS_NORMAL
				};
				if(_getSelectedText() == "")
				{
					result[COMMAND_CREATELINK] = STATUS_DISABLED;
					result[COMMAND_UNLINK    ] = STATUS_DISABLED;
				}
				$.each([COMMAND_CREATELINK, COMMAND_UNLINK, COMMAND_UNDO, COMMAND_REDO], function(index, value)
				{
					if(!_canExecCommand(value))
					{
						result[value] = STATUS_DISABLED;
					}
				});

				var node = _getCurrentNode();
				while(node !== null)
				{
					// check tag
					if(node.tagName !== undefined)
					{
						var tagName = node.tagName.toLowerCase();
						switch(tagName)
						{
						case "b":
						case "strong":
							result[COMMAND_BOLD] = STATUS_ACTIVE;
							break;

						case "i":
						case "em":
							result[COMMAND_ITALIC] = STATUS_ACTIVE;
							break;

						case "u":
							result[COMMAND_UNDERLINE] = STATUS_ACTIVE;
							break;

						case "s":
						case "strike":
						case "del":
							result[COMMAND_STRIKETHROUGH] = STATUS_ACTIVE;
							break;

						case "sup":
							result[COMMAND_SUPERSCRIPT] = STATUS_ACTIVE;
							break;

						case "sub":
							result[COMMAND_SUBSCRIPT] = STATUS_ACTIVE;
							break;

						case "ol":
							result[COMMAND_ORDEREDLIST] = STATUS_ACTIVE;
							break;

						case "ul":
							result[COMMAND_UNORDEREDLIST] = STATUS_ACTIVE;
							break;

						case "font":
							if(node.face.length > 0 && result[COMMAND_FONTNAME] === null)
							{
								result[COMMAND_FONTNAME] = node.face;
							}
							if(node.size.length > 0 && result[COMMAND_FONTSIZE] === null)
							{
								result[COMMAND_FONTSIZE] = node.size;
							}
							if(node.color.length > 0 && result[COMMAND_FORECOLOR] === null)
							{
								result[COMMAND_FORECOLOR] = node.color;
							}
							break;
						}
					}

					// check general attributes
					if(node.align !== undefined)
					{
						var align = node.align.toLowerCase();
						switch(align)
						{
						case "left":
							result[COMMAND_JUSTIFYLEFT] = STATUS_ACTIVE;
							break;

						case "center":
							result[COMMAND_JUSTIFYCENTER] = STATUS_ACTIVE;
							break;

						case "right":
							result[COMMAND_JUSTIFYRIGHT] = STATUS_ACTIVE;
							break;

						case "justify":
							result[COMMAND_JUSTIFYFULL] = STATUS_ACTIVE;
							break;
						}
					}

					// check CSS
					if(node.style !== undefined)
					{
						var style = node.style;
						if(style.fontFamily !== undefined)
						{
							var fontFamily = style.fontFamily;
							if(fontFamily.length > 0 && result[COMMAND_FONTNAME] === null)
							{
								result[COMMAND_FONTNAME] = fontFamily;
							}
						}

						if(style.fontWeight !== undefined)
						{
							var fontWeight = style.fontWeight.toLowerCase();
							switch(fontWeight)
							{
							case "bold":
							case "bolder":
								result[COMMAND_BOLD] = STATUS_ACTIVE;
								break;
							}
						}

						if(style.fontStyle !== undefined)
						{
							var fontStyle = style.fontStyle.toLowerCase();
							switch(fontStyle)
							{
							case "italic":
							case "oblique":
								result[COMMAND_ITALIC] = STATUS_ACTIVE;
								break;
							}
						}

						if(style.textDecoration !== undefined)
						{
							var textDecoration = style.textDecoration.toLowerCase();
							if(textDecoration.indexOf("underline") !== -1)
							{
								result[COMMAND_UNDERLINE] = STATUS_ACTIVE;
							}
							if(textDecoration.indexOf("line-through") !== -1)
							{
								result[COMMAND_STRIKETHROUGH] = STATUS_ACTIVE;
							}
						}

						if(style.color !== undefined)
						{
							var color = style.color;
							if(color.length > 0 && result[COMMAND_FORECOLOR] === null)
							{
								result[COMMAND_FORECOLOR] = color;
							}
						}

						if(style.backgroundColor !== undefined)
						{
							var color = style.backgroundColor;
							if(color.length > 0 && result[COMMAND_BACKCOLOR] === null)
							{
								result[COMMAND_BACKCOLOR] = color;
							}
						}

						if(style.verticalAlign !== undefined)
						{
							var verticalAlign = style.verticalAlign.toLowerCase();
							switch(verticalAlign)
							{
							case "super":
								result[COMMAND_SUPERSCRIPT] = STATUS_ACTIVE;
								break;

							case "sub":
								result[COMMAND_SUBSCRIPT] = STATUS_ACTIVE;
								break;
							}
						}

						// block
						if(style.textAlign !== undefined)
						{
							var textAlign = style.textAlign.toLowerCase();
							switch(textAlign)
							{
							case "left":
								result[COMMAND_JUSTIFYLEFT] = STATUS_ACTIVE;
								break;

							case "center":
								result[COMMAND_JUSTIFYCENTER] = STATUS_ACTIVE;
								break;

							case "right":
								result[COMMAND_JUSTIFYRIGHT] = STATUS_ACTIVE;
								break;

							case "justify":
								result[COMMAND_JUSTIFYFULL] = STATUS_ACTIVE;
								break;
							}
						}
					}

					node = node.parentNode;
				}

				// save selected range for IE
				if(contentDocument.selection)
				{
					range = contentDocument.selection.createRange();
				}

				return result;
			}

			function _getCurrentStyle()
			{
				var node = _getCurrentNode();
				if(node === null)
				{
					return null;
				}
				return node.currentStyle || contentDocument.defaultView.getComputedStyle(node.parentElement, "");
			}

			function _getCurrentNode()
			{
				if(contentWindow.getSelection)
				{
					return contentWindow.getSelection().anchorNode;
				}
				return contentDocument.selection.createRange().parentElement();
			}

			function _getSelectedText()
			{
				if(contentWindow.getSelection)
				{
					var selection = contentWindow.getSelection();
					if(selection === null || selection.rangeCount === 0)
					{
						return "";
					}
					return selection.getRangeAt(0).toString();
				}
				else
				{
					return contentDocument.selection.createRange().text;
				}
			}

			function _insertText(text, removeFormat)
			{
				if(contentWindow.getSelection)
				{
					var node      = contentDocument.createTextNode(text);
					var selection = contentWindow.getSelection();
					selection.deleteFromDocument();
					selection.getRangeAt(0).insertNode(node);
				}
				else
				{
					contentDocument.selection.createRange().text = text;
				}

				if(removeFormat)
				{
					_execCommand(COMMAND_REMOVEFORMAT);
				}
				else
				{
					_setFocus();
				}
			}

			function _setFocus()
			{
				contentWindow.focus();
				if(range !== null)
				{
					range.select();
				}
			}
		};
	})();

	$.fn.extend(
	{
		cazary: (function($)
		{
			// keycodes
			var
				KEYCODE_ENTER  = 13,
				KEYCODE_ESCAPE = 27;

/*
<div class="cazary">
	<!-- commands wrapper is here -->
	<iframe class="cazary-edit" src="javascript:"></iframe>
	<!-- original textarea is here -->
</div>
*/
			var CAZARY = '<div class="cazary"><iframe class="cazary-edit" src="javascript:"></iframe></div>';

			// command => name
			var ASSOC_COMMANDNAMES = {
				separator: "",

				fontname: "Font",
				fontsize: "Size",

				bold         : "Bold",
				italic       : "Italic",
				underline    : "Underline",
				strikethrough: "Strike-Through",
				removeformat : "Remove Format",

				forecolor: "Foreground Color",
				backcolor: "Background Color",

				superscript: "Superscript",
				subscript  : "Subscript",

				justifyleft  : "Justify Left",
				justifycenter: "Justify Center",
				justifyright : "Justify Right",
				justifyfull  : "Justify Full",

				indent : "Indent",
				outdent: "Outdent",

				insertorderedlist  : "Ordered List",
				insertunorderedlist: "Unordered List",

				inserthorizontalrule: "Horizontal Rule",
				insertimage         : "Insert Image",
				createlink          : "Insert Link",
				unlink              : "Unlink",

				undo: "Undo",
				redo: "Redo",

				source: "Show Source"
			};
			/* font sizes */
			var ASSOC_FONTSIZES = {
				1: "Size 1",
				2: "Size 2",
				3: "Size 3",
				4: "Size 4",
				5: "Size 5",
				6: "Size 6",
				7: "Size 7"
			};
			/* pre-defined macros */
			var PRE_DEFINED_MACROS = {
				"MINIMAL" : ["bold italic underline strikethrough removeformat"],
				"STANDARD": [
					"fontname fontsize",
					"bold italic underline strikethrough removeformat | forecolor backcolor | superscript subscript",
					"source"
				],
				"FULL": [
					"fontname fontsize",
					"bold italic underline strikethrough removeformat | forecolor backcolor | superscript subscript",
					"justifyleft justifycenter justifyright justifyfull | indent outdent | insertorderedlist insertunorderedlist",
					"inserthorizontalrule insertimage createlink unlink",
					"undo redo",
					"source"
				]
			};

			$(function($)
			{
				// window events
				$(document)
					.bind("click", function()
					{
						destroyAllPanels();
					})
					.bind("keydown", function(event)
					{
						if(event.keyCode === KEYCODE_ESCAPE)
						{
							destroyAllPanels();
						}
					});
			});

			return function(options)
			{
				options = $.extend(
					{
						mode: "rte",
						style: "body{margin:0px;padding:8px;}p{margin:0px;padding:0px;}",
						fontnames: [
							"sans-serif", "serif", "cursive", "fantasy", "monospace",
							"Arial", "Arial Black", "Comic Sans MS", "Courier New", "Narrow", "Garamond",
							"Georgia", "Impact", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"
						],
						colors: [
                    		["#ffffff", "#ffcccc", "#ffcc99", "#ffff99", "#ffffcc", "#99ff99", "#99ffff", "#ccffff", "#ccccff", "#ffccff"],
                    		["#cccccc", "#ff6666", "#ff9966", "#ffff66", "#ffff33", "#66ff99", "#33ffff", "#66ffff", "#9999ff", "#ff99ff"],
							["#bbbbbb", "#ff0000", "#ff9900", "#ffcc66", "#ffff00", "#33ff33", "#66cccc", "#33ccff", "#6666cc", "#cc66cc"],
							["#999999", "#cc0000", "#ff6600", "#ffcc33", "#ffcc00", "#33cc00", "#00cccc", "#3366ff", "#6633ff", "#cc33cc"],
							["#666666", "#990000", "#cc6600", "#cc9933", "#999900", "#009900", "#339999", "#3333ff", "#6600cc", "#993399"],
							["#333333", "#660000", "#993300", "#996633", "#666600", "#006600", "#336666", "#000099", "#333399", "#663366"],
							["#000000", "#330000", "#663300", "#663333", "#333300", "#003300", "#003333", "#000066", "#330099", "#330033"]
						],
						commands: "STANDARD"
					},
					options);

				return this.each(function()
				{
					var uniqueId = parseInt(Math.random() * 10000);
					var $origin = $(this);

					// Cazary object
					var $cazary = $(CAZARY).css({width: $origin.width()});
					$cazary.prepend(createCommandsWrapper(options.commands));

					// editor object
					var $cazary_edit = $cazary.find(".cazary-edit").css({height: $origin.height()});

					// source command & others
					var $cazary_command_source         = $cazary.find("ul.cazary-commands-list li.cazary-command-source");
					var $cazary_commands_except_source = $cazary.find("ul.cazary-commands-list li:not(.cazary-command-source)");

					// set objects
					$origin
						.hide()
						.before($cazary)
						.insertAfter($cazary_edit)
						.addClass("cazary-source")
					;

					var editor = new EditorCore($cazary_edit.get(0), $origin.val(), options.style);

					var commands_generic = [
						editor.COMMAND_BOLD, editor.COMMAND_ITALIC, editor.COMMAND_UNDERLINE, editor.COMMAND_STRIKETHROUGH, editor.COMMAND_REMOVEFORMAT,
						editor.COMMAND_SUPERSCRIPT, editor.COMMAND_SUBSCRIPT,
						editor.COMMAND_JUSTIFYLEFT, editor.COMMAND_JUSTIFYCENTER, editor.COMMAND_JUSTIFYRIGHT, editor.COMMAND_JUSTIFYFULL,
						editor.COMMAND_INDENT, editor.COMMAND_OUTDENT,
						editor.COMMAND_ORDEREDLIST, editor.COMMAND_UNORDEREDLIST,
						editor.COMMAND_INSERTHORIZONTALRULE, editor.COMMAND_UNLINK,
						editor.COMMAND_UNDO, editor.COMMAND_REDO
					];
					var commands_with_panel = [
						editor.COMMAND_FONTNAME, editor.COMMAND_FONTSIZE,
						editor.COMMAND_FORECOLOR, editor.COMMAND_BACKCOLOR,
						editor.COMMAND_INSERTIMAGE, editor.COMMAND_CREATELINK
					];

					if(options.mode == "html")
					{
						_setHtmlMode();
					}
					else
					{
						_setRteMode();
					}

					// editor events
					$(editor.contentDocument)
						.bind("select", function()
						{
							_updateCommandStatus();
						})
						.bind("mouseup", function()
						{
							destroyAllPanels();
							_updateCommandStatus();
						})
						.bind("keydown", function(event)
						{
							if(event.keyCode === KEYCODE_ESCAPE)
							{
								destroyAllPanels();
							}
						})
						.bind("keyup paste", function()
						{
							window.setTimeout(_updateCommandStatus, 10);
						});

					$(editor.contentWindow)
						.bind("focus", function()
						{
							destroyAllPanels();
							_updateCommandStatus();
						})
						.bind("blur", function()
						{
							// update original element when focus is out
							$origin.val(editor.value());
						});

					// cancel other handler when command is disabled
					$cazary
						.find("ul.cazary-commands-list li").bind("click", function(event)
						{
							var $target = $(this);
							if($target.hasClass("cazary-disabled"))
							{
								event.stopImmediatePropagation();
								_setFocus();
							}
						});

					// toggle RTE <-> HTML mode
					$cazary_command_source
						.bind("click", function()
						{
							_toggleMode();
							_setFocus();
						});

					// command handler
					$.each(commands_generic, function()
					{
						var commandName = this.toLowerCase();
						$cazary
							.find(".cazary-command-" + commandName).bind("click", function()
							{
								// execute command
								_execCommand(commandName);
							});
					});
					$.each(commands_with_panel, function()
					{
						var commandName = this.toLowerCase();
						$cazary
							.find(".cazary-command-" + commandName).bind("click", function()
							{
								// open panel
								var $target = $(this);
								createPanel(commandName, options, $target);
								return false;
							});
					});

					function _execCommand(commandName, parameters)
					{
						destroyAllPanels();
						editor.execCommand(commandName, parameters);
						_updateCommandStatus();
					}

					function _setRteMode()
					{
						// set HTML data to RTE
						var value = $origin.val();
						editor.value(value);

						// set visibility
						$origin.hide();
						$cazary_edit.css("display", "");

						$cazary_commands_except_source.removeClass("cazary-disabled");
						$cazary_command_source.removeClass("cazary-active");
						_updateCommandStatus();
					}

					function _setHtmlMode()
					{
						var html = editor.value();
						$origin.val(html);

						$cazary_edit.hide();
						$origin.css("display", "");

						$cazary_commands_except_source.addClass("cazary-disabled");
						$cazary_command_source.addClass("cazary-active");
					}

					function _toggleMode()
					{
						if(_isHtmlMode())
						{
							// HTML -> RTE
							_setRteMode();
						}
						else
						{
							// RTE -> HTML
							_setHtmlMode();
						}
					}

					function _isHtmlMode()
					{
						return $cazary_command_source.hasClass("cazary-active");
					}
					function _isRteMode()
					{
						return !_isHtmlMode();
					}

					/**
					 * create specified panel
					 * @param {String} commandName command name
					 * @param {Object} options     options
					 * @param {jQuery} $command    command object
					 */
					function createPanel(commandName, options, $command)
					{
						var $panel = $(".cazary-panel");
						if($panel.length > 0)
						{
							var uniqueId_panel    = $panel.data("id");
							var commandName_panel = $panel.data("command");
							destroyAllPanels();
							if(commandName_panel === commandName && uniqueId_panel === uniqueId)
							{
								_setFocus();
								return;
							}
						}

						var list = false;
						switch(commandName)
						{
						case editor.COMMAND_FONTNAME:
							$panel = createPanel_fontname(commandName, options.fontnames);
							list = true;
							break;

						case editor.COMMAND_FONTSIZE:
							$panel = createPanel_fontsize(commandName);
							list = true;
							break;

						case editor.COMMAND_FORECOLOR:
						case editor.COMMAND_BACKCOLOR:
							$panel = createPanel_color(commandName, options.colors);
							list = true;
							break;

						case editor.COMMAND_INSERTIMAGE:
							$panel = createPanel_insertimage(commandName);
							break;

						case editor.COMMAND_CREATELINK:
							$panel = createPanel_createlink(commandName);
							break;

						default:
							return null;
						}

						if(list)
						{
							// set click event to "li"
							$panel
								.find("li").bind("click", function()
								{
									// execute command
									var $target = $(this);
									var param = $target.data("param");
									_execCommand(commandName, param);
								});
						}

						// set class and position and
						var offset = $command.addClass("cazary-active").offset();
						offset.top += $command.outerHeight();
						$panel
							.addClass("cazary-panel")
							.addClass("cazary-panel-" + commandName)
							.data("id", uniqueId)
							.data("command", commandName)
							.css({
								left: offset.left + "px",
								top : offset.top  + "px"
							})
							.bind("click", function()
							{
								// stop bubbling
								return false;
							})
							.appendTo($(document.body))
							.find(":text:first")
								.trigger("focus");

						return $panel;
					}

					function createPanel_fontname(commandName, fontnames)
					{
/*
<div class="cazary-panel cazary-panel-fontname">
	<ul class="cazary-widget-select">
		<li unselectable="on" style="font-family: XXX" title="XXX" data-param="XXX">XXX</li>
		...
	</ul>
</div>
*/
						var $ul = $("<ul />").addClass("cazary-widget-select");
						$.each(fontnames, function()
						{
							var fontName = this.toString();
							var $li = $("<li />")
								.attr({
									"unselectable": "on",
									"title": fontName
								})
								.css({
									"font-family": fontName
								})
								.data("param", fontName)
								.text(fontName);

							$ul.append($li);
						});
						return $("<div>").append($ul);
					}

					function createPanel_fontsize(commandName)
					{
/*
<div class="cazary-panel cazary-panel-fontsize">
	<ul class="cazary-widget-select">
		<li unselectable="on" title="Smallest" data-param="1"><font size="1">Size 1</font></li>
		<li unselectable="on" title="Smallest" data-param="2"><font size="2">Size 2</font></li>
		<li unselectable="on" title="Smallest" data-param="3"><font size="3">Size 3</font></li>
		<li unselectable="on" title="Smallest" data-param="4"><font size="4">Size 4</font></li>
		<li unselectable="on" title="Smallest" data-param="5"><font size="5">Size 5</font></li>
		<li unselectable="on" title="Smallest" data-param="6"><font size="6">Size 6</font></li>
		<li unselectable="on" title="Smallest" data-param="7"><font size="7">Size 7</font></li>
	</ul>
</div>
*/
						var $ul = $("<ul />").addClass("cazary-widget-select");
						$.each(ASSOC_FONTSIZES, function(param, text)
						{
							var text = _(text);
							var $li = $("<li />")
								.attr({
									"unselectable": "on",
									"title": text
								})
								.data("param", param);

							var $font = $("<font />")
								.attr({
									"size": param
								})
								.text(text)

							$ul.append($li.append($font));
						});
						return $("<div>").append($ul);
					}

					function createPanel_color(commandName, colors)
					{
/*
<div class="cazary-panel cazary-panel-[COMMANDNAME]">
	<ul class="cazary-widget-select-color">
		<li unselectable="on" style="background: XXX" title="XXX" data-param="XXX">XXX</li>
		...
	</ul>
	<ul class="cazary-widget-select-color">
		<li unselectable="on" style="background: XXX" title="XXX" data-param="XXX">XXX</li>
		...
	</ul>
</div>
*/
						$panel = $("<div>");

						$.each(colors, function()
						{
							var $ul = $("<ul />").addClass("cazary-widget-select-color");
							$.each(this, function()
							{
								var colorName = this.toString();
								var $li = $("<li />")
									.attr({
										"unselectable": "on",
										"title": colorName
									})
									.css({
										"background-color": colorName
									})
									.data("param", colorName)
									.text(colorName);

								$ul.append($li);
							});
							$panel.append($ul);
						});
						return $panel;
					}

					function createPanel_insertimage(commandName)
					{
/*
<div class="cazary-panel cazary-panel-insertimage">
	<form action="#">
		<div>
			<fieldset>
				<legend>Input image URL</legend>
				<input type="url" class="cazary-widget-insertimage-url" required="required" placeholder="http://example.com/path/to/image.jpg" />
			</fieldset>
			<input type="button" class="cazary-widget-submit" value="Insert" />
		</div>
		<fieldset class="cazary-widget-preview">
			<legend>Preview</legend>
			<img class="cazary-widget-preview-insertimage" />
		</fieldset>
	</form>
</div>
*/
						$panel = $("<div>")
							.append(
								$("<form />")
									.attr("action", "#")
									.append(
										$("<div />")
											.append(
												$("<fieldset />")
													.append(
														$("<legend />")
															.text(_("Input image URL"))
													)
													.append(
														$("<input type=\"text\" />")
															.addClass("cazary-widget-insertimage-url")
															.attr({
																"required": "required",
																"placeholder": _("http://example.com/path/to/image.jpg")
															})
													)
											)
											.append(
												$("<input type=\"submit\" />")
													.addClass("cazary-widget-submit")
													.val(_("Insert"))
											)
									)
									.append(
										$("<fieldset />")
											.addClass("cazary-widget-preview")
											.append(
												$("<legend />")
													.text(_("Preview"))
											)
											.append(
											$("<img />")
												.addClass("cazary-widget-preview-insertimage")
											)
									)
								);

						$panel.find("form").bind("submit", onsubmit);
						$panel.find(".cazary-widget-submit").bind("click", onsubmit);
						$panel.find(".cazary-widget-insertimage-url").bind("keydown paste", onupdate);

						return $panel;

						function onsubmit()
						{
							var $url = $panel.find(".cazary-widget-insertimage-url");
							var  url = $url.val();
							if(!checkURL(url))
							{
								$url.trigger("focus");
								return false;
							}
							_execCommand(commandName, url);
							return false;
						}

						function onupdate()
						{
							var $url = $(this);
							window.setTimeout(function()
							{
								var dataName = "url_old";
								var url     = $url.val();
								var url_old = $url.data(dataName);
								if(url === url_old)
								{
									return;
								}
								$url.data(dataName, url);
								var $preview = $panel.find(".cazary-widget-preview");
								if(checkURL(url))
								{
									$preview.show();
									$panel
										.find(".cazary-widget-preview-insertimage")
											.attr("src", url);
								}
								else
								{
									$preview.hide();
								}
							}, 10);
						}
					}

					function createPanel_createlink(commandName)
					{
/*
<div class="cazary-panel cazary-panel-createlink">
	<form action="#">
		<div>
			<fieldset>
				<legend>Input link URL or E-mail address</legend>
				<input type="url" class="cazary-widget-createlink-url" required="required" placeholder="http://example.com/, someone@example.com" />
			</fieldset>
			<input type="button" class="cazary-widget-submit" value="Insert" />
		</div>
		<fieldset class="cazary-widget-preview">
			<legend>Preview</legend>
			<iframe class="cazary-widget-preview-createlink"></iframe>
		</fieldset>
	</form>
</div>
*/
						var $panel = $("<div>")
							.append(
								$("<form />")
									.attr("action", "#")
									.append(
										$("<div />")
											.append(
												$("<fieldset />")
													.append(
														$("<legend />")
															.text(_("Input link URL or E-mail address"))
													)
													.append(
														$("<input type=\"text\" />")
															.addClass("cazary-widget-createlink-url")
															.attr({
																"required": "required",
																"placeholder": _("http://example.com/, someone@example.com")
															})
													)
											)
											.append(
												$("<input type=\"button\" />")
													.addClass("cazary-widget-submit")
													.val(_("Insert"))
											)
									)
									.append(
										$("<fieldset />")
											.addClass("cazary-widget-preview")
											.append(
												$("<legend />")
													.text(_("Preview"))
											)
											.append(
											$("<iframe />")
												.addClass("cazary-widget-preview-createlink")
											)
									)
								);

						$panel.find("form").bind("submit", onsubmit);
						$panel.find(".cazary-widget-submit").bind("click", onsubmit);
						$panel.find(".cazary-widget-createlink-url").bind("keydown paste", onupdate);
						return $panel;

						function onsubmit()
						{
							var $url = $panel.find(".cazary-widget-createlink-url");
							var  url = $url.val();
							if(checkEmail(url))
							{
								url = "mailto:" + url;
							}
							else if(!checkURL(url))
							{
								$url.trigger("focus");
								return false;
							}
							_execCommand(commandName, url);
							return false;
						}

						function onupdate()
						{
							var $url = $(this);
							window.setTimeout(function()
							{
								var dataName = "url_old";
								var url     = $url.val();
								var url_old = $url.data(dataName);
								if(url === url_old)
								{
									return;
								}
								$url.data(dataName, url);
								var $preview = $panel.find(".cazary-widget-preview");
								if(checkURL(url))
								{
									$preview.show();
									$panel
										.find(".cazary-widget-preview-createlink")
											.attr("src", url);
								}
								else
								{
									$preview.hide();
								}
							}, 10);
						}
					}

					/**
					 * update command status
					 * when to be called:
					 * <ul>
					 *  <li>after switched to RTE mode</li>
					 *  <li>after execCommand method</li>
					 *  <li>select event to RTE object</li>
					 *  <li>click event to RTE object</li>
					 *  <li>keyup event to RTE object</li>
					 *  <li>focus event to RTE object</li>
					 * </ul>
					 */
					function _updateCommandStatus()
					{
						var status = editor.getCurrentStatus();
						for(var name in status)
						{
							var value = status[name];
							var $element = $cazary.find(".cazary-command-" + name);

							// set font name
							if(name === editor.COMMAND_FONTNAME)
							{
								var title = value;
								if(title === null)
								{
									value = "";
									title = $element.attr("title");
								}
								$element.css({"font-family": value}).text(title);
								continue;
							}

							// set font size
							if(name === editor.COMMAND_FONTSIZE)
							{
								var title = value;
								if(title === null)
								{
									value = "";
									title = $element.attr("title");
								}
								else
								{
									title = _(ASSOC_FONTSIZES[title]);
								}
								$element.text(title);
								continue;
							}

							// set font color
							if(name === editor.COMMAND_FORECOLOR || name === editor.COMMAND_BACKCOLOR)
							{
								var $command = $cazary.find(".cazary-command-" + name);
								var color = value;
								if(color === null)
								{
									$cazary.find(".cazary-command-" + name).css("background-color", "");
								}
								else
								{
									$cazary.find(".cazary-command-" + name).css("background-color", color);
								}
								continue;
							}

							if(value === editor.STATUS_ACTIVE)
							{
								$element.addClass("cazary-active");
							}
							else
							{
								$element.removeClass("cazary-active");
							}
							if(value === editor.STATUS_DISABLED)
							{
								$element.addClass("cazary-disabled");
							}
							else
							{
								$element.removeClass("cazary-disabled");
							}
						}
					}

					/**
					 * set focus to editor window
					 */
					function _setFocus()
					{
						if(_isHtmlMode())
						{
							$origin.trigger("focus");
						}
						else
						{
							editor.setFocus();
						}
					}
				});
			};

			function createCommandsWrapper(commands)
			{
/*
<div class="cazary-commands-wrapper">
	<ul class="cazary-commands-list">
		<li unselectable="on" class="cazary-command-aaa" title="AAA">AAA</li>
		...
	</ul>
	<ul class="cazary-commands-list">
		<li unselectable="on" class="cazary-command-bbb" title="BBB">BBB</li>
		...
	</ul>
	...
</div>
*/
				if(typeof(commands) === "string")
				{
					if(PRE_DEFINED_MACROS[commands] !== undefined)
					{
						commands = PRE_DEFINED_MACROS[commands];
					}
					else
					{
						commands = [commands];
					}
				}

				var $obj = $("<div />").addClass("cazary-commands-wrapper");
				$.each(commands, function()
				{
					var $ul = $("<ul />").addClass("cazary-commands-list");
					var command_list = this.toLowerCase().split(" ");
					$.each(command_list, function()
					{
						var command = this.toString();
						if(command === "|")
						{
							command = "separator";
						}

						if(ASSOC_COMMANDNAMES[command] === undefined)
						{
							return;
						}

						var text = _(ASSOC_COMMANDNAMES[command]);
						var className = "cazary-command-" + command;

						var $li = $("<li />")
							.attr({
								"unselectable": "on",
								"title": text
							})
							.addClass(className)
							.text(text);

						$ul.append($li);
					});
					$obj.append($ul);
				});
				return $obj;
			}

			/**
			 * destroy all panels
			 */
			function destroyAllPanels()
			{
				$(".cazary-panel")
					.each(function()
					{
						var commandName = $(this).data("command");
						var selector = ".cazary-command-" + commandName;
						$(selector).removeClass("cazary-active");
					})
					.remove();
			}
		})($)
	});
})(jQuery, window);
