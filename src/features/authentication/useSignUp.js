import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (credentials) => signUpAPI(credentials),
    onSuccess: () => {
      toast.success("Account successfully created");
    },
  });
  return { signUp, isLoading };
}
