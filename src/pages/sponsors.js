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
import urls from "../utils/apiUrls";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
export const SponsorIcon = SupervisedUserCircleIcon;
const { sponsors } = urls;

export const SponsorList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="surname" label="Surname" />
      <TextField source="email" label="Email" />
      <TextField source="phoneNumber" label="Phone number" />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
      <EditButton basePath={`/${sponsors}`} />
    </Datagrid>
  </List>
);

const SponsorTitle = ({ record }) => {
  return (
    <span>Sponsor {record ? `"${record.name} ${record.surname}"` : ""}</span>
  );
};

export const SponsorEdit = (props) => (
  <Edit title={<SponsorTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" label="ID" />
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput source="surname" validate={required()} label="Surname" />
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

export const SponsorCreate = (props) => (
  <Create title="Create a new sponsor" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} label="Name" />
      <TextInput source="surname" validate={required()} label="Surname" />
      <TextInput source="email" validate={required()} label="Email" />
      <TextInput
        source="phoneNumber"
        validate={required()}
        label="Phone number"
      />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
