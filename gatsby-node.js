const path = require('path')
const _ = require('lodash')
const axios = require('axios')
const moment = require('moment')
const locales = require('./content/locales.json')

const docNodes = []
const docNodesBySlug = {}

function addSiblingNodes(createNodeField) {
  for (let i = 0; i < docNodes.length; i += 1) {
    const docNode = docNodes[i]
    const { prev, next } = docNode.frontmatter
    const prevNode = docNodesBySlug[prev]
    const nextNode = docNodesBySlug[next]
    let prevSlug = ''
    let prevTitle = ''
    if (prevNode) {
      prevSlug = prevNode.fields.slug
      prevTitle = prevNode.frontmatter.title
    }
    let nextSlug = ''
    let nextTitle = ''
    if (nextNode) {
      nextSlug = nextNode.fields.slug
      nextTitle = nextNode.frontmatter.title
    }
    createNodeField({
      node: docNode,
      name: 'prevSlug',
      value: prevSlug
    })
    createNodeField({
      node: docNode,
      name: 'prevTitle',
      value: prevTitle
    })
    createNodeField({
      node: docNode,
      name: 'nextSlug',
      value: nextSlug
    })
    createNodeField({
      node: docNode,
      name: 'nextTitle',
      value: nextTitle
    })
  }
}

const remoteMarkdowns = []

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  try {
    const runCreateNode = async ({ url, path, frontmatter }, index) => {
      const { data } = await axios.get(url)
      const hasFrontmatter = /^---[\w\W]+---/.test(data)
      let content = data
      if (!hasFrontmatter) {
        content = `---\n${frontmatter || ''}\n---\n${content}`
      }
      const node = {
        id: createNodeId(`remote-markdown-${index}`),
        parent: null,
        children: [],
        relativePath: path,
        internal: {
          type: 'RemoteMarkdown',
          mediaType: 'text/markdown',
          content: content,
          contentDigest: createContentDigest(content)
        }
      }
      createNode(node)
    }
    const tasks = remoteMarkdowns.map(runCreateNode)
    await Promise.all(tasks)
  } catch (err) {
    console.error(err)
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let type
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.dir === '') {
      type = 'common'
      slug = `/${parsedFilePath.name}.html`
    } else {
      const firstSlashIndex = parsedFilePath.dir.indexOf('/')
      type = firstSlashIndex > -1 ? parsedFilePath.dir.slice(0, firstSlashIndex) : parsedFilePath.dir
      locales.forEach((locale) => {
        const re = new RegExp(`${locale.value}\\/`)
        if (re.test(parsedFilePath.dir)) {
          const dir = parsedFilePath.dir.replace(re, '') + '/'
          const firstSlashIndex = dir.indexOf('/')
          type = firstSlashIndex > -1 ? dir.slice(0, firstSlashIndex) : dir
        }
      })
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}.html`
    }

    if (_.has(node, 'frontmatter')) {
      if (_.has(node.frontmatter, 'createdAt')) {
        const createdAt = moment(node.frontmatter.createdAt)
        if (!createdAt.isValid) {
          console.warn(`WARNING: Invalid createdAt.`, node.frontmatter)
        }

        createNodeField({
          node,
          name: 'createdAt',
          value: createdAt.toISOString()
        })
      }
      if (_.has(node.frontmatter, 'updatedAt')) {
        const updatedAt = moment(node.frontmatter.updatedAt)
        if (!updatedAt.isValid) {
          console.warn(`WARNING: Invalid updatedAt.`, node.frontmatter)
        }

        createNodeField({
          node,
          name: 'updatedAt',
          value: updatedAt.toISOString()
        })
      }
    }

    createNodeField({ node, name: 'type', value: type })
    createNodeField({ node, name: 'slug', value: slug })
    docNodes.push(node)
    docNodesBySlug[slug] = node
  }
}

exports.createSchemaCustomization = ({ type, actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: FrontMatter
      fields: Fields
    }
    type FrontMatter {
      title: String!
      author: String
      prev: String
      next: String
      toc: Boolean
    }

    type Fields {
      type: String!
      slug: String!
      createdAt: Date
      updatedAt: Date
      prevSlug: String
      prevTitle: String
      nextSlug: String
      nextTitle: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  const otherLocales = locales.filter(v => v.value !== 'en')
  const homeContentSlug = '/home-content.html'
  page.context.homeContentSlug = homeContentSlug
  createPage(page)
  otherLocales.forEach(v => {
    const clonedPage = _.cloneDeep(page)
    clonedPage.path = `/${v.value}${clonedPage.path}`
    clonedPage.context.homeContentSlug = `/${v.value}${homeContentSlug}`
    createPage(clonedPage)
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createNodeField } = actions

  addSiblingNodes(createNodeField)

  return new Promise((resolve, reject) => {
    const docPage = path.resolve('src/templates/doc.jsx')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: docPage,
            context: {
              slug: edge.node.fields.slug
            }
          })
        })
      })
    )
  })
}

// Fix issue: https://github.com/gatsbyjs/gatsby/issues/17661
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
