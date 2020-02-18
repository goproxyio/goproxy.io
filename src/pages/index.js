import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SEO'
import Intro from '../components/Intro/Intro'
import HomeContent from '../components/HomeContent/HomeContent'
import FeatureList from '../components/FeatureList/FeatureList'
import UserMap from '../components/UserMap/UserMap'
import { getSiteConfig } from '../utils'

const IndexPage = ({ data, location }) => {
  const siteConfig = getSiteConfig(location.pathname)
  const { title, slogan, features, userMapTitle } = siteConfig
  return (
    <Layout location={location} siteConfig={siteConfig}>
      <SEO title={title} />
      <Intro slogan={slogan} />
      <HomeContent html={data.markdownRemark.html} />
      <FeatureList features={features} />
      <UserMap title={userMapTitle} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomeContent($homeContentSlug: String!) {
    markdownRemark(fields: { slug: { eq: $homeContentSlug } }) {
      html
    }
  }
`

export default IndexPage
