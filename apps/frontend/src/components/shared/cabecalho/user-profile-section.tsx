"use client";
import { UserInfoSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context";
import { pegarIniciais } from "@/lib";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function UserProfileSection() {
  const { name, email, urlPerfil, logout, loading, id } = useAuth();

  if (loading) return <UserInfoSkeleton />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 px-2 max-w-56 items-center py-1 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent cursor-pointer">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={urlPerfil || ""} alt={name} />
            <AvatarFallback className="bg-zinc-600">
              {pegarIniciais(name!)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs text-zinc-400">{email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-40 rounded-lg">
        <Link href={`/user/${id}`}>
          <DropdownMenuItem>
            <User />
            <span>Perfil</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
