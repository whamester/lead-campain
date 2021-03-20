import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  required,
  BooleanField,
  BooleanInput,
  PasswordInput,
} from "react-admin";
import urls from "../utils/apiUrls";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
export const UserIcon = PersonOutlineIcon;
const { users } = urls;

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="email" label="Email" />
      <BooleanField source="isSuperUser" label="Super user" />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
      <EditButton basePath={`/${users}`} />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.email}"` : ""}</span>;
};

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" label="ID" />
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput source="email" validate={required()} label="Email" />
      <PasswordInput source="password" />
      <BooleanInput source="isSuperUser" label="Super user" />
      <BooleanInput source="isActive" label="Active" />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create title="Create a new user" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput source="email" validate={required()} label="Email" />
      <PasswordInput source="password" />
      {/* <PasswordInput source="confirmPassword" /> */}
      <BooleanInput source="isSuperUser" label="Super user" />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
