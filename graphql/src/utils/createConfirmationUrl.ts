export const createConfirmationUrl = (confirmToken: string): string  => {
  return `http://localhost:3000/user/confirm/${confirmToken}`;
};
