import React from "react";
import { Admin, Resource } from "react-admin";
import Login from "./pages/login";
import LogoutButton from "./components/logoutButton";
import authProvider from "./utils/authProvider";
import dataProvider from "./utils/dataProvider";
import urls from "./utils/apiUrls";
import routes from "./utils/routes";
import { UserList, UserEdit, UserCreate, UserIcon } from "./pages/users";

import {
  CategoryList,
  CategoryEdit,
  CategoryCreate,
  CategoryIcon,
} from "./pages/categories";

import {
  TemplateList,
  TemplateEdit,
  TemplateCreate,
  TemplateIcon,
} from "./pages/templates";

import {
  CampainList,
  CampainEdit,
  CampainCreate,
  CampainIcon,
} from "./pages/campains";

import {
  ClientList,
  ClientEdit,
  ClientCreate,
  ClientIcon,
} from "./pages/clients";

import {
  SponsorList,
  SponsorEdit,
  SponsorCreate,
  SponsorIcon,
} from "./pages/sponsors";

import "./App.css";
import { CreateNewSend, SendIcon, SendList, SendShow } from "./pages/sends";

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
      customRoutes={routes}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={Login}
      logoutButton={LogoutButton}
    >
      <Resource
        name={users}
        list={UserList}
        icon={UserIcon}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name={categories}
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        icon={CategoryIcon}
      />
      <Resource
        name={templates}
        list={TemplateList}
        edit={TemplateEdit}
        create={TemplateCreate}
        icon={TemplateIcon}
      />
      <Resource
        name={campains}
        list={CampainList}
        edit={CampainEdit}
        create={CampainCreate}
        icon={CampainIcon}
      />
      <Resource
        name={clients}
        list={ClientList}
        edit={ClientEdit}
        create={ClientCreate}
        icon={ClientIcon}
      />

      <Resource
        name={sponsors}
        list={SponsorList}
        edit={SponsorEdit}
        create={SponsorCreate}
        icon={SponsorIcon}
      />

      <Resource
        options={{ label: "Sent Campains History" }}
        name={sends}
        list={SendList}
        show={SendShow}
        icon={SendIcon}
        create={CreateNewSend}
      />
    </Admin>
  );
};

export default App;
