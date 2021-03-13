import React from "react";
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
  DateField,
  BooleanField,
  BooleanInput,
  SelectField,
  AutocompleteInput,
} from "react-admin";
import urls from "../utils/apiUrls";
import RichTextInput from "ra-input-rich-text";
import DescriptionIcon from "@material-ui/icons/Description";
export const TemplateIcon = DescriptionIcon;
const { templates } = urls;

const templateType = [
  { id: 1, name: "Correo" },
  { id: 2, name: "SMS" },
];

export const TemplateList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="subject" multiline label="Subject" />

      <SelectField source="idType" label="Type" choices={templateType} />

      <BooleanField source="isActive" label="Active" />
      <DateField source="createDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updateDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />

      <EditButton basePath={`/${templates}`} />
    </Datagrid>
  </List>
);

const TemplateTitle = ({ record }) => {
  return <span>Template {record ? `"${record.name}"` : ""}</span>;
};

export const TemplateEdit = (props) => (
  <Edit title={<TemplateTitle />} {...props}>
    <SimpleForm>
      <TextField source="id" label="ID" />
      <TextInput source="name" label="Name" validate={required()} />
      <TextInput
        source="subject"
        multiline
        label="Subject"
        validate={required()}
      />
      <AutocompleteInput
        source="idType"
        validate={required()}
        label="Type"
        choices={templateType}
      />

      <RichTextInput
        source="htmlContent"
        label="HTML Content"
        validate={required()}
      />
      <RichTextInput
        source="plainContent"
        label="Text Content"
        validate={required()}
      />

      <BooleanInput source="isActive" label="Active" />
      <DateField source="createDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updateDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleForm>
  </Edit>
);

export const TemplateCreate = (props) => (
  <Create title="Create a new template" {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
      <TextInput
        source="subject"
        multiline
        label="Subject"
        validate={required()}
      />
      <AutocompleteInput
        source="idType"
        validate={required()}
        label="Type"
        choices={templateType}
      />

      <RichTextInput
        source="htmlContent"
        label="HTML Content"
        validate={required()}
      />
      <RichTextInput
        source="plainContent"
        label="Text Content"
        validate={required()}
      />

      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
