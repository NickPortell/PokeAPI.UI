export interface NavItem {
key: string, value: string
}

export type NavigationProps = {
    routes: NavItem[];
    children: React.ReactNode;
}