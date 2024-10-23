## Features
* Snippets for pronouns and patrols
* Preview and autocomplete for patrol art
* JSON Schema for thoughts, patrols, and shortevents

## Requirements
* vscode >= 1.93.0

## Known Issues
* No suggestions for items that are validated using regex
* Regex patterns don't check the data that's in the pattern (e.g. `SKILL,1` doesn't check `SKILL` is a valid skill)
* May complain over valid inputs (please raise an issue if this happens!)

## Release Notes
### [v1.0.0-beta.1 - 2024-10-22]
#### Added
* Snippets for pronouns and patrols
* Preview and autocomplete for patrol art
* JSON Schemas for thoughts, patrols, and shortevents

---
## Acknowledgements
* The JSON schema, its property descriptions, and the `resource-snippets.json` templates are based on documentation from the [Clangen GitHub Wiki](https://github.com/ClanGenOfficial/clangen/wiki).

---
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
