const validateEmail = (email: string): boolean => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const validateUsername = (username: string): boolean => {
  // Regular expression for username validation
  const usernameRegex = /^(?!_)[A-Za-z_]{4,40}$/;

  return usernameRegex.test(username);
};

const validatePassword = (password: string): boolean => {
  // Regular expression for password validation
  const passwordRegex = /^.{6,40}$/;

  return passwordRegex.test(password);
};


export { validateEmail, validateUsername, validatePassword }; 