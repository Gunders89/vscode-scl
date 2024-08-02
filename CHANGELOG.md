# Change Log
All notable changes to the "scl" extension will be documented in this file.

## [Latest]
Mostly additions from Sikilde
- Added support for escaping strings with both `$` and `\`
- Fixed function block support
- Added data_block support
- Added datatypes ton_time, tof_time, tp_time and iec_timer
- Added recognition of local variables starting with `#`
- Added recognition of variable in declaration 
- Added .db file extension support

## [0.1.1]
- Reverted "fix for a bug where escaped singel qoute in string broke the string highlighting"

## [0.1.0]
- Merged sikilde's fix for a bug where escaped singel qoute in string broke the string highlighting
- Merged sikilde's milty language comment block pattern
- Merged jbradshaw14's fix for timers and local variables
- Added TcPOU and TcGVL (TwinCAT) file extensions to allow for syntax highlighting of the ST in the files (does not support the xml-wrapper)
- Added updates to readme

## [0.0.21]
- Merged highlighting fix of region names

## [0.0.20]
- Added missing system attributes

## [0.0.19]
- Merged pull requests with snippets for more conversions
- Merged pull requests with snippets for region

## [0.0.10]
- Bugfix wstring_to_sint

## [0.0.9]
- wstring conversions added (by d-ani)

## [0.0.8]
- Added Class A conversions to snippets and highlighting

## [0.0.7]
- Fixed version number discrepancy between changelog and actual version number

## [0.0.6]
- Reduced complexity of how functions are recognized
- Fixed a bug where function names would be tokenized as function type

## [0.0.5]
- This version was skipped (the version number was altered before publish)

## [0.0.4]
- Added icon

## [0.0.3]
- Added snippets for type conversion
- Edited highlighting of quoted function calls (ignore whitespace)

## [0.0.2]
- Added uint to syntax
- Edited regex for recognizing time constants
- Added indent patterns
- Block comment can now be applied by pressing <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd>

## [0.0.1]
- Initial release