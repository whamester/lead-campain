import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  ThemeProvider,
  // Link,
} from "@material-ui/core";
import { useLogin, useNotify } from "react-admin";
import { createMuiTheme } from "@material-ui/core/styles";
import logo2 from "../images/logo2.png";

const theme = createMuiTheme({
  palette: {
    // type: "dark", // Switching the dark mode on is a single property value change.
    primary: {
      main: "#FA671C",
    },
    secondary: {
      main: "#FA671C",
    },
  },
});

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const submit = (e) => {
    e.preventDefault();
    console.log("Hola");
    login({ username, password })
      .then((response) => {
        console.log(response);
        notify("Invalid username or password");
      })
      .catch(() => notify("Invalid username or password"));
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <div>
                <img src={logo2} width={160} title="ntify" />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={submit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>

              {/* <Grid item>
                <Link href="/#/signup">Don't have an account? Sign up!</Link>
              </Grid> */}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
