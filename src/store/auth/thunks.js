import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
//Login
export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch( logout( result.errorMessage ));
    dispatch( login( result ))
    // console.log({result});
  };
};


//Register
export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {

    return async (dispatch) => {
      dispatch(checkingCredentials());

      const resp = await registerUserWithEmailPassword({email, password, displayName});
      
      // console.log(resp);
      if (!resp.ok) return dispatch(logout(resp.errorMessage));
      dispatch(login(resp));
    }
}



export const startLoginWithEmailPassword = ({email, password}) => {

  return async (dispatch) => {
    dispatch(checkingCredentials());

    const resp = await loginWithEmailPassword({email, password});

    if (!resp.ok) return dispatch(logout(resp.errorMessage));

    dispatch(login(resp));
    // console.log(resp);

  }

}



export const startLogout = () => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}