/**
 * Converts Clerk UserResource to app User type
 */
export const generateUser = (clerkUser) => {
  const user = {
    id: clerkUser.id,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    email: clerkUser.primaryEmailAddress?.emailAddress,
    imageUrl: clerkUser.imageUrl,
  };
  console.log("[generateUser] Generated user object:", user);
  return user;
};
