export const getTimestampForToast = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Day of the week
    year: "numeric", // Year
    month: "long", // Month
    day: "2-digit", // Day
    hour: "2-digit", // Hour
    minute: "2-digit", // Minute
    hour12: true, // 12-hour format
  };
  const now = new Date();

  return now.toLocaleString("en-US", options);
};

export const generateStrongPassword = (lenght: number = 16): string => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
  const passwordArray = new Uint8Array(lenght);
  window.crypto.getRandomValues(passwordArray);

  return Array.from(passwordArray)
    .map((byte) => charset[byte % charset.length])
    .join("");
};
