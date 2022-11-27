

const validateRegistrationForm = (form) => {
  const errors = [];

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!form.email) errors.push('Blank email');
  else if (!form.email.value.match(validRegex)) errors.push('Invalid email');

  if (!form.username) errors.push('Blank username');
  else if (!validateUsername(form.username)) errors.push('Invalid username');

  if (!form.password) errors.push('Blank password');
  else if (!validatePassword(form.password)) errors.push('Password too short: 6 characters is the minimal length.');

  return errors;
}

const validateLoginForm = (form) => {
  const errors = {};

  if (!form.username) errors.username = 'BLANK_USERNAME';
  else if (!validateUsername(form.username)) errors.username = 'INCORRECT_USERNAME';

  if (!form.password) errors.password = 'BLANK_PASSWORD';

  return errors;
}

const validateUsername = (username) => {
  return /^[a-zA-Z][a-zA-Z\d_]{3,19}$/.test(username) && !/__/.test(username);
};

const validatePassword = (password) => {
  return password.length >= 6;
}

export { validateRegistrationForm, validateLoginForm };
