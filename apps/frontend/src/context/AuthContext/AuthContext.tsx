/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  handleError,
  PATH_PAGE,
  PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION,
  PATH_PAGE_HOME,
} from "@/lib";
import { createCookie, getCookie } from "@/lib/actions/";
import { decrypt } from "@/lib/JWT/verifyToken";
import {
  changeTokenId,
  findUserID,
  loginRequest,
  LoginResponse,
  logoutRequest,
  otpValidation,
} from "@/services";
import { loginByQrCodeRequest } from "@/services/accounts/loginByQrCode";
import {
  AuthContextInterface,
  AuthProviderInterface,
  ErrorResponse,
  UserInterface,
} from "@/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderInterface) {
  const [userState, setUser] = useState<UserInterface>();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [id, setId] = useState<string | undefined>(undefined);

  const user = useMemo(() => userState, [userState]);

  const isAuthenticated = !!user;

  const initializeUser = useCallback(async () => {
    setLoading(true);
    try {
      const tokenId = await getCookie("tokenId");
      if (tokenId?.value) {
        const payload = await decrypt(tokenId.value);
        setToken(tokenId.value);
        setUser({
          id: payload.id,
          name: payload.nome,
          email: payload.email,
          urlPerfil: payload.urlPerfil,
          isSisAdmin: payload.isSisAdmin,
          perfis: payload.perfis,
        });
        setId(payload.id);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Falha ao autenticar. Faça login novamente.");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  async function login(
    email: string,
    password: string,
    isOtpValidation = false,
    loginType: string,
    next?: string
  ) {
    const response = isOtpValidation
      ? await otpValidation(email, password, loginType)
      : await loginRequest(email, password);
    if (response.status === 200) {
      const data = response.data as LoginResponse;
      await createCookie("tokenId", data.tokenId);
      await createCookie("token", data.token, 30 * 24 * 60 * 60); // 30 dias
      const payload = await decrypt(data.tokenId);
      setToken(data.tokenId);
      setUser({
        id: payload.id,
        name: payload.nome,
        email: payload.email,
        urlPerfil: payload.urlPerfil,
        isSisAdmin: payload.isSisAdmin,
        perfis: payload.perfis,
      });
      // replace(PATH_PAGE_HOME);
      window.location.replace(next || PATH_PAGE_HOME);
    } else if (response.status === 303) {
      const urlParams = new URLSearchParams();
      urlParams.set("email", email);
      urlParams.set("login_type", "email");
      push(
        `${PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION}?${urlParams.toString()}`
      );
    } else {
      const error = response.data as ErrorResponse;
      toast.error(error.message);
    }
  }

  async function userInfoUpdate() {
    try {
      const payload = await findUserID({ id: id || "", token: undefined });
      if (payload) {
        setUser({
          id: payload.id,
          name: payload.nome,
          email: payload.email,
          urlPerfil: payload.urlPerfil,
          isSisAdmin: payload.sisAdmin,
          perfis: payload.perfis?.map((perfil) => perfil.nome) || [],
        });

        const tokenRefresh = await getCookie("token");
        if (tokenRefresh?.value) {
          const response = await changeTokenId(tokenRefresh.value, token);
          if (response.status === 200) {
            const data = response.data;
            createCookie("tokenId", data.tokenId, 2 * 60 * 60);
            createCookie("token", data.token, 30 * 24 * 60 * 60);
          }
        }
      }
    } catch (error: any) {
      handleError(error);
    }
  }

  async function loginQrCode(token: string, next?: string) {
    const response = await loginByQrCodeRequest(token);
    if (response.status === 200) {
      const data = response.data as LoginResponse;
      await createCookie("tokenId", data.tokenId);
      await createCookie("token", data.token, 30 * 24 * 60 * 60); // 30 dias
      const payload = await decrypt(data.tokenId);
      setToken(data.tokenId);
      setUser({
        id: payload.id,
        name: payload.nome,
        email: payload.email,
        urlPerfil: payload.urlPerfil,
        isSisAdmin: payload.isSisAdmin,
        perfis: payload.perfis,
      });
      // replace(PATH_PAGE_HOME);
      window.location.replace(next || PATH_PAGE_HOME);
    } else if (response.status === 303) {
      const data = response.data as LoginResponse;
      const urlParams = new URLSearchParams();
      urlParams.set("email", data.tokenId); //tokenId nesse caso é o email
      urlParams.set("login_type", "qrCode");
      push(
        `${PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION}?${urlParams.toString()}`
      );
    } else {
      const error = response.data as ErrorResponse;
      toast.error(error.message);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await logoutRequest(user?.id || "");
      window.location.replace(PATH_PAGE);
      setUser(undefined);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        isAuthenticated,
        token,
        loading,
        login,
        loginQrCode,
        logout,
        userInfoUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
