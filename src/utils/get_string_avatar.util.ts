const colors = ["#303633", "#8be8cb", "#7EA2AA", "#888DA7", "#9C7A97", "#A3333D"];

const stringToColor = (string: string) => {
  const initial = string.toUpperCase().charCodeAt(0);
  const colorIndex = Math.round((initial - 65) / 5);

  return colors[colorIndex];
};

export const getStringAvatar = (name: string) => {
  if (name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.charAt(0)}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor("No name"),
      },
      children: `${"No name".charAt(0)}`,
    };
  }
};
