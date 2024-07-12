export const generateInitials = (name: string) => {
  if (name === "Unassigned") {
    return "";
  }
  const nameParts = name.trim().split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  const initials = nameParts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase());
  return initials.join("");
};

export const generateColorFromName = (name: string) => {
  if (name === "Unassigned") {
    return "gray";
  }
  const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "pink",
    "brown",
    "teal",
    "indigo",
  ];

  const lastName = name?.split(" ").pop();
  if (!lastName) {
    return colors[0]; // Default to the first color if the name is empty
  }

  // Simple hash function: sum the char codes of the last word
  const nameHash = lastName
    ?.split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Use the sum to pick a color
  return colors[nameHash % colors.length];
};
