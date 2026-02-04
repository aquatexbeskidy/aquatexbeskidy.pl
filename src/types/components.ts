import type {
  Button,
  ButtonType,
  FAQItem,
  Feature,
  FooterSection,
  NavLink,
  NomadsCode,
  Opinion,
  QuickContact,
  TextButton,
} from './content'

// ─────────────────────────────────────────
// Button Style Mapping
// ─────────────────────────────────────────
export type ButtonStyleMap = Record<ButtonType, string>

export const buttonStyles: ButtonStyleMap = {
  buttonPrimary: 'btn btn-primary',
  buttonSecondary: 'btn btn-secondary',
  buttonTertiary: 'btn btn-tertiary',
}

// ─────────────────────────────────────────
// Component Props
// ─────────────────────────────────────────
export interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  buttons?: Button[]
}

export interface HeaderProps {
  topLinks: NavLink[]
  bottomLinks: NavLink[]
  siteTitle: string
  infoBar: string
}

export interface FooterProps {
  links: FooterSection[]
  quickContact: QuickContact
  copyright: string
  nomadsCodes: NomadsCode[]
  siteTitle: string
}

export interface FeaturesProps {
  features: Feature[]
  title?: string
}

export interface CountUpProps {
  title: string
  subTitle?: string
  count: number
  score: string
  iconSmile?: string
  iconStars?: string
  iconGoogle?: string
  opinions: Opinion[]
  googleOpinions: string
}

export interface FAQProps {
  headline?: string
  list: FAQItem[]
}

export interface InfoBarProps {
  infoBar: string
}

// Re-export commonly used types for convenience
export type { Button, TextButton, NavLink, Feature, FAQItem, Opinion }
