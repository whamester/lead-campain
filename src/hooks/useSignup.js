import { useAuthProvider, Loading, Error } from "react-admin";

const useSignup = () => {
  const { signup } = useAuthProvider();
  return signup;
};

export default useSignup;
