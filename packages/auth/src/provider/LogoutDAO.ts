export interface LogoutDAO {
  salvar(userEmail: string, logoutDate: Date): Promise<void>;

  obterTodosDoUsuarioPeloEmail(userEmail: string): Promise<
    {
      userEmail: string;
      logoutDate: Date;
    }[]
  >;
}
