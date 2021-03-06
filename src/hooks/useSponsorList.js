import { useDataProvider } from "react-admin";
import urls from "../utils/apiUrls";

const { sponsors } = urls;
const useSponsorList = () => {
  const { getList } = useDataProvider();
  return () =>
    getList(sponsors, { pagination: { pageSize: 200, page: 1 }, sort: {} });
};

export default useSponsorList;
