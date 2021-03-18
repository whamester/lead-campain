import React, { useEffect, useState } from "react";
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
  BooleanInput,
  Create,
  SelectInput,
  CheckboxGroupInput,
  useNotify,
  Toolbar,
  SaveButton,
} from "react-admin";
import urls from "../utils/apiUrls";
import HistoryIcon from "@material-ui/icons/History";
import useCampainList from "../hooks/useCampainList";
import useTemplateList from "../hooks/useTemplateList";
import useCategoriesList from "../hooks/useCategoriesList";

export const SendIcon = HistoryIcon;
const { sends } = urls;

export const SendList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="templateName" label="Template name" />
      <TextField source="campainName" multiline label="Campain Name" />

      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
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

      <DateField source="createdDate" label="Created at" />
      <TextField source="createUser" label="Created by" />
      <DateField source="updatedDate" label="Last updated at" />
      <TextField source="updateUser" label="Last updated by" />
    </SimpleShowLayout>
  </Show>
);

const OnSend = ({ basePath, data, resource }) => (
  <Toolbar>
    <SaveButton />

    {/* Add your custom actions */}
    {/* <Button color="primary">Custom Action</Button> */}
  </Toolbar>
);

export const CreateNewSend = (props) => {
  const getCampainList = useCampainList();
  const getTemplateList = useTemplateList();
  const getCategoriesList = useCategoriesList();
  const notify = useNotify();

  const [campainList, setCampainList] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (!campainList.length) {
      getCampainList()
        .then(({ data }) => {
          setCampainList(data || []);
        })
        .catch((error) => {
          console.log(error);
        });
      // notify("Invalid username or password");
    }
  }, [getCampainList, notify, campainList]);

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

  useEffect(() => {
    if (!templateList.length) {
      getTemplateList()
        .then(({ data }) => {
          setTemplateList(data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getTemplateList, templateList]);

  return (
    <Create {...props} title="Send a campain" save={() => console.log("Hola")}>
      <SimpleForm>
        <SelectInput
          source="templateId"
          validate={required()}
          label="Template"
          choices={templateList}
        />
        <SelectInput
          source="campainId"
          validate={required()}
          label="Campain"
          choices={campainList}
        />

        <CheckboxGroupInput
          source="categosries"
          label="Categories"
          choices={categoriesList}
        />

        <BooleanInput source="sendNow" label="Send now?" />
      </SimpleForm>
    </Create>
  );
};
