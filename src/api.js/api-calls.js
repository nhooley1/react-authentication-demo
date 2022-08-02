import { SIGN_IN, REGISTER } from './api-keys';

const loginOrRegisterApiCall = async (
  enteredEmail,
  enteredPassword,
  isLogin
) => {
  let url = '';
  if (isLogin) {
    url = SIGN_IN;
  } else {
    url = REGISTER;
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

export { loginOrRegisterApiCall };
