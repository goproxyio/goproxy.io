import _ from 'lodash'
import enDocsNav from '../../content/docs/nav.yml'
import zhDocsNav from '../../content/zh/docs/nav.yml'
import { defaultLocale } from '.'

export interface DocsNavItem {
  id: string
  title: string
}

export interface AllDocsNav {
  [key: string]: DocsNavItem[]
}

const navSource = {
  enDocsNav: enDocsNav as DocsNavItem[],
  zhDocsNav: zhDocsNav as DocsNavItem[]
} as AllDocsNav

export interface DocsNavNode {
  id: string
  title: string
  parent?: DocsNavNode
  path?: DocsNavNode[]
  url?: string
  isActive?: boolean
  hasActive?: boolean
  children?: DocsNavNode[]
}

const initNav = (locale: string, type: string) => {
  const initDocsNav = (parent: DocsNavNode) => {
    if (parent && parent.children) {
      parent.children.forEach((item: DocsNavNode) => {
        item.parent = parent
        item.path = (parent.path || []).concat(item)
        item.url = `/${type}/${item.id}.html`
        if (locale !== defaultLocale) {
          item.url = `/${locale}${item.url}`
        }
        if (item.children) initDocsNav(item)
      })
    }
  }
  const source = navSource[`${locale}${_.capitalize(type)}Nav`]
  const root = {
    id: '',
    title: '',
    path: [],
    children: _.cloneDeep(source)
  } as DocsNavNode

  initDocsNav(root)

  return root
}

const types = ['docs']

interface SidebarData {
  [key: string]: DocsNavNode
}

const getSidebarData = (locale: string): SidebarData => {
  const data = {} as SidebarData

  _.forEach(types, (type: string) => {
    data[type] = initNav(locale, type)
  })

  return data
}

export default getSidebarData
