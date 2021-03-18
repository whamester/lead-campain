import React from "react";
import { Grid, Paper, Typography, Link } from "@material-ui/core";
// import logo1 from "../images/logo1.jpg";
import { getAuthData } from "../utils/storage";

const Home = () => {
  const data = JSON.parse(getAuthData());

  return (
    <div>
      <Grid container spacing={0} justify="center" direction="notifyme">
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
                  Welcome <i>{data?.name ? data?.name : ""}</i>
                </Typography>
              </Grid>
              <Grid item>
                <div>
                  {/* <img src="~/images/logo1.jpg" width={500} title="meow" /> */}
                </div>
              </Grid>

              <Grid item>
                <Link href="/#/about">Want to know more about us?</Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
