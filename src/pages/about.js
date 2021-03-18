import React from "react";
import { Grid, Paper, Typography, Link } from "@material-ui/core";
import logo2 from "../images/logo2.png";
import { getAuthData } from "../utils/storage";

const About = () => {
  const data = JSON.parse(getAuthData());
  console.log(data);
  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid container direction="column" spacing={2} className="login-form">
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item direction="row" justify="flex-end">
                <div>
                  <img src={logo2} width={100} title="notifyme" />
                </div>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Team collaborators
                </Typography>
              </Grid>
              <br />
              <Grid item>
                <Typography>
                  Wonnyo Selmira Hamester Tozawa{"  "}
                  <Link href="https://www.linkedin.com/in/wonnyo-hamester-60119819b/">
                    @whamester
                  </Link>
                </Typography>
                <Typography>
                  Oscar Josue Torres Molina{"  "}
                  <Link href="https://www.linkedin.com/in/oscarjossuetorres/">
                    @oscarjossuetorres
                  </Link>
                </Typography>
                <Typography>
                  Kevin Fernando Melendez Benitez{"  "}
                  <Link href="https://www.linkedin.com/in/kevin-fernando-melendez-benitez-52a620209/">
                    @kevinMelendez
                  </Link>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default About;
