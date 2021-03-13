import React, { useState, useEffect } from "react";
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
} from "react-admin";
import urls from "../utils/apiUrls";
import RichTextInput from "ra-input-rich-text";
import SendIcon from "@material-ui/icons/Send";
import useSponsorList from "../hooks/useSponsorList";
export const CampainIcon = SendIcon;
const { campains } = urls;

export const CampainList = (props) => {
  const getSponsorList = useSponsorList();

  const [sponsorList, setSponsorList] = useState([]);

  useEffect(() => {
    if (sponsorList.length === 0) {
      getSponsorList()
        .then(({ data }) => {
          setSponsorList(data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getSponsorList, sponsorList]);
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="name" label="Name" />
        <TextField source="description" multiline label="Description" />

        <SelectField source="sponsorId" label="Sponsor" choices={sponsorList} />

        <BooleanField source="isActive" label="Active" />
        <DateField source="createDate" label="Created at" />
        <TextField source="createUser" label="Created by" />
        <DateField source="updateDate" label="Last updated at" />
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

  const [sponsorList, setSponsorList] = useState([]);

  useEffect(() => {
    getSponsorList()
      .then(({ data }) => {
        setSponsorList(data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getSponsorList]);
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

export const CampainCreate = (props) => (
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
