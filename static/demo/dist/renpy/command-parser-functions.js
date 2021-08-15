function jump(ctx) {
  ctx.command.commandType = "jump";
  ctx.currentLine++;
}
function choice(ctx) {
  const {line, command} = ctx;
  if (!line.branch || line.branch.length < 2) {
    ctx.parserContext.error(line.line, `Choice menu needs to have at least one option`);
  }
  const prompt = line.branch[0];
  const choices = line.branch.slice(1);
  const prompts = choices.map((choice2, index) => {
    if (!choice2.branch) {
      ctx.parserContext.error(choice2.line, `Choice option doesn't have any branch to go to (${choice2.code})`);
    }
    return parseChoiceOption(ctx, choice2, index);
  });
  command.options = {
    prompt: ctx.processCommandsFunction(ctx.parserContext, [prompt], line)[0],
    choices: prompts
  };
  command.commandType = "choice";
  ctx.currentLine++;
}
function set(ctx) {
  ctx.command.commandType = "set";
  ctx.currentLine++;
}
function talk(ctx) {
  const {command, line} = ctx;
  command.commandType = "talk";
  if (command.args.length < 3) {
    ctx.parserContext.error(line.line, `Talk command needs 3 arguments!`);
  }
  ctx.currentLine++;
}
function ifCommand(ctx) {
  const {command, lines, currentLine, line} = ctx;
  command.commandType = "if";
  let failure;
  const nextLine = getLine(lines, currentLine + 1);
  if (nextLine && nextLine.operator === "else") {
    failure = ctx.processCommandsFunction(ctx.parserContext, nextLine.branch, line);
    ctx.currentLine++;
  }
  command.options = {
    condition: command.args[0],
    success: ctx.processCommandsFunction(ctx.parserContext, line.branch, line),
    failure
  };
  ctx.currentLine++;
}
function setScreen(ctx) {
  const {command} = ctx;
  command.commandType = "set_screen";
  command.options = {
    screen: command.args[0]
  };
  ctx.currentLine++;
}
function setButton(ctx) {
  const {command, line} = ctx;
  command.commandType = "set_button";
  if (command.args.length !== 2) {
    ctx.parserContext.error(line.line, `set_button command should have 2 arguments`);
  }
  ctx.currentLine++;
}
function clearDialog(ctx) {
  const {command} = ctx;
  command.commandType = "clear_dialog";
  ctx.currentLine++;
}
function play(ctx) {
  const {command} = ctx;
  command.commandType = "play";
  command.options = {
    mode: command.args[0],
    audio: command.args[1]
  };
  ctx.currentLine++;
}
function wait(ctx) {
  const {command} = ctx;
  command.commandType = "wait";
  command.options = {
    duration: parseInt(command.args[0], 10)
  };
  ctx.currentLine++;
}
function text(ctx) {
  const {command, line} = ctx;
  command.commandType = "text";
  command.options = {
    text: line.operator
  };
  ctx.currentLine++;
}
export const parserFunctions = {
  jump,
  choice,
  set,
  talk,
  if: ifCommand,
  set_screen: setScreen,
  set_button: setButton,
  clear_dialog: clearDialog,
  play,
  wait,
  text
};
function getLine(lines, index) {
  if (index < lines.length)
    return lines[index];
}
function parseChoiceOption(ctx, choice2, index) {
  let choiceText = choice2.operator;
  let condition;
  let skillCheck;
  if (choice2.operator === "skillcheck") {
    if (choice2.args.length < 4) {
      ctx.parserContext.error(choice2.line, `Skillchecks need 4 arguments!`);
    }
    choiceText = choice2.args[3];
    const successBranch = choice2.branch[0];
    const failureBranch = choice2.branch[1];
    const success = {
      text: successBranch.args[0],
      branch: ctx.processCommandsFunction(ctx.parserContext, successBranch.branch, choice2)
    };
    let failedBranch;
    if (failureBranch.branch) {
      failedBranch = ctx.processCommandsFunction(ctx.parserContext, failureBranch.branch, choice2);
    }
    const failure = {
      text: failureBranch.args[0],
      branch: failedBranch
    };
    skillCheck = {
      id: choice2.args[0],
      skill: choice2.args[1],
      value: choice2.args[2],
      success,
      failure
    };
  }
  if (choice2.args[0] === "if") {
    condition = choice2.args[1];
  }
  return {
    choice: choiceText,
    condition,
    skillCheck,
    branch: ctx.processCommandsFunction(ctx.parserContext, choice2.branch, choice2),
    index
  };
}
