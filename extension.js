const vscode = require("vscode");

const blockPairs = {
  "ORGANIZATION_BLOCK": "END_ORGANIZATION_BLOCK",
  "FUNCTION": "END_FUNCTION",
  "FUNCTION_BLOCK": "END_FUNCTION_BLOCK",
  "DATA_BLOCK": "END_DATA_BLOCK",
};

const docStructCache = new WeakMap();

function isBlockKeyword(keyword) {
  if (blockPairs[keyword]) return true;

  for (const blockStartKeyword in blockPairs)
    if (blockPairs[blockStartKeyword] === keyword) return true;

  return false;
}

function isWordCharacter(character) {
  return typeof character === "string" && /[A-Za-z_]/.test(character);
}

function skipQuotedText(text, index) {
  const quote = text[index++];

  while (index < text.length) {
    if (text[index] === "\\" || text[index] === "$") {
      index += 2;
      continue;
    }

    if (text[index++] === quote) return index;
  }

  return index;
}

function getBlockTokens(document) {
  const text = document.getText();
  const tokens = [];
  let index = 0;

  while (index < text.length) {
    if (text.startsWith("//", index)) {
      const lineEnd = text.indexOf("\n", index + 2);

      index = lineEnd < 0 ? text.length : lineEnd + 1;
      continue;
    }

    let blockCommentClosingText;

    if (text.startsWith("(*", index)) blockCommentClosingText = "*)";
    else if (text.startsWith("(/*", index)) blockCommentClosingText = "*/)";

    if (blockCommentClosingText) {
      const commentEndIndex = text.indexOf(blockCommentClosingText, index + 2);

      index =
        commentEndIndex < 0
          ? text.length
          : commentEndIndex + blockCommentClosingText.length;
      continue;
    }

    if (text[index] === "'" || text[index] === '"') {
      index = skipQuotedText(text, index);
      continue;
    }

    if (!isWordCharacter(text[index])) {
      ++index;
      continue;
    }

    const startOffset = index;

    while (isWordCharacter(text[index])) ++index;

    const keyword = text.slice(startOffset, index).toUpperCase();

    if (!isBlockKeyword(keyword)) continue;

    tokens.push({
      keyword,
      range: new vscode.Range(
        document.positionAt(startOffset),
        document.positionAt(index),
      ),
    });
  }

  return tokens;
}

function getMatchingTokenIndexes(tokens) {
  const blockStartTokenIndexes = [];
  const matchingTokenIndexes = new Map();

  for (let index = 0; index < tokens.length; ++index) {
    const token = tokens[index];

    if (blockPairs[token.keyword]) {
      blockStartTokenIndexes.push(index);
      continue;
    }

    const blockStartTokenIndex =
      blockStartTokenIndexes[blockStartTokenIndexes.length - 1];

    if (blockStartTokenIndex === undefined) continue;
    if (blockPairs[tokens[blockStartTokenIndex].keyword] !== token.keyword)
      continue;

    blockStartTokenIndexes.pop();
    matchingTokenIndexes.set(blockStartTokenIndex, index);
    matchingTokenIndexes.set(index, blockStartTokenIndex);
  }

  return matchingTokenIndexes;
}

function getDocumentStructure(document) {
  const cachedStructure = docStructCache.get(document);

  if (cachedStructure && cachedStructure.version === document.version)
    return cachedStructure;

  const tokens = getBlockTokens(document);
  const structure = {
    version: document.version,
    tokens,
    matchingTokenIndexes: getMatchingTokenIndexes(tokens),
  };

  docStructCache.set(document, structure);
  return structure;
}

function activate(context) {
  const provider = vscode.languages.registerDocumentHighlightProvider(
    { language: "siemensscl" },
    {
      provideDocumentHighlights(document, position) {
        const wordRange = document.getWordRangeAtPosition(
          position,
          /[A-Za-z_]+/,
        );

        if (!wordRange) return [];

        const selectedWord = document.getText(wordRange).toUpperCase();

        if (!isBlockKeyword(selectedWord)) return [];

        const { tokens, matchingTokenIndexes } = getDocumentStructure(document);

        const selectedTokenIndex = tokens.findIndex((token) =>
          token.range.contains(position),
        );

        if (selectedTokenIndex < 0) return [];

        const matchingTokenIndex = matchingTokenIndexes.get(selectedTokenIndex);

        if (matchingTokenIndex === undefined) return [];

        return [
          new vscode.DocumentHighlight(
            tokens[selectedTokenIndex].range,
            vscode.DocumentHighlightKind.Read,
          ),
          new vscode.DocumentHighlight(
            tokens[matchingTokenIndex].range,
            vscode.DocumentHighlightKind.Read,
          ),
        ];
      },
    },
  );

  context.subscriptions.push(provider);
}

module.exports = {
  activate,
};
