/* eslint-disable @typescript-eslint/no-explicit-any */

export type NavItemType = {
    id: string; 
    title?: string,
    url?: string,
    icon?: any,
    type: "group" | "item" | "collapsible",
    disabled?: boolean,
    items?: NavItemType[]
}