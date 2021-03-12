import { useDataProvider } from "react-admin";
import urls from "../utils/apiUrls";

const { categories } = urls;
const useCategoriesList = () => {
  const { getCatalog } = useDataProvider();
  return () => getCatalog(categories, { pagination: {}, sort: {} });
};

export default useCategoriesList;
