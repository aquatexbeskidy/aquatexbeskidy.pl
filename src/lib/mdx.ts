import type {
  FooterData,
  GlobalContent,
  LayoutData,
  NavigationData,
  NoveltyItem,
  PaginationInfo,
} from '@/types/content'

import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/markdown')
const ITEMS_PER_PAGE = 5

export async function getPageContent<T = Record<string, unknown>>(
  slug: string,
): Promise<{ frontmatter: T; content: string }> {
  const filePath = path.join(CONTENT_DIR, 'pages', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Page content not found: ${slug}`)
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    content,
    frontmatter: data as T,
  }
}

export async function getGlobalContent(): Promise<GlobalContent> {
  const filePath = path.join(CONTENT_DIR, 'globals', 'content.mdx')
  const source = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(source)

  return data as GlobalContent
}

export async function getNavigationData<T = NavigationData>(name: string): Promise<T> {
  const filePath = path.join(CONTENT_DIR, 'navigations', `${name}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(source)

  return data as T
}

export async function getAllNovelties(): Promise<NoveltyItem[]> {
  const dir = path.join(CONTENT_DIR, 'novelties')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  const novelties = files
    .map((file): NoveltyItem | null => {
      const source = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(source)

      if (data.published === false) {
        return null
      }

      return {
        date: data.date as string,
        excerpt: content.slice(0, 200).trim(),
        image: data.image as string,
        published: (data.published ?? true) as boolean,
        showDate: (data.showDate ?? true) as boolean,
        slug: (data.slug || file.replace('.mdx', '')) as string,
        title: data.title as string,
        type: 'novelties' as const,
        url: data.url as string,
      }
    })
    .filter((item): item is NoveltyItem => item !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return novelties
}

export async function getPaginatedNovelties(page: number): Promise<{
  items: NoveltyItem[]
  pageInfo: PaginationInfo
}> {
  const allNovelties = await getAllNovelties()
  const totalPages = Math.ceil(allNovelties.length / ITEMS_PER_PAGE)
  const offset = (page - 1) * ITEMS_PER_PAGE
  const items = allNovelties.slice(offset, offset + ITEMS_PER_PAGE)

  return {
    items,
    pageInfo: {
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      totalPages,
    },
  }
}

export async function getNoveltiesPageCount(): Promise<number> {
  const allNovelties = await getAllNovelties()
  return Math.ceil(allNovelties.length / ITEMS_PER_PAGE)
}

export async function getLayoutData(): Promise<LayoutData> {
  const [headerTop, headerBottom, footer, globalContent] = await Promise.all([
    getNavigationData<NavigationData>('header_top'),
    getNavigationData<NavigationData>('header_bottom'),
    getNavigationData<FooterData>('footer'),
    getGlobalContent(),
  ])

  return {
    footer,
    header: {
      bottomLinks: headerBottom.links,
      infoBar: globalContent.infoBar || '',
      topLinks: headerTop.links,
    },
    siteTitle: 'AQUA-TEX Beskidy',
  }
}

export function resolveImagePath(imagePath: string): string {
  if (imagePath.startsWith('images/')) {
    return `/${imagePath}`
  }
  if (imagePath.startsWith('assets/')) {
    return `/${imagePath}`
  }
  return imagePath
}

export function stringIncludesHTML(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str)
}
