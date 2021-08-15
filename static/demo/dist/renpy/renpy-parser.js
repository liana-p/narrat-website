import {
  parserFunctions
} from "./command-parser-functions.js";
const INDENT_SIZE = 4;
export function parseRenpyScript(errorHandler, code, fileName) {
  const ctx = {
    fileName,
    error: (line, text) => errorHandler(ctx, line, text),
    processCommandsFunction: processRenpyCommands
  };
  const lines = findRenpyLines(ctx, code);
  const script = {};
  for (const line of lines) {
    if (line.code.search(":") === -1) {
      ctx.error(line.line, `First indentation level should only be used to specify labels`);
    }
    const labelName = line.code.replace(":", "");
    if (!line.branch) {
      ctx.error(line.line, `This line should have a branch but doesn't`);
    }
    script[labelName] = processRenpyCommands(ctx, line.branch, void 0);
  }
  return script;
}
function processRenpyCommands(ctx, lines, parentLine) {
  const branchContext = {
    processCommandsFunction: processRenpyCommands,
    parserContext: ctx,
    lines,
    currentLine: 0
  };
  const branch = [];
  if (!lines) {
    let lineNumber = 0;
    if (parentLine) {
      lineNumber = parentLine.line;
    }
    ctx.error(lineNumber, `Processing of command failed because the current branch has no lines inside`);
    return void 0;
  }
  while (branchContext.currentLine < lines.length) {
    const line = lines[branchContext.currentLine];
    const operator = line.operator;
    const args = line.args;
    const command = {
      code: line.code,
      operator,
      args
    };
    branchContext.line = line;
    branchContext.command = command;
    let parseFunction = parserFunctions[operator];
    if (!parseFunction) {
      parseFunction = parserFunctions.text;
    }
    parseFunction(branchContext);
    branch.push(command);
  }
  return branch;
}
function parseValue(value) {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else if (!isNaN(Number(value))) {
    return Number(value);
  } else if (value.charAt(0) === '"') {
    return value.substr(1, value.length - 2);
  } else {
    return value;
  }
}
function parseCodeLine(codeToProcess) {
  if (codeToProcess.charAt(codeToProcess.length - 1) === ":") {
    codeToProcess = codeToProcess.substr(0, codeToProcess.length - 1);
  }
  let code = codeToProcess;
  let ifWords = [];
  const ifIndex = codeToProcess.search(/\$if/g);
  if (ifIndex !== -1) {
    code = codeToProcess.substr(0, ifIndex);
    ifWords = ["if", codeToProcess.substr(ifIndex + 3)];
  }
  const regex = /(["'])(?:\\\1|.)*?\1/g;
  const matches = [];
  let match;
  while ((match = regex.exec(code)) != null) {
    matches.push(match);
  }
  let currentIndex = 0;
  let words = [];
  for (const match2 of matches) {
    const index = match2.index;
    if (index > currentIndex) {
      const inBetween = code.substr(currentIndex, index - currentIndex);
      const newWords2 = inBetween.split(" ").filter((word) => word);
      words = [...words, ...newWords2];
    }
    const finalMatch = match2[0].replace(/\\/g, "");
    words.push(finalMatch);
    currentIndex = index + match2[0].length;
  }
  const newWords = code.substr(currentIndex).split(" ").filter((code2) => code2);
  words = [...words, ...newWords, ...ifWords];
  words.forEach((word, index) => words[index] = parseValue(word));
  return words;
}
function findRenpyLines(ctx, data) {
  const code = data.split(/[\r\n]/).map((line) => {
    const commentIndex = line.search(/ *\/\//g);
    if (commentIndex !== -1) {
      return line.substr(0, commentIndex);
    }
    return line;
  });
  const lines = findRenpyBranches(ctx, code, 0, 0);
  return lines.lines;
}
function findRenpyBranches(ctx, code, startLine, indentLevel) {
  let stillInBranch = true;
  let currentLine = startLine;
  const lines = [];
  while (stillInBranch) {
    if (currentLine >= code.length) {
      break;
    }
    let lineText = code[currentLine];
    if (lineText.search(/^\s*$/) !== -1) {
      currentLine++;
    } else {
      const lineIndent = getIndentLevel(lineText);
      lineText = lineText.substr(lineIndent * 4);
      validateIndent(ctx, lineIndent, currentLine);
      if (lineIndent < indentLevel) {
        stillInBranch = false;
      } else if (lineIndent > indentLevel) {
        if (lines.length === 0 || lineIndent - indentLevel !== 1) {
          ctx.error(currentLine, `Wrong double indentation`);
        }
        const branchLines = findRenpyBranches(ctx, code, currentLine, lineIndent);
        lines[lines.length - 1].branch = branchLines.lines;
        currentLine = branchLines.endLine;
      } else {
        const words = parseCodeLine(lineText);
        const line = {
          code: lineText,
          indentation: lineIndent,
          line: currentLine,
          operator: words[0],
          args: words.slice(1)
        };
        lines.push(line);
        currentLine++;
      }
    }
  }
  return {
    lines,
    endLine: currentLine
  };
}
function validateIndent(ctx, indentLevel, currentIndex) {
  if (indentLevel % 1 !== 0) {
    ctx.error(currentIndex, `Indentation level of ${indentLevel} incorrect`);
  }
}
function getIndentLevel(line) {
  return line.search(/[^ ]/) / INDENT_SIZE;
}
