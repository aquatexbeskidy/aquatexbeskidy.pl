// ─────────────────────────────────────────
// Base Types
// ─────────────────────────────────────────
export type ButtonType = 'buttonPrimary' | 'buttonSecondary' | 'buttonTertiary'

export interface Meta {
  title: string
  description: string
  permalink: string
}

export interface Button {
  title: string
  link: string
  type: ButtonType
}

export interface TextButton {
  text: string
  url: string
  type: string
  icon?: string
}

export interface ImageItem {
  image: string
}

// ─────────────────────────────────────────
// Navigation Types
// ─────────────────────────────────────────
export interface NavLink {
  text: string
  url: string
  type: string
  icon?: string
  specialClass?: string
}

export interface NavigationData {
  title: string
  links: NavLink[]
}

// ─────────────────────────────────────────
// Footer Types
// ─────────────────────────────────────────
export interface FooterLink {
  text: string
  url: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
  type: string
}

export interface QuickContactLink {
  text: string
  url: string
  type: string
  icon: string
}

export interface QuickContact {
  title: string
  desc: string
  link: QuickContactLink[]
}

export interface NomadsCode {
  madeBy: string
  name: string
  url: string
  icon: string
}

export interface FooterData {
  title: string
  copyright: string
  atbLogo: string
  nomadsCodes: NomadsCode[]
  quickContact: QuickContact
  links: FooterSection[]
}

// ─────────────────────────────────────────
// Component Data Types
// ─────────────────────────────────────────
export interface FeatureLink {
  title: string
  url: string
}

export interface Feature {
  title: string
  icon?: string
  link?: FeatureLink
  desc?: string
  image?: string
}

export interface Opinion {
  user: string
  message: string
}

export interface FAQItem {
  title: string
  content: string
  icon?: string
}

export interface Review {
  description: string
  image: string
}

export interface Video {
  title: string
  date: string
  videoId: string
  videoTitle: string
}

// ─────────────────────────────────────────
// Home Page Types
// ─────────────────────────────────────────
export interface HomeCountUp {
  title: string
  subTitle: string
  count: number
  score: string
  iconSmile: string
  iconStars: string
  iconGoogle: string
  googleOpinions: string
  opinions: Opinion[]
}

export interface MoreAdvantages {
  title: string
  advantages: Feature[]
}

export interface Advantages {
  title: string
  advList: Feature[]
}

export interface Spot {
  videoId: string
  videoTitle: string
}

export interface HowWorks {
  heading: string
  image: string
  buttons: Button[]
}

export interface FAQ {
  headline: string
  list: FAQItem[]
}

export interface HomeHero {
  title: string
  subtitle?: string
  image: string
  buttons?: Button[]
}

export interface HomePageContent {
  title: string
  meta: Meta
  hero: HomeHero
  homeCountUp?: HomeCountUp
  moreAdvantages?: MoreAdvantages
  features?: Feature[]
  spot?: Spot
  masSpot?: Spot
  reviews?: Review[]
  advantages?: Advantages
  howWorks?: HowWorks
  faq?: FAQ
}

// ─────────────────────────────────────────
// About Page Types
// ─────────────────────────────────────────
export interface ContentItem {
  desc: string
}

export interface ContentBlock {
  title: string
  contentList: ContentItem[]
}

export interface WhyUsItem {
  title: string
  desc: string
}

export interface AboutData {
  mainTitle: string
  contentBlocks: ContentBlock[]
  viewOfWorkImgList: ImageItem[]
  subTitle: string
  whyUsList: WhyUsItem[]
}

export interface AboutPageContent {
  title: string
  meta: Meta
  about: AboutData
}

// ─────────────────────────────────────────
// Contact Page Types
// ─────────────────────────────────────────
export interface ContactData {
  title: string
  subTitle: string
  pinTitle: string
  pinDesc: string
  buttons: TextButton[]
}

export interface ContactPageContent {
  title: string
  meta: Meta
  contact: ContactData
}

// ─────────────────────────────────────────
// Offer Page Types
// ─────────────────────────────────────────
export interface OfferItem {
  title: string
  price: string
}

export interface QuickOfferItem {
  title: string
  icon: string
  desc: string
}

export interface LinkItem {
  text: string
  url: string
  type: string
}

export interface OfferData {
  mainTitle: string
  mainContent: string
  subContent: string
  bonusInfo: string
  bonusInfoStrong: string
  quickOfferTitle: string
  quickOfferList: QuickOfferItem[]
  link: LinkItem[]
  subTitle: string
  offerList: OfferItem[]
  reviewImgList: ImageItem[]
}

export interface OfferPageContent {
  title: string
  meta: Meta
  offer: OfferData
}

// ─────────────────────────────────────────
// Works Page Types
// ─────────────────────────────────────────
export interface WorksPageContent {
  title: string
  meta: Meta
  photosTitle: string
  videosTitle: string
  videos: Video[]
}

// ─────────────────────────────────────────
// Deep Well Page Types
// ─────────────────────────────────────────
export interface AdditionItem {
  description: string
  contentList: ContentItem[]
  image: string
}

export interface DeepWellData {
  mainTitle: string
  mainContent: string
  bonusContent: string
  additionList: AdditionItem[]
  waterSearchTitle: string
  waterSearchDesc: string
  waterSearchId: string
  waterConnectTitle: string
  waterConnectDesc: string
  waterConnectId: string
}

export interface DeepWellPageContent {
  title: string
  meta: Meta
  deepWell: DeepWellData
}

// ─────────────────────────────────────────
// Borehole Page Types
// ─────────────────────────────────────────
export interface BoreholeData {
  mainTitle: string
  mainContent: string
  equipmentImgList: ImageItem[]
  subContent: string
}

export interface BoreholePageContent {
  title: string
  meta: Meta
  borehole: BoreholeData
}

// ─────────────────────────────────────────
// Privacy Policy Page Types
// ─────────────────────────────────────────
export interface PrivacyPolicyPageContent {
  title: string
  meta: Meta
}

// ─────────────────────────────────────────
// Novelties Types
// ─────────────────────────────────────────
export interface NoveltyItem {
  title: string
  slug: string
  url: string
  image: string
  date: string
  showDate: boolean
  type: 'novelties'
  published: boolean
  excerpt?: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// ─────────────────────────────────────────
// Global Content Types
// ─────────────────────────────────────────
export interface CallMeUpData {
  title: string
  icon: string
  url: string
}

export interface FacebookData {
  title: string
  icon: string
  url: string
}

export interface YoutubeData {
  title: string
  icon: string
  url: string
}

export interface GlobalContent {
  title: string
  callMeUp: CallMeUpData
  facebook: FacebookData
  youtube?: YoutubeData
  infoBar?: string
}

// ─────────────────────────────────────────
// Layout Types
// ─────────────────────────────────────────
export interface HeaderData {
  topLinks: NavLink[]
  bottomLinks: NavLink[]
  infoBar: string
}

export interface LayoutData {
  header: HeaderData
  footer: FooterData
  siteTitle: string
}
