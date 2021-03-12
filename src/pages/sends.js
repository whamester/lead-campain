import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  required,
  Show,
  SimpleShowLayout,
  SimpleForm,
  AutocompleteInput,
  TextInput,
  useDataProvider,
  BooleanInput,
  Create,
} from "react-admin";
import urls from "../utils/apiUrls";
import HistoryIcon from "@material-ui/icons/History";
import dataProvider from "../utils/dataProvider";
export const SendIcon = HistoryIcon;
const { sends, templates, campains } = urls;

export const SendList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="templateName" label="Template name" />
      <TextField source="campainName" multiline label="Campain Name" />

      <DateField source="createDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updateDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />

      <ShowButton basePath={`/${sends}`} />
    </Datagrid>
  </List>
);

const SendTitle = ({ record }) => {
  return (
    <span>
      Sent History{" "}
      {record ? `"${record.templateName}" "${record.campainName}"` : ""}
    </span>
  );
};

export const SendShow = (props) => (
  <Show title={<SendTitle />} actions={null} {...props}>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="templateName" label="Template name" />
      <TextField source="campainName" multiline label="Campain Name" />

      <DateField source="createDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updateDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleShowLayout>
  </Show>
);

export const CreateNewSend = (props) => (
  <Create title="Create a new template" {...props}>
    <SimpleForm>
      <TextInput
        type="number"
        source="templateId"
        validate={required()}
        label="Template Id (WIP)"
      />

      <TextInput
        type="number"
        source="campainId"
        validate={required()}
        label="Campain Id (WIP)"
      />
      <TextInput
        source="categosries"
        validate={required()}
        label="Categories"
      />

      <BooleanInput source="sendNow" label="Send now?" />
    </SimpleForm>
  </Create>
);
