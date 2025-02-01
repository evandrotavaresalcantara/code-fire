import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pegarIniciais(nome: string) {
  if(!nome) return "";

  const nomes = nome.trim().split(" ").slice(0,2);
  const iniciais = nomes.length > 1 ? nomes.map( value => value.charAt(0).toUpperCase()).join("") : nomes[0].slice(0,2).toLocaleUpperCase();

  return iniciais;
}