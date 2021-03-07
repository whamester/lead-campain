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
import RichTextInput from "ra-input-rich-text";
import DescriptionIcon from "@material-ui/icons/Description";
export const TemplateIcon = DescriptionIcon;

export const TemplateList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="subject" multiline label="Subject" />

      <SelectField
        source="idType"
        label="Type"
        choices={[
          { id: "M", name: "Male" },
          { id: "F", name: "Female" },
        ]}
      />

      <BooleanField source="isActive" label="Active" />

      <EditButton basePath="/Templates" />
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
        choices={[
          { id: "1", name: "Programming" },
          { id: "2", name: "Lifestyle" },
          { id: "3", name: "Photography" },
        ]}
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
        choices={[
          { id: "1", name: "Programming" },
          { id: "2", name: "Lifestyle" },
          { id: "3", name: "Photography" },
        ]}
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
