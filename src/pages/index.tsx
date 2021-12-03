import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SEO'
import Intro from '../components/Intro/Intro'
import HomeContent from '../components/HomeContent/HomeContent'
import FeatureList from '../components/FeatureList/FeatureList'
import UserMap from '../components/UserMap/UserMap'
import { getSiteConfig } from '../utils'

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
  htmlAst: any
  frontmatter: Frontmatter
  tableOfContents: string
  fields: Fields
}

interface PageData {
  markdownRemark: MarkdownRemark
}

interface IndexPageProps {
  data: PageData
  location: Location
}

const IndexPage = ({ data, location }: IndexPageProps) => {
  const siteConfig = getSiteConfig(location.pathname)
  const { doc, title, slogan, features, userMapTitle } = siteConfig
  console.log(data.markdownRemark)
  return (
    <Layout location={location} siteConfig={siteConfig}>
      <SEO title={title} />
      <Intro slogan={slogan} />
      <HomeContent htmlAst={data.markdownRemark.htmlAst} copyText={doc.copy} copiedText={doc.copied} />
      <FeatureList features={features} />
      <UserMap title={userMapTitle} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomeContent($homeContentSlug: String!) {
    markdownRemark(fields: { slug: { eq: $homeContentSlug } }) {
      htmlAst
    }
  }
`

export default IndexPage
