import _ from 'lodash'
import enDocsNav from '../../content/docs/nav.yml'
import zhDocsNav from '../../content/zh/docs/nav.yml'
import { defaultLocale } from '.'

const navSource = {
  enDocsNav,
  zhDocsNav
}

const initNav = (locale, type) => {
  const initDocsNav = parent => parent.children.forEach((item) => {
    item.parent = parent
    item.path = parent.path.concat(item)
    item.url = `/${type}/${item.id}.html`
    if (locale !== defaultLocale) {
      item.url = `/${locale}${item.url}`
    }
    if (item.children) initDocsNav(item)
  })
  const source = navSource[`${locale}${_.capitalize(type)}Nav`]
  const root = {
    parent: null,
    path: [],
    children: _.cloneDeep(source)
  }

  initDocsNav(root)

  return root
}

const types = ['docs']

const getSidebarData = (locale) => {
  const data = {}

  _.forEach(types, type => {
    data[type] = initNav(locale, type)
  })

  return data
}

export default getSidebarData
