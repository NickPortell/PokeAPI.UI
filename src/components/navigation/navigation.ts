export interface NavItem {
key: string, value: string
}

export type NavigationProps = {
    id: string | undefined,
    routes: NavItem[];
    children: React.ReactNode;
}