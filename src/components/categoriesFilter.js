import { useNotify } from "react-admin";
import { CheckboxGroupInput, Filter } from "ra-ui-materialui";
import React, { useEffect, useState } from "react";
import useCategoriesList from "../hooks/useCategoriesList";

const CategoriesFilter = (props) => {
  const getCategoriesList = useCategoriesList();
  const notify = useNotify();

  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (!categoriesList.length) {
      getCategoriesList()
        .then(({ data } = {}) => {
          setCategoriesList(data || []);
        })
        .catch((error) => {
          notify("Oops! Something went wrong " + error.message, "error");
        });
    }
  }, [getCategoriesList, categoriesList]);

  return (
    <Filter {...props}>
      <CheckboxGroupInput
        source="categories"
        label="Categories"
        choices={categoriesList}
      />
    </Filter>
  );
};

export default CategoriesFilter;
