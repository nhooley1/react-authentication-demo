import { useState, useRef } from 'react';
import { loginOrRegisterApiCall } from '../../api.js/api-calls';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const PasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = PasswordInputRef.current.value;
    setIsLoading(true);
    try {
      await loginOrRegisterApiCall(enteredEmail, enteredPassword, isLogin);
    } catch (e) {
      console.log('called from Authform.js' + e);
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={PasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading ? (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          ) : (
            <p>'This Page is loading</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
