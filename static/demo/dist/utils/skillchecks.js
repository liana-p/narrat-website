export function createSkillCheckState() {
  const skillCheck = {
    passed: false,
    available: true
  };
  return skillCheck;
}
export function getSkillCheckState(ctx, skillCheckId) {
  let skillCheck = ctx.state.skillChecks[skillCheckId];
  if (!skillCheck) {
    skillCheck = createSkillCheckState();
    ctx.commit("setupSkillCheck", {
      skillCheck,
      skillCheckId
    });
  }
  return skillCheck;
}
