import {timeout} from "../utils/promises.js";
import {
  processSkillCheck,
  runCondition,
  runConditionCommand
} from "../renpy/renpy-helpers.js";
import {getConfig} from "../config.js";
import {getSkillCheckState} from "../utils/skillchecks.js";
import {changeMusic, playSound} from "../utils/audio-loader.js";
export async function runLine(context) {
  const cmd = context.getters.currentLine;
  await runCommand(context, cmd);
}
export async function runCommand(context, cmd, choices) {
  const {state, commit, dispatch} = context;
  switch (cmd.commandType) {
    case "jump":
      const branch = cmd.args[0];
      const newStack = {
        branch: state.machine.script[branch],
        currentIndex: 0
      };
      commit("setStack", newStack);
      await dispatch("runLine");
      break;
    case "text":
      await textCommand(commit, {
        speaker: "game",
        text: cmd.options.text,
        choices,
        interactive: true
      });
      break;
    case "set":
      const key = cmd.args[0];
      const value = cmd.args[1];
      commit("setData", {path: key, value});
      return dispatch("nextLine");
    case "if":
      const newBranch = runConditionCommand(context, cmd);
      if (newBranch) {
        const newStack2 = {
          branch: newBranch,
          currentIndex: 0
        };
        commit("addStack", newStack2);
        return dispatch("runLine");
      }
      return dispatch("nextLine");
    case "talk":
      await textCommand(commit, {
        speaker: cmd.args[0],
        pose: cmd.args[1],
        text: `"${cmd.args[2]}"`,
        choices,
        interactive: true
      });
      break;
    case "choice":
      await runChoice(context, cmd);
      break;
    case "set_screen":
      commit("setScreen", cmd.options.screen);
      return dispatch("nextLine");
    case "clear_dialog":
      commit("clearDialog");
      return dispatch("nextLine");
    case "set_button":
      console.log(cmd.args);
      commit("changeButton", {
        button: cmd.args[0],
        enabled: cmd.args[1]
      });
      return dispatch("nextLine");
    case "play":
      const options = cmd.options;
      if (options.mode === "music") {
        changeMusic(context, options.audio);
      } else {
        playSound(context.commit, options.audio);
      }
      return dispatch("nextLine");
    case "wait":
      await timeout(cmd.options.duration);
      return dispatch("nextLine");
    default:
      break;
  }
}
export async function playerAnswered(context, choiceIndex) {
  const {commit, dispatch} = context;
  const cmd = context.getters.currentLine;
  switch (cmd.commandType) {
    case "choice":
      const options = cmd.options;
      const choice = options.choices[choiceIndex];
      let playerText = choice.choice;
      let newBranch;
      const skillcheck = choice.skillCheck;
      if (skillcheck) {
        const skillCheckState = getSkillCheckState(context, choice.skillCheck.id);
        if (skillCheckState.passed) {
          newBranch = skillcheck.success.branch;
          playerText = skillcheck.success.text;
        } else {
          const result = processSkillCheck(context, skillcheck);
          const winner = result ? skillcheck.success : skillcheck.failure;
          newBranch = winner.branch;
          playerText = `[${result ? "SUCCESS" : "FAILURE"}] – ${winner.text}`;
        }
      } else {
        newBranch = choice.branch;
      }
      const dialog = {
        speaker: "player",
        text: playerText,
        interactive: true
      };
      commit("addDialog", {dialog});
      if (newBranch) {
        const newStack = {
          currentIndex: 0,
          branch: newBranch
        };
        commit("addStack", newStack);
        dispatch("runLine");
      } else {
        dispatch("nextLine");
      }
      break;
    default:
      dispatch("nextLine");
  }
}
export async function runChoice(context, cmd) {
  const options = cmd.options;
  const prompt = options.prompt;
  const choices = options.choices.filter((choice) => {
    if (choice.condition) {
      return runCondition(context, choice.condition);
    }
    return true;
  }).map((choice) => {
    let text = choice.choice;
    let choiceAllowed = true;
    if (choice.skillCheck) {
      const config = getConfig();
      const skill = config.skills[choice.skillCheck.skill];
      const skillCheckState = getSkillCheckState(context, choice.skillCheck.id);
      if (!skillCheckState.available) {
        choiceAllowed = false;
        text = `[${skill.name} - Failed] ${text}`;
      } else if (!skillCheckState.passed) {
        text = `[${skill.name} - Medium] ${text}`;
      }
    }
    const result = {
      choice: text,
      originalIndex: choice.index,
      allowed: choiceAllowed
    };
    return result;
  });
  runCommand(context, prompt, choices);
}
export async function textCommand(commit, dialog) {
  commit("addDialog", {
    dialog
  });
}
export async function nextLine({
  state,
  getters,
  dispatch,
  commit
}) {
  if (state.machine.stack.length === 0) {
    finishGame(commit);
    return;
  }
  const machineHead = getters.machineHead;
  if (machineHead.currentIndex < machineHead.branch.length - 1) {
    commit("nextLine");
  } else {
    commit("previousStack");
    return dispatch("nextLine");
  }
  if (state.machine.stack.length === 0) {
    finishGame(commit);
  } else {
    return dispatch("runLine");
  }
}
export function finishGame(commit) {
  commit("addDialog", {
    dialog: {
      speaker: "game",
      text: "You can interact with the screen on the left"
    }
  });
}
