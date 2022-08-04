import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { changePasswordApiCall } from '../../api.js/api-calls';
import AuthContext from '../../store/auth-context';

import { useRef } from 'react';

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    changePasswordApiCall(authCtx.token, enteredPassword);
    history.replace('/');
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
