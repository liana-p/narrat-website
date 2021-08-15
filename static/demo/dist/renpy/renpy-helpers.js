import {getConfig} from "../config.js";
import {getSkillCheckState} from "../utils/skillchecks.js";
export function processSkillCheck(ctx, skillcheck) {
  return runSkillCheck(ctx, {
    skill: skillcheck.skill,
    value: skillcheck.value,
    id: skillcheck.id
  });
}
export function runSkillCheck(ctx, params) {
  const {state} = ctx;
  let roll = Math.floor(Math.random() * 100);
  roll += state.skills[params.skill].level * 10;
  const config = getConfig();
  const skill = config.skills[params.skill];
  if (roll >= params.value) {
    ctx.commit("passSkillCheck", params.id);
    writeText(ctx, `[${skill.name} - Success]`);
    return true;
  }
  ctx.commit("failSkillCheck", params.id);
  writeText(ctx, `[${skill.name} - Failure]`);
  return false;
}
export function runConditionCommand(ctx, command) {
  const options = command.options;
  const result = runCondition(ctx, options.condition);
  console.log(result);
  if (result) {
    return options.success;
  }
  if (!result && options.failure) {
    return options.failure;
  }
  return void 0;
}
export function writeText(ctx, text) {
  const dialog = {
    speaker: "game",
    text,
    interactive: false
  };
  ctx.commit("addDialog", {
    dialog
  });
}
export function runCondition(ctx, condition) {
  return conditionFunction(ctx, condition);
}
function conditionFunction(ctx, condition) {
  const {state} = ctx;
  const context = {
    data: state.machine.data,
    skills: state.skills,
    skillCheck: (checkId, skill, value) => {
      const skillCheckState = getSkillCheckState(ctx, checkId);
      if (skillCheckState) {
        if (skillCheckState.passed) {
          return true;
        }
        if (!skillCheckState.available) {
          return false;
        }
      }
      return runSkillCheck(ctx, {
        skill,
        value,
        id: checkId
      });
    }
  };
  return evalInContext(`(${condition})`, context);
}
function evalInContext(script, context) {
  return function() {
    return eval(script);
  }.call(context);
}
