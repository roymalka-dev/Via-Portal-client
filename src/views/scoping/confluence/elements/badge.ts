const generateBadge = (
  text: string,
  backgroundColor: string,
  textColor: string
): string => {
  return `<span style="
    display: inline-block;
    padding: 2px 6px;
    border-radius: 8px;
    background-color: ${backgroundColor};
    color: ${textColor};
    font-weight: bold;
    font-size: 8px;
    text-align: center;
    opacity: 0.8;
  ">${text}</span>`;
};

export const scopingBadges = {
  mandatory: generateBadge("MANDATORY", "#FCEDEB", "#A03936"), // Light red background, dark red text
  ps: generateBadge("PS", "#FFEDD9", "#BF8D13"), // Light yellow background, dark yellow text
  upgradeTeam: generateBadge("Upgrade Team", "#E3FEF2", "#3D7054"), // Light green background, dark green text
  acsa: generateBadge("ACSA", "#E9E9FF", "#4B0082"), // Light purple background, dark purple text
  generatedWithTool: generateBadge("Generated with tool", "#E3F2FD", "#0D47A1"), // Light blue background, dark blue text
};
