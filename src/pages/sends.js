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
  BooleanInput,
  Create,
  SelectInput,
  CheckboxGroupInput,
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

export const CreateNewSend = (props) => {
  const getCampainList = useCampainList();
  const getTemplateList = useTemplateList();
  const getCategoriesList = useCategoriesList();

  const [campainList, setCampainList] = React.useState([]);
  const [templateList, setTemplateList] = React.useState([]);
  const [categoriesList, setCategoriesList] = React.useState([]);

  React.useEffect(() => {
    if (!campainList.length) {
      getCampainList()
        .then(({ data }) => {
          setCampainList(data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getCampainList, campainList]);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
    <Create title="Send a campain" {...props}>
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

        <CheckboxGroupInput source="categosries" choices={categoriesList} />

        <BooleanInput source="sendNow" label="Send now?" />
      </SimpleForm>
    </Create>
  );
};
