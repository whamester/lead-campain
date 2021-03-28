import React, { useState, useEffect } from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SelectInput,
  DateInput,
  SimpleForm,
  DateField,
  TextField,
  useNotify,
  useDataProvider,
  TextInput,
  required,
  BooleanInput,
  PasswordInput,
  Filter,
} from "react-admin";
import urls from "../utils/apiUrls";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
export const UserIcon = PersonOutlineIcon;
const { users } = urls;

const CountryFilter = (props) => {
  const { getCountries } = useDataProvider();
  const notify = useNotify();
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    getCountries()
      .then((response) => {
        setCountryList(response?.data || []);
      })
      .catch((error) => {
        notify("Oops! Something went wrong " + error.message, "error");
      });
  }, [notify]);

  return (
    <Filter {...props}>
      <SelectInput source="country" label="Country" choices={countryList} />
    </Filter>
  );
};

export const UserList = (props) => (
  <List {...props} filters={<CountryFilter />}>
    <Datagrid>
      <TextField source="continent" label="continent" />
      <TextField source="country" label="country" />
      <TextField source="population" label="population" />
      <DateField source="day" label="day" />
      {/* <EditButton basePath={`/${users}`} /> */}
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
