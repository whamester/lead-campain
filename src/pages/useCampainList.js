import { useDataProvider } from "react-admin";
import urls from "../utils/apiUrls";

const { campains } = urls;
const useCampainList = () => {
  const { getCatalog } = useDataProvider();
  return () => getCatalog(campains, { pagination: {}, sort: {} });
};

export default useCampainList;
