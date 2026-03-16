export const formatRuntime = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (minutes === 0) return `${hours} Hours`;
  return `${hours} Hours ${minutes} Mins`;
};

export const formatReleaseDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
