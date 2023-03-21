import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'The email must include @'],
  password: [(value) => value.length >= 6, 'Password must include at least 6 letters'],
  displayName: [(value) => value.length >= 1, 'Full name is required'],
}



export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { state, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm(formData, formValidations);



  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Register">
      {/* <h1>FormValid {isFormValid ? 'valido' : '!valido'}</h1> */}

      <form 
      onSubmit={onSubmit}
      className="animate__animated animate__fadeIn animate__faster"
      > 
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              placeholder="James Smith"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error= {!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email Address"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error= {!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error= {!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid 
            item 
            xs={12}
            display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
              disabled={isCheckingAuthentication}
              variant="contained" 
              fullWidth
              type='submit'
              >
                Sign up
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr:1}}>Already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Sign in
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  );
};
