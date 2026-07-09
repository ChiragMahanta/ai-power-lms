import { getUser, registerApi, loginApi, logoutApi } from "@/Api/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "@/store/Module.store";

export const UserLoginHook = async (credentials) => {
  return await loginApi(credentials);
};

export const useRegisterHook = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setUser(data.user || data);
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
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user || data);
      toast.success(data?.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
};

export const useGetUserHook = () => {
  const { setUser } = useUserStore();

  return useQuery({
    queryFn: getUser,
    queryKey: ["getUser"],
    onSuccess: (data) => {
      setUser(data.user || data);
    },
  });
};

export const useLoggedOut = () => {
  const navigate = useNavigate();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      clearUser();
      toast.success(data?.message);
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Logout failed");
    },
  });
};