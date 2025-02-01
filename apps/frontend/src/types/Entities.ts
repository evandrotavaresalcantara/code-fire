export type Usuario = {
    id?: string,
    nome: string,
    email: string,
    senha?: string,
    senhaConfirmacao?: string,
    telefone?: string,
    urlPerfil?: string,
    ativo?: boolean,
    perfis?: Perfil[],
    doisFatores?: boolean,
    sisAdmin?: boolean,
} 

export type Perfil = {
    id: string,
    nome: string,
    descricao: string,
    ativo?: boolean,
    dataCriacao?: Date | string,
    permissoes: Permissao[],
}

export type Permissao = {
    id:string,
    nome: string,
    descricao: string,
    ativo?: boolean,
    dataCriacao?: Date | string,
}