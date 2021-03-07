import * as React from "react";
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
} from "react-admin";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
export const UserIcon = AccountBoxIcon;

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="email" label="Email" />
      <TextField source="isSuperUser" label="Super user" />
      <TextField source="isActive" label="Active" />
      <DateField source="createDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updateDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
      <EditButton basePath="/User" />
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
      <BooleanField source="isSuperUser" label="Super user" />
      <BooleanInput source="isActive" label="Active" />
      <DateField source="createDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updateDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create title="Create a new user" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput source="email" validate={required()} label="Email" />
      <BooleanInput source="isSuperUser" label="Super user" />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
