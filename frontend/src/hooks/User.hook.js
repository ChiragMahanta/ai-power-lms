import { getUser, registerApi, loginApi, logoutApi } from "@/Api/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const UserLoginHook = async (credentials) => {
  return await loginApi(credentials);
};

export const useRegisterHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Registration failed");
    },
  });
};

export const useLoginHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
};

export const useGetUserHook = () => {
  return useQuery({
    queryFn: getUser,
    queryKey: ["getUser"],
  });
};

export const useLoggedOut = () => {
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Logout failed");
    },
  });
};