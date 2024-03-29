import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
   Button,
   Grid,
   Link,
   TextField,
   Typography,
   Alert,
} from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
   startGoogleSignIn,
   startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const formData = {
   email: "",
   password: "",
};

export const LoginPages = () => {
   const { status, errorMessage } = useSelector((state) => state.auth);

   const { formState, email, password, onInputChange } = useForm(formData);

   const isAuthenticating = useMemo(() => status === "checking", [status]);

   const dispatch = useDispatch();

   const onSubmit = (event) => {
      event.preventDefault();

      //! No es esta la acción a despachar
      dispatch(startLoginWithEmailPassword(formState));
      //console.log({ email, password });
   };

   const onGoogleSignIn = () => {
      dispatch(startGoogleSignIn());
      console.log("onGoogleSignIn");
   };

   return (
      <AuthLayout title="Log in">
         <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
         >
            <Grid container>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Email Address"
                     type="email"
                     placeholder="email@gmail.com"
                     fullWidth
                     name="email"
                     value={email}
                     onChange={onInputChange}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Password"
                     type="password"
                     placeholder="Password"
                     fullWidth
                     name="password"
                     value={password}
                     onChange={onInputChange}
                  />
               </Grid>
               <Grid
                  container
                  display={!!errorMessage ? "" : "none"}
                  sx={{ mt: 1 }}
               >
                  <Grid item xs={12}>
                     <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                     <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isAuthenticating}
                     >
                        <Typography sx={{ ml: 1 }}>Log in</Typography>
                     </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <Button
                        variant="contained"
                        fullWidth
                        onClick={onGoogleSignIn}
                        disabled={isAuthenticating}
                     >
                        <Google />
                        <Typography sx={{ ml: 1 }}>Google</Typography>
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction="row" justifyContent="end">
                  <Link
                     component={RouterLink}
                     color="inherit"
                     to="/auth/register"
                  >
                     Sign up
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>
   );
};
