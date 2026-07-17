export interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

export interface DropdownPanel {
  heading: string;
  items: DropdownItem[];
}

export interface DropdownFeatured {
  title: string;
  description: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  panels?: DropdownPanel[];
  featured?: DropdownFeatured;
}

export interface NavigationData {
  items: NavItem[];
}