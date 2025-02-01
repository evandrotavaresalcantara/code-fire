import { NavItemType } from "@/types";
import {
  IconHome,
  IconLicense,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

export const navItems: NavItemType[] = [
  {
    id: "navMain",
    type: "group",
    items: [
      {
        id: "home",
        title: "Home",
        url: "/home",
        icon: IconHome,
        type: "item",
      },
    ],
  },
  {
    id: "primario",
    title: "Gerenciar",
    type: "group",
    items: [
      {
        id: "manege",
        title: "Usuários",
        url: "/manage",
        icon: IconUsersGroup,
        type: "item",
      },
    ],
  },
  {
    id: "secundário",
    title: "Roles",
    type: "group",
    items: [
      {
        id: "perfis",
        title: "Perfis",
        url: "/perfis",
        icon: IconUsers,
        type: "item",
      },

      {
        id: "permissoes",
        title: "Permissoes",
        url: "/permissoes",
        icon: IconLicense,
        type: "item",
      },
    ],
  },
];
