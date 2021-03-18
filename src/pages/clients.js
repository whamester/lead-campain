import React, { useEffect, useState } from "react";
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
  CheckboxGroupInput,
} from "react-admin";
import urls from "../utils/apiUrls";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import useCategoriesList from "../hooks/useCategoriesList";
export const ClientIcon = PersonPinIcon;
const { clients } = urls;

export const ClientList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="lastName" label="Surname" />
      <TextField source="email" label="Email" />
      <TextField source="phoneNumber" label="Phone number" />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
      <EditButton basePath={`/${clients}`} />
    </Datagrid>
  </List>
);

const ClientTitle = ({ record }) => {
  return (
    <span>Client {record ? `"${record.name} ${record.lastName}"` : ""}</span>
  );
};

export const ClientEdit = (props) => (
  <Edit title={<ClientTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" label="ID" />
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput source="lastName" validate={required()} label="Surname" />
      <TextInput source="email" validate={required()} label="Email" />
      <TextInput
        source="phoneNumber"
        validate={required()}
        label="Phone number"
      />

      <BooleanInput source="isActive" label="Active" />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = (props) => {
  const getCategoriesList = useCategoriesList();

  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (!categoriesList.length) {
      getCategoriesList()
        .then(({ data }) => {
          setCategoriesList(data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getCategoriesList, categoriesList]);

  return (
    <Create title="Create a new client" {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} label="Name" />
        <TextInput source="lastName" validate={required()} label="Surname" />
        <TextInput source="email" validate={required()} label="Email" />
        <TextInput
          source="phoneNumber"
          validate={required()}
          label="Phone number"
        />
        <CheckboxGroupInput
          source="categosries"
          label="Categories"
          choices={categoriesList}
        />
        <BooleanInput source="isActive" label="Active" />
      </SimpleForm>
    </Create>
  );
};
