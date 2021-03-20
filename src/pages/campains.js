import React, { useState, useEffect, useCallback } from "react";
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
  DateField,
  BooleanInput,
  SelectField,
  AutocompleteInput,
  useNotify,
  useDataProvider,
} from "react-admin";
import urls from "../utils/apiUrls";
import RichTextInput from "ra-input-rich-text";
import SendIcon from "@material-ui/icons/Send";
import useSponsorList from "../hooks/useSponsorList";

const { campains } = urls;

export const CampainIcon = SendIcon;

export const CampainList = (props) => {
  const { getList } = useDataProvider();
  const notify = useNotify();

  const [sponsorList, setSponsorList] = useState([]);

  const getSponsors = useCallback(() => {
    getList(urls.sponsors, {
      pagination: { perPage: 1000, page: 1 },
      sort: {},
      filter: {},
    })
      .then((response) => {
        setSponsorList(response?.data || []);
      })
      .catch((error) => {
        notify("Oops! Something went wrong " + error.message, "error");
      });
  }, []);

  useEffect(() => {
    getSponsors();
  }, [getSponsors]);

  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="name" label="Name" />
        <TextField source="description" multiline label="Description" />

        <SelectField source="sponsorId" label="Sponsor" choices={sponsorList} />

        <BooleanField source="isActive" label="Active" />
        <DateField source="createdDate" label="Created at" />
        <TextField source="createUser" label="Created by" />
        <DateField source="updatedDate" label="Last updated at" />
        <TextField source="updateUser" label="Last updated by" />

        <EditButton basePath={`/${campains}`} />
      </Datagrid>
    </List>
  );
};

const CampainTitle = ({ record }) => {
  return <span>Campain {record ? `"${record.name}"` : ""}</span>;
};

export const CampainEdit = (props) => {
  const getSponsorList = useSponsorList();
  const notify = useNotify();

  const [sponsorList, setSponsorList] = useState([]);

  useEffect(() => {
    if (!sponsorList.length) {
      getSponsorList()
        .then(({ data }) => {
          setSponsorList(data || []);
        })
        .catch((error) => {
          notify("Oops! Something went wrong " + error.message, "error");
        });
    }
  }, [getSponsorList, sponsorList]);
  return (
    <Edit title={<CampainTitle />} {...props}>
      <SimpleForm>
        <TextField source="id" label="ID" />
        <TextInput source="name" label="Name" validate={required()} />
        <RichTextInput
          source="description"
          label="Description"
          validate={required()}
        />
        <AutocompleteInput
          source="sponsorId"
          validate={required()}
          label="Sponsor"
          choices={sponsorList}
        />
        <BooleanInput source="isActive" label="Active" />
      </SimpleForm>
    </Edit>
  );
};

export const CampainCreate = (props) => {
  const getSponsorList = useSponsorList();
  const notify = useNotify();

  const [sponsorList, setSponsorList] = useState([]);

  useEffect(() => {
    if (!sponsorList.length) {
      getSponsorList()
        .then(({ data }) => {
          setSponsorList(data || []);
        })
        .catch((error) => {
          notify("Oops! Something went wrong " + error.message, "error");
        });
    }
  }, [getSponsorList, sponsorList]);

  return (
    <Create title="Create a new campain" {...props}>
      <SimpleForm>
        <TextInput source="name" label="Name" validate={required()} />
        <RichTextInput
          source="description"
          label="Description"
          validate={required()}
        />
        <AutocompleteInput
          source="sponsorId"
          validate={required()}
          label="Sponsor"
          choices={sponsorList}
        />
        <BooleanInput source="isActive" label="Active" />
      </SimpleForm>
    </Create>
  );
};
