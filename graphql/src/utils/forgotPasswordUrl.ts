export const forgotPasswordUrl = (token: string): string  => {
  return `http://localhost:3000/user/forgot/${token}`;
};
