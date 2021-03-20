import React, { useCallback, useEffect, useState } from "react";
import {
  List,
  TextField,
  DateField,
  ShowButton,
  required,
  Show,
  Datagrid,
  SimpleShowLayout,
  SimpleForm,
  BooleanInput,
  Create,
  SelectInput,
  CheckboxGroupInput,
  useNotify,
  useDataProvider,
  TopToolbar,
} from "react-admin";
import urls from "../utils/apiUrls";
import HistoryIcon from "@material-ui/icons/History";
import { DataGrid as DataTable } from "@material-ui/data-grid";
import useCampainList from "../hooks/useCampainList";
import useTemplateList from "../hooks/useTemplateList";
import useCategoriesList from "../hooks/useCategoriesList";
import CategoriesFilter from "../components/categoriesFilter";
import Button from "@material-ui/core/Button";

export const SendIcon = HistoryIcon;
const { sends, sendNewCampain } = urls;

const clientColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "phoneNumber", headerName: "Phone number", width: 130 },
  { field: "email", headerName: "Email", width: 250 },
];

const ResendMasiveCampains = (props) => {
  const { selectedIds } = props;
  const notify = useNotify();

  const { resendMany } = useDataProvider();

  const onSendMany = () => {
    resendMany(sendNewCampain, { ids: selectedIds })
      .then((response) => {
        if (response?.data) {
          notify(response?.data[0]?.data.message);
        }
      })
      .catch((error) => {
        notify("Oops! Something went wrong " + error.message, "error");
      });
  };

  return (
    <Button
      {...props}
      variant="contained"
      color="secondary"
      onClick={onSendMany}
    >
      Resend
    </Button>
  );
};

export const SendList = (props) => (
  <List
    {...props}
    filters={<CategoriesFilter />}
    bulkActionButtons={<ResendMasiveCampains />}
  >
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

const SendShowActions = (props) => {
  const { data } = props;
  const notify = useNotify();

  const { resendMany } = useDataProvider();

  const onSendMany = () => {
    resendMany(sendNewCampain, { ids: [data.id] })
      .then((response) => {
        if (response?.data) {
          notify(response?.data[0]?.data.message);
        }
      })
      .catch((error) => {
        notify("Oops! Something went wrong " + error.message, "error");
      });
  };

  return (
    <TopToolbar>
      <Button color="primary" onClick={onSendMany}>
        Resend
      </Button>
    </TopToolbar>
  );
};

export const SendShow = (props) => {
  const { getClientsBySendId } = useDataProvider();
  const notify = useNotify();

  const [clientsByCategories, setClientsByCategories] = useState([]);

  useEffect(() => {
    getClientsBySendId({ sendId: props.id })
      .then((response) => {
        setClientsByCategories(response?.data || []);
      })
      .catch((error) => {
        notify("Oops! Something went wrong " + error.message, "error");
      });
  }, [notify]);

  return (
    <div>
      <Show title={<SendTitle />} actions={<SendShowActions />} {...props}>
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

      <div>
        <h3>
          Clients reached :{" "}
          {Array.isArray(clientsByCategories) ? clientsByCategories.length : ""}
        </h3>
        <div style={{ height: 400, width: "100%" }}>
          <DataTable
            rows={clientsByCategories}
            columns={clientColumns}
            pageSize={5}
          />
        </div>
        <br />
      </div>
    </div>
  );
};

export const CreateNewSend = (props) => {
  const getCampainList = useCampainList();
  const getTemplateList = useTemplateList();
  const getCategoriesList = useCategoriesList();
  const { getList } = useDataProvider();

  const notify = useNotify();

  const [campainList, setCampainList] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clientsByCategories, setClientsByCategories] = useState([]);

  useEffect(() => {
    if (Array.isArray(selectedCategories) && selectedCategories.length) {
      getList(urls.clients, {
        pagination: { perPage: 1000, page: 1 },
        sort: {},
        filter: { categories: selectedCategories },
      })
        .then((response) => {
          setClientsByCategories(response?.data || []);
        })
        .catch((error) => {
          notify("Oops! Something went wrong " + error.message, "error");
        });
    }
  }, [selectedCategories, notify]);

  const getCampains = useCallback(() => {
    if (!campainList.length) {
      getCampainList()
        .then(({ data }) => {
          setCampainList(data || []);
        })
        .catch((error) => {
          notify("Oops! Something went wrong " + error.message, "error");
        });
    }
  }, [getCampainList, campainList, notify]);

  useEffect(() => {
    getCampains();
  }, []);

  const getCategories = useCallback(() => {
    if (!categoriesList.length) {
      getCategoriesList()
        .then(({ data }) => {
          setCategoriesList(data || []);
        })
        .catch((error) => {
          notify("Oops! Something went wrong " + error.message, "error");
        });
    }
  }, [getCategoriesList, notify]);

  useEffect(() => {
    getCategories();
  }, []);

  const getTemplates = useCallback(() => {
    getTemplateList()
      .then(({ data }) => {
        setTemplateList(data || []);
      })
      .catch((error) => {
        notify("Oops! Something went wrong " + error.message, "error");
      });
  }, [getTemplateList, notify]);

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div>
      <Create {...props} title="Send a campain">
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
            source="categories"
            label="Categories"
            onChange={setSelectedCategories}
            choices={categoriesList}
          />

          <BooleanInput source="sendNow" label="Send now?" />
        </SimpleForm>
      </Create>
      <br />
      <h3>
        Clients this campain will reach:{" "}
        {Array.isArray(clientsByCategories) ? clientsByCategories.length : ""}
      </h3>
      <br />

      <div style={{ height: 400, width: "100%" }}>
        <DataTable
          rows={clientsByCategories}
          columns={clientColumns}
          pageSize={5}
        />
      </div>
      <br />
    </div>
  );
};
