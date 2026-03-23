import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export const useLoginMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (payload) => login(payload),
  });
};

export const useRegisterMutation = () => {
  const { register } = useAuth();
  return useMutation({
    mutationFn: (payload) => register(payload),
  });
};
