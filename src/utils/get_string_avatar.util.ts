const colors = ["#303633", "#8be8cb", "#7EA2AA", "#888DA7", "#9C7A97", "#A3333D"];

const stringToColor = (string: string) => {
  const initial = string.toUpperCase().charCodeAt(0);
  const colorIndex = Math.round((initial - 65) / 5);

  return colors[colorIndex];
};

export const getStringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
  };
};
