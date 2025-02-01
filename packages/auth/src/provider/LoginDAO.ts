export interface LoginDAO {
  salvar(
    userEmail: string,
    loginType: string,
    is2fa: boolean,
    loginDate: Date,
  ): Promise<void>;

  obterUltimoPeloEmail(userEmail: string): Promise<{
    userEmail: string;
    loginType: string;
    is2fa: boolean;
    loginDate: Date;
  } | null>;

  obterTodosDoUsuarioPeloEmail(userEmail: string): Promise<
    {
      userEmail: string;
      loginType: string;
      is2fa: boolean;
      loginDate: Date;
    }[]
  >;
}
