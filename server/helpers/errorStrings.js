/**
 *   @fileOverview - errors strings
 *   @exports errorStrings
 * */

const errorStrings = {
  pageNotFound: 'Oops! Page not found. Looks like you entered an invalid url',
  passwordEmpty: 'Your password is required',
  passwordLength: 'Password must be minimum eight characters, with at least one letter, one number and one special character ',
  emailExists: 'Email address has already been registered',
  validFirstName: 'Firstname field cannot be empty and must be only letters',
  validLastName: 'Lastname field cannot be empty and must be only letters.',
  validEmail: 'Enter valid email with top level domain and must not be empty',
  loginFailure: 'Could not login. Email and password do not match',
};

export default errorStrings;
