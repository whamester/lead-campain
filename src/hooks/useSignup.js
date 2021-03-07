import { useAuthProvider } from "react-admin";

const useSignup = () => {
  const { signup } = useAuthProvider();
  return signup;
};

export default useSignup;
