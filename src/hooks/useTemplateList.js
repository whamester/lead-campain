import { useDataProvider } from "react-admin";
import urls from "../utils/apiUrls";

const { templates } = urls;

const useTemplateList = () => {
  const { getCatalog } = useDataProvider();
  return () => getCatalog(templates, { pagination: {}, sort: {} });
};

export default useTemplateList;
