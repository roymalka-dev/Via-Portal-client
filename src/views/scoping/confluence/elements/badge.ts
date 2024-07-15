const generateBadge = (text: string, color: string): string => {
  return `<ac:structured-macro ac:name="status">
            <ac:parameter ac:name="title">${text}</ac:parameter>
            <ac:parameter ac:name="colour">${color}</ac:parameter>
          </ac:structured-macro>`;
};

export const scopingBadges = {
  mandatory: generateBadge("MANDATORY", "Red"),
  ps: generateBadge("PS", "Yellow"),
  upgradeTeam: generateBadge("Upgrade Team", "Green"),
  acsa: generateBadge("ACSA", "Purple"),
  generatedWithTool: generateBadge("Generated with tool", "Blue"),
};
