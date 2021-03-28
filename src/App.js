import React from "react";
import { Admin, Resource } from "react-admin";
import authProvider from "./utils/authProvider";
import dataProvider from "./utils/dataProvider";
import urls from "./utils/apiUrls";
import sendsReducer from "./redux/sends/reducer";
import { createMuiTheme } from "@material-ui/core/styles";

import { UserList, UserIcon } from "./pages/users";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const {
  users,
  categories,
  campains,
  templates,
  clients,
  sponsors,
  sends,
} = urls;

const App = () => {
  return (
    <Admin
      title="WONNYO SELMIRA HAMESTER TOZAWA  - 2529602014 - PARCIAL"
      dataProvider={dataProvider}
      theme={theme}
      customReducers={{ sends: sendsReducer }}
    >
      <Resource
        name="statistics"
        list={UserList}
        icon={UserIcon}
      />

    </Admin>
  );
};

export default App;
