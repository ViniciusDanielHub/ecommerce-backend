export function sanitizeUser(user: any) {
  const { password, refreshToken, ...cleanedUser } = user;
  return cleanedUser;
}