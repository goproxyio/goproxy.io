import { graphql, Link } from 'gatsby'
import React, { Ref, useRef, useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import scrollY from 'micell/dom/scrollY'
import scrollTo from 'micell/dom/scrollTo'
import formatDate from 'micell/date/format'
import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SEO'
import Sidebar from '../components/Sidebar/Sidebar'
import MarkdownContent from '../components/MarkdownContent/MarkdownContent'
import getSidebarData from '../utils/getSidebarData'
import { getSiteConfig, getLocale } from '../utils'

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
  sourceFileUrl?: string
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 16px;

  @media (min-width: 960px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin-top: 0;
    padding: 0;
  }
  @media (min-width: 1400px) {
    padding: 0 16px;
  }
`

// min-width: 0; https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow
const Entry = styled.div`
  @media (min-width: 960px) {
    margin: 36px 0;
    width: 100%;
    max-width: 900px;
    min-width: 0;
    min-height: calc(100vh - 246px);
    padding: 0 32px;
  }
`

const Title = styled.h1`
  border-bottom: 2px solid #eee;

  @media (min-width: 960px) {
    margin-top: 0;
    padding-bottom: 8px;
  }
`

const Author = styled.span`
  margin-right: 4px;
  font-weight: 700;
`

const CreateDate = styled.time`
  margin-left: 4px;
  color: #777;
`

const Bottom = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const UpdateDateLabel = styled.span`
  margin-right: 8px;
  font-weight: 500;
  color: #444;
`

const UpdateDateValue = styled.time`
  color: #777;
`

const EditLink = styled.a`
  color: #777;

  &:hover {
    color: #333;
  }
`

const DocNav = styled.div`
  margin: 32px 0 16px;
  border-top: 1px solid #eee;
  text-align: center;

  @media (min-width: 960px) {
    display: flex;
  }
`

const DocNavItem = styled.div`
  padding: 32px 0 8px;
`

const NavLabel = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: #777;
`

const NavTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const Toc = styled.div`
  display: none;

  @media (min-width: 1280px) {
    position: sticky;
    top: 112px;
    display: block;
    order: 1;
    flex: 240px 0 0;
    margin-top: 36px;
    padding: 0 16px 16px 0;
    min-height: 100px;
    max-height: calc(100vh - 112px);
    overflow: auto;
    border-left: 1px solid #e4e4e4;
    font-size: 14px;

    & ul {
      margin: 0 0 0 16px;
      padding: 0;
      list-style: none;
    }

    & li {
      margin-bottom: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }

      & ul {
        margin-top: 8px;
      }
    }

    & p {
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & a {
      color: #777;
    }

    & a:hover {
      color: #aaa;
      text-decoration: none;
    }

    & .active,
    & .active:hover {
      color: #03A9F4;
    }

    & code[class*=language-] {
      background: transparent;
      color: inherit;
      white-space: inherit;
    }
  }
`

const DocTemplate = ({ data, location }: DocTemplateProps) => {
  const siteConfig = getSiteConfig(location.pathname)
  const locale = getLocale(location.pathname)
  const sidebarData = getSidebarData(locale)
  const { dateFormat, doc } = siteConfig
  const docNode = data.markdownRemark
  const { html, frontmatter, tableOfContents, fields } = docNode
  const { title, author, toc } = frontmatter
  const { type, createdAt, updatedAt, sourceFileUrl, prevSlug, prevTitle, nextSlug, nextTitle } = fields
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

  let bottomJustifyContent = 'flex-end'
  if (frontmatter.updatedAt && updatedAt) {
    bottomJustifyContent = 'space-between'
  }

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
      <Container>
        <Entry>
          <Title>{title}</Title>
          {(frontmatter.author && frontmatter.createdAt && createdAt) && (
            <div>
              <Author>{author}</Author>
              <span>{doc.postAt}</span>
              <CreateDate dateTime={createdAt}>
                {formatDate(new Date(createdAt), dateFormat)}
              </CreateDate>
            </div>
          )}
          <MarkdownContent
            html={html}
            copyText={doc.copy}
            copiedText={doc.copied}
          />
          <Bottom style={{ justifyContent: bottomJustifyContent }}>
            {frontmatter.updatedAt && updatedAt &&
              <div>
                <UpdateDateLabel>{doc.updatedAt}</UpdateDateLabel>
                <UpdateDateValue dateTime={updatedAt}>
                  {formatDate(new Date(updatedAt), dateFormat)}
                </UpdateDateValue>
              </div>}
            {sourceFileUrl &&
              <EditLink
                href={sourceFileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >{doc.edit}</EditLink>
            }
          </Bottom>
          {(prevSlug || nextSlug) && (
            <DocNav style={{ justifyContent }}>
              {prevSlug ?
                <DocNavItem>
                  <NavLabel>{doc.prev}</NavLabel>
                  <NavTitle>
                    <Link to={prevSlug}>← {prevTitle}</Link>
                  </NavTitle>
                </DocNavItem> : null}
              {nextSlug ?
                <DocNavItem>
                  <NavLabel>{doc.next}</NavLabel>
                  <NavTitle>
                    <Link to={nextSlug}>{nextTitle} →</Link>
                  </NavTitle>
                </DocNavItem> : null}
            </DocNav>
          )}
        </Entry>
        <Toc
          style={{ visibility: toc === false ? 'hidden' : 'visible'}}
          ref={tocEl}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
        {sidebarData[type] && <Sidebar nav={sidebarData[type]} location={location} />}
      </Container>
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
        createdAt
        updatedAt
        toc
      }
      fields {
        type
        sourceFileUrl
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
