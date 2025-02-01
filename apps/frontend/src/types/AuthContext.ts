export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  urlPerfil?: string;
  isSisAdmin?: boolean;
  perfis?: string[];
}

export interface AuthContextInterface extends UserInterface {
  loading: boolean;
  isAuthenticated: boolean;
  token?: string;
  login: (
    email: string,
    password: string,
    isOtpValidation: boolean,
    loginType: string,
    next?: string
  ) => Promise<void>;
  loginQrCode: (token: string, next?: string) => Promise<void>;
  logout: () => void;
  userInfoUpdate: () => void;
  id?: string;
}

export interface AuthProviderInterface {
  children: React.ReactNode;
}
