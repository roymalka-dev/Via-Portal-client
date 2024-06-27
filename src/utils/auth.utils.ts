export const verifyAuthority = (page: string, user: string[]) => {
  if (!user) return false;
  if (user?.includes("ADMIN")) {
    return true;
  }

  return user.includes(page);
};
