import React from "react";
import { Admin, Resource } from "react-admin";
// import jsonServerProvider from "ra-data-json-server";
// import HomeIcon from "@material-ui/icons/Home";
import { PostList, PostEdit, PostCreate, PostIcon } from "./pages/posts";
import { UserList, UserEdit, UserCreate, UserIcon } from "./pages/users";

import "./App.css";
// import authProvider from "./utils/authProvider";
import dataProvider from "./utils/dataProvider";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => {
  console.log(dataProvider);
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="User"
        list={UserList}
        icon={UserIcon}
        edit={UserEdit}
        create={UserCreate}
      />
      {/* <Resource name="posts" icon={HomeIcon} list={ListGuesser} /> */}
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
    </Admin>
  );
};

export default App;
