// API - V1 -------------------------------------
export const API_BASE_URL_USE_SERVER =
  process.env.NEXT_PUBLIC_API_BASE_URL_USE_SERVER || "";
export const API_BASE_URL_USE_CLIENT =
  process.env.NEXT_PUBLIC_API_BASE_URL_USE_CLIENT || "";
// export const API_BASE_URL = "http://host.docker.internal:8000/v1";
export const API_AUTH = `/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_LOGOUT = `${API_AUTH}/logout`;
export const API_AUTH_LOGIN_BY_QRCODE = `${API_AUTH}/login-qrcode`;
export const API_AUTH_LOGIN_OTP_VALIDATION = `${API_AUTH_LOGIN}/otp-validacao`;
export const API_AUTH_QRCODE_LOGIN = `${API_AUTH}/qrcode/login`;
export const API_AUTH_USER_REGISTER = `${API_AUTH}/registrar-usuario`;
export const API_AUTH_RECOVERY_BY_EMAIL = `${API_AUTH}/recuperar-por-email`;
export const API_AUTH_VERIFY_EMAIL_TOKEN = `${API_AUTH}/verificar-token`;
export const API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN = `${API_AUTH}/alterar-senha-email`;
export const API_AUTH_CHANGE_TOKENID_BY_REFRESH_TOKEN = `${API_AUTH}/atualizar-token`;
export const API_AUTH_CHANGE_PASSWORD_USER = `${API_AUTH}/alterar-senha`;
export const API_AUTH_CHANGE_PASSWORD_CUSTOMER = `${API_AUTH}/atualizar-usuario-nao-logado`;
export const API_AUTH_VERIFY_OTP = `${API_AUTH}/verificar-otp`;
export const API_REPORT = `/report`;
export const API_REPORT_LAST_USER_LOGIN = `${API_REPORT}/login/ultimo`;
// API - Other Routes ---------------------------------
export const API_PERMISSIONS = `/permissoes`;
export const API_PERFIS = `/perfis`;
export const API_USERS = `${API_AUTH}/usuarios`;
export const API_HABILITAR_USUARIO = `${API_AUTH}/habilitar-usuario`;
export const API_DESABILITAR_USUARIO = `${API_AUTH}/desabilitar-usuario`;
export const API_ATUALIZAR_USUARIO = `${API_AUTH}/atualizar-usuario`;
export const API_REGISTRAR_USUARIO = `${API_AUTH}/registrar-usuario`;
export const API_ADD_PERFIL_TO_USUARIO = `${API_AUTH}/atualizar-perfil`;
// BUCKET - V1 -------------------------------------
export const BUCKET_BASE_URL = process.env.NEXT_PUBLIC_BUCKET_BASE_URL || "";
export const BUCKET_STATIC_IMAGES_WEBP = `${BUCKET_BASE_URL}/static/images/f_webp`;
// PAGES WEBAPP ---------------------------------
export const PATH_PAGE = "/";
// PAGES WEBAPP - ACCOUNTS ----------------------
export const PATH_PAGE_ACCOUNTS = "/accounts";
export const PATH_PAGE_ACCOUNTS_LOGIN = `${PATH_PAGE_ACCOUNTS}/login`;
export const PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION = `${PATH_PAGE_ACCOUNTS_LOGIN}/2fa-verification`;
export const PATH_PAGE_ACCOUNTS_REGISTER = `${PATH_PAGE_ACCOUNTS}/register`;
export const PATH_PAGE_ACCOUNTS_RECOVERY = `${PATH_PAGE_ACCOUNTS}/recovery`;
export const PATH_PAGE_ACCOUNTS_RECOVERY_SUCCESS = `${PATH_PAGE_ACCOUNTS_RECOVERY}/success`;
export const PATH_PAGE_ACCOUNTS_RECOVERY_EMAIL = `${PATH_PAGE_ACCOUNTS_RECOVERY}/email`;
// PAGES WEBAPP - PRIVATE ----------------------
export const PATH_PAGE_HOME = "/home";
export const PATH_PAGE_MANAGE = "/manage";
