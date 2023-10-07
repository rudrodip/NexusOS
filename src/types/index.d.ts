import type { Icon } from "lucide-react"
import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  workspaceNav: SidebarNavItem[]
}


export type GuideConfig = {
  steps: StepConfig[]
}

export type FeatureConfig = {
  name: string,
  desc: string,
  imageUrl: string,
}

export type FeaturesConfig = {
  features: FeatureConfig[]
}

export type PriceConfig = {
  name: string;
  description: string;
  features: string[];
  price: string;
};

export type PriceConfigs = {
  [key: string]: PriceConfig;
};

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type labelValuePair = {
  value: string;
  label: string;
}