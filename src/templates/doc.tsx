import { graphql, Link } from 'gatsby'
import React, { Ref, useRef, useEffect } from 'react'
import _ from 'lodash'
import scrollY from 'micell/dom/scrollY'
import scrollTo from 'micell/dom/scrollTo'
import formatDate from 'micell/date/format'
import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SEO'
import Sidebar from '../components/Sidebar/Sidebar'
import MarkdownContent from '../components/MarkdownContent/MarkdownContent'
import getSidebarData from '../utils/getSidebarData'
import styles from './doc.module.css'
import { SiteConfig, getSiteConfig, getLocale } from '../utils'

interface Frontmatter {
  title: string
  author?: string
  toc?: boolean
  createdAt?: string
  updatedAt?: string
}

interface Fields {
  type: string
  createdAt?: string
  updatedAt?: string
  prevSlug?: string
  prevTitle?: string
  nextSlug?: string
  nextTitle?: string
}

interface MarkdownRemark {
  html: string
  frontmatter: Frontmatter
  tableOfContents: string
  fields: Fields
}

interface PageData {
  markdownRemark: MarkdownRemark
}

interface DocTemplateProps {
  data: PageData
  location: Location
}

const DocTemplate = ({ data, location }: DocTemplateProps) => {
  const siteConfig = getSiteConfig(location.pathname)
  const locale = getLocale(location.pathname)
  const sidebarData = getSidebarData(locale)
  const { dateFormat, doc } = siteConfig
  const docNode = data.markdownRemark
  const { html, frontmatter, tableOfContents, fields } = docNode
  const { title, author, toc } = frontmatter
  const { type, createdAt, updatedAt, prevSlug, prevTitle, nextSlug, nextTitle } = fields
  const tocEl: Ref<HTMLDivElement> = useRef(null)
  useEffect(() => {
    if (tocEl.current === null) return
    const anchors = tocEl.current.querySelectorAll('a[href]')
    const onClick = (e: Event) => {
      e.preventDefault()
      const anchor = e.target as HTMLAnchorElement
      const hashIndex = anchor.href.indexOf('#')
      const hash = anchor.href.slice(hashIndex + 1)
      const id = decodeURIComponent(hash)
      const el = document.getElementById(id)
      if (!el) return
      const { top } = el.getBoundingClientRect()
      const y = scrollY() + top - 102
      const { pathname, search } = location
      window.history.replaceState(null, '', `${pathname}${search}#${hash}`)
      scrollTo({ x: 0, y, behavior: 'smooth' })
    }
    _.forEach(anchors, (anchor: Element) => {
      anchor.addEventListener('click', onClick)
    })

    const onScroll = _.throttle(() => {
      if (tocEl.current === null) return
      const anchors = tocEl.current.querySelectorAll('a[href]')
      let activeAnchor: Element | null = null
      _.forEach(anchors, (anchor: Element, i: number) => {
        const hashIndex = (anchor as HTMLAnchorElement).href.indexOf('#')
        const id = decodeURIComponent((anchor as HTMLAnchorElement).href.slice(hashIndex + 1))
        const el = document.getElementById(id)
        if (!el) return
        const { top } = el.getBoundingClientRect()
        anchor.classList.remove('active')
        if (top < window.innerHeight / 4) {
          activeAnchor = anchor
        }
      })
      if (activeAnchor !== null) (activeAnchor as HTMLAnchorElement).classList.add('active')
    }, 100)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      _.forEach(anchors, (anchor: Element) => {
        anchor.removeEventListener('click', onClick)
      })
    }
  })

  let justifyContent = 'flex-start'
  if (prevSlug && nextSlug) {
    justifyContent = 'space-between'
  }
  if (!prevSlug && nextSlug) {
    justifyContent = 'flex-end'
  }

  return (
    <Layout siteConfig={siteConfig} location={location}>
      <SEO title={title} />
      <div className={styles.doc}>
        <div className={styles.entry}>
          <h1 className={styles.title}>{title}</h1>
          {(frontmatter.author && frontmatter.createdAt && createdAt) && (
            <div className={styles.meta}>
              <span className={styles.author}>{author}</span>
              <span>{doc.postAt}</span>
              <time className={styles.createDate} dateTime={createdAt}>
                {formatDate(new Date(createdAt), dateFormat)}
              </time>
            </div>
          )}
          <MarkdownContent html={html} />
          {frontmatter.updatedAt && updatedAt && <div className={styles.bottom}>
            <span className={styles.updateLabel}>{doc.updatedAt}</span>
            <time className={styles.updateDate} dateTime={updatedAt}>
              {formatDate(new Date(updatedAt), dateFormat)}
            </time>
          </div>}
          {(prevSlug || nextSlug) && (
            <div className={styles.docNav} style={{ justifyContent }}>
              {prevSlug ?
                <div className={styles.prev}>
                  <div className={styles.navLabel}>{doc.prev}</div>
                  <div className={styles.navTitle}>
                    <Link to={prevSlug}>← {prevTitle}</Link>
                  </div>
                </div> : null}
              {nextSlug ?
                <div className={styles.next}>
                  <div className={styles.navLabel}>{doc.next}</div>
                  <div className={styles.navTitle}>
                    <Link to={nextSlug}>{nextTitle} →</Link>
                  </div>
                </div> : null}
            </div>
          )}
        </div>
        <div
          className={styles.toc}
          style={{ visibility: toc === false ? 'hidden' : 'visible'}}
          ref={tocEl}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
        {sidebarData[type] && <Sidebar nav={sidebarData[type]} location={location} />}
      </div>
    </Layout>
  )
}

export default DocTemplate

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(
        absolute: false,
        maxDepth: 3
      )
      frontmatter {
        title
        author
        toc
      }
      fields {
        type
        createdAt
        updatedAt
        prevSlug
        prevTitle
        nextSlug
        nextTitle
      }
    }
  }
`
