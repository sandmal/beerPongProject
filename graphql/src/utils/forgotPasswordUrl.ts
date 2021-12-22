export const forgotPasswordUrl = (token: string) => {
  return `http://localhost:3000/user/forgot/${token}`;
};
