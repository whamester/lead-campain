import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  Show,
  SimpleShowLayout,
} from "react-admin";
import urls from "../utils/apiUrls";

import HistoryIcon from "@material-ui/icons/History";
export const SendIcon = HistoryIcon;
const { sends } = urls;

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
