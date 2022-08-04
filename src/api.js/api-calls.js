import {
  SIGN_IN_ENDPOINT,
  REGISTER_ENDPOINT,
  PASSWORD_CHANGE_ENDPOINT,
} from './api-enpoints';

const loginOrRegisterApiCall = async (
  enteredEmail,
  enteredPassword,
  isLogin
) => {
  let url = '';
  if (isLogin) {
    url = SIGN_IN_ENDPOINT;
  } else {
    url = REGISTER_ENDPOINT;
  }
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = 'Authentication failed';
    console.log(`HTTP error! status: ${response.status}`);
    throw new Error(errorMessage);
  }

  const data = await response.json();

  return data;
};

export const changePasswordApiCall = async (token, pword) => {
  const response = await fetch(PASSWORD_CHANGE_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      idToken: token,
      password: pword,
      returnSecureToken: false,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { loginOrRegisterApiCall };
