import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  required,
  BooleanField,
  BooleanInput,
  SelectField,
  AutocompleteInput,
} from "react-admin";
import urls from "../utils/apiUrls";
import RichTextInput from "ra-input-rich-text";
import SendIcon from "@material-ui/icons/Send";
export const CampainIcon = SendIcon;
const { campains } = urls;

export const CampainList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="description" multiline label="Description" />

      <SelectField
        source="sponsorId"
        label="Sponsor"
        choices={[
          { id: "M", name: "Male" },
          { id: "F", name: "Female" },
        ]}
      />

      <BooleanField source="isActive" label="Active" />

      <EditButton basePath={`/${campains}`} />
    </Datagrid>
  </List>
);

const CampainTitle = ({ record }) => {
  return <span>Campain {record ? `"${record.name}"` : ""}</span>;
};

export const CampainEdit = (props) => (
  <Edit title={<CampainTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" label="ID" />
      <TextInput source="name" label="Name" validate={required()} />
      <RichTextInput
        source="descripcion"
        label="Description"
        validate={required()}
      />
      <AutocompleteInput
        source="sponsorId"
        validate={required()}
        label="Sponsor"
        choices={[
          { id: "1", name: "Programming" },
          { id: "2", name: "Lifestyle" },
          { id: "3", name: "Photography" },
        ]}
      />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Edit>
);

export const CampainCreate = (props) => (
  <Create title="Create a new campain" {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
      <RichTextInput
        source="descripcion"
        label="Description"
        validate={required()}
      />
      <AutocompleteInput
        source="sponsorId"
        validate={required()}
        label="Sponsor"
        choices={[
          { id: "1", name: "Programming" },
          { id: "2", name: "Lifestyle" },
          { id: "3", name: "Photography" },
        ]}
      />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
