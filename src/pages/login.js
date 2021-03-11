import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";
import { useLogin, useNotify } from "react-admin";

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const submit = (e) => {
    e.preventDefault();
    console.log(username, password);
    login({ username, password }).catch(() =>
      notify("Invalid username or password")
    );
  };

  return (
    <div>
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Lead Campains</Typography>
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
                      {/* <Link href="/forgot-password">Forgot Password?</Link> */}
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

              <Grid item>
                <Link href="/#/signup">Don't have an account? Sign up!</Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { username: "", password: "", authflag: 1 };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({
//       username: event.state.username,
//       password: event.state.password,
//     });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     if (
//       this.state.username == "admin@littech.in" &&
//       this.state.password == "secret"
//     ) {
//       this.props.history.push("/home");
//     } else {
//       alert("Incorrect Credntials!");
//     }
//   }
//   render() {
//     return (
//       <div>
//         <AppBar position="static" alignitems="center" color="primary">
//           <Toolbar>
//             <Grid container justify="center" wrap="wrap">
//               <Grid item>
//                 <Typography variant="h6">Lead Campains</Typography>
//               </Grid>
//             </Grid>
//           </Toolbar>
//         </AppBar>
//         <Grid container spacing={0} justify="center" direction="row">
//           <Grid item>
//             <Grid
//               container
//               direction="column"
//               justify="center"
//               spacing={2}
//               className="login-form"
//             >
//               <Paper
//                 variant="elevation"
//                 elevation={2}
//                 className="login-background"
//               >
//                 <Grid item>
//                   <Typography component="h1" variant="h5">
//                     Sign in
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <form onSubmit={submit}>
//                     <Grid container direction="column" spacing={2}>
//                       <Grid item>
//                         <TextField
//                           type="email"
//                           placeholder="Email"
//                           fullWidth
//                           name="username"
//                           variant="outlined"
//                           value={this.state.username}
//                           onChange={(e) => setEmail(e.target.value)}
//                           required
//                           autoFocus
//                         />
//                       </Grid>
//                       <Grid item>
//                         <TextField
//                           type="password"
//                           placeholder="Password"
//                           fullWidth
//                           name="password"
//                           variant="outlined"
//                           value={this.state.password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                       </Grid>
//                       <Grid item>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           type="submit"
//                           className="button-block"
//                         >
//                           Submit
//                         </Button>
//                       </Grid>
//                     </Grid>
//                   </form>
//                 </Grid>
//                 <Grid item>
//                   <Link href="#" variant="body2">
//                     Forgot Password?
//                   </Link>
//                 </Grid>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
// }
export default Login;
