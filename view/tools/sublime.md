# sublime

### 更改图标
> 查看简介，拖动图片到图标处，出现绿色加号放开拖动

### Preferences.sublime-setting --- User
```json
{
	"auto_complete_triggers":
	[
		{
			"characters": "abcdefghijklmnopqrstuvwxyz< :.",
			"selector": "text.wxml"
		}
	],
	"color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme",
	"expand_tabs_on_save": true,
	"font_size": 14,
	"highlight_line": true,
	"ignored_packages":
	[
		"Vintage"
	],
	"line_padding_bottom": 1,
	"line_padding_top": 1,
	"margin": 8,
	"tab_size": 2,
	"theme": "Default.sublime-theme",
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true
}
```

### List Packages
- A File icon
- Babel
- BrackerHighlighter
- Color Higlighter
- DocBlocker
- Dracula Color Scheme
- Emmet
- GitGutter
- JavaScript & NodeJS Snippets
- JavaScript Completions
- LESS
- Node Completions
- Nodejs
- ReactJS
- SASS
- Subime wxapp
- SublimeLinter
    ```json
    {
        "styles": [
            {
            "icon": "bookmark",
            "mark_style": "fill"
            }
        ],
        "linters": {
            "eslint": {
            "selector": "text.html.vue, source.js - meta.attribute-with-value"
            }
        }
    }
    ```
- SublimeLinter-eslint
- Terminal
- Vue Syntax Highlighter