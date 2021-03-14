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
} from "react-admin";
import urls from "../utils/apiUrls";
import Icon from "@material-ui/icons/Category";
export const CategoryIcon = Icon;
const { categories } = urls;

export const CategoryList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="description" label="Description" />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
      <EditButton basePath={`/${categories}`} />
    </Datagrid>
  </List>
);

const CategoryTitle = ({ record }) => {
  return <span>Category {record ? `"${record.name}"` : ""}</span>;
};

export const CategoryEdit = (props) => (
  <Edit title={<CategoryTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" label="ID" />
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput
        source="description"
        validate={required()}
        label="Description"
      />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = (props) => (
  <Create title="Create a new user" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput
        source="description"
        validate={required()}
        label="Description"
      />
    </SimpleForm>
  </Create>
);
