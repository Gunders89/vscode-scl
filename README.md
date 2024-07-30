# README

Siemens SCL language support for Visual Studio Code.
The syntax highlighting (and most snippets) work for other IEC 61131-3 StructuredText variants as well. However, it has not been tailored to every flavor of ST.

### Good alternatives to this extension if general ST support is required
 - [Cloud-based IEC 61131-3 Development Environment](https://marketplace.visualstudio.com/items?itemName=david9991.plcc-plugin) by [david9991](https://github.com/david9991/plcc-plugin)
 - [Structured Text language Support](https://marketplace.visualstudio.com/items?itemName=Serhioromano.vscode-st) by [Serhioromano](https://github.com/Serhioromano/vscode-st)

## Download
Download this extension through Visual Studio Code (search in Extensions), or click this [link](https://marketplace.visualstudio.com/items?itemName=Gunders89.vscode-scl).

## Features

Adds syntax highlighting and snippets to SCL files in Visual Studio Code

### Snippets:
There are snippets included in this extension. To use them, type the prefixes listed below.

| Prefix    | Description               |
| ------    | ------------              |
|if         |If-clause                  |
|ife        |If-else clause             |
|iff        |If-elsif clause            |
|iffe       |If-elsif-else clause       |
|case       |Case clause                |
|for        |For-loop                   |
|while      |While-loop                 |
|repeat     |Repeat-loop                |
|nvar       |Variable declaration       |
|struct     |Struct clause              |
|arr        |Array declaration          |
|varat      |Variable AT declaration    |
|fb         |Function-block template    |
|fn         |Function template          |
|bo2\<x\>   |Convert bool to x          |
|b2\<x\>    |Convert byte to x          |
|c2\<x\>    |Convert char to x          |
|d2\<x\>    |Convert date to x          |
|di2\<x\>   |Convert dint to x          |
|dw2\<x\>   |Convert dword to x         |
|i2\<x\>    |Convert int to x           |
|r2\<x\>    |Convert real to x          |
|s2\<x\>    |Convert string to x        |
|t2\<x\>    |Convert time to x          |
|tod2\<x\>  |Convert time of day to x   |
|w2\<x\>    |Convert word to x          |
|db2\<x\>   |Convert block DB to x      |
|bcd2\<x\>  |Convert bcd to x           |
|ws2\<x\>   |Convert wstring to x       |


In addition a lot of the S7_xx-attributes has been added as snippets, with descriptions. Most likely some are still missing. Let me know if you are missing some, or if you find any misspellings.


## Contributions

Contributions are greatly appreciated. Please fork this repository and open a pull request to add snippets, make grammar changes, etc.

