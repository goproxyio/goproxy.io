/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../../base.css'

// TODO: use more precise computation
const Main = styled.main`
  min-height: calc(100vh - 340px);
`

const Layout = ({ siteConfig, location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteNameQuery {
      site {
        siteMetadata {
          name
        }
      }
    }
  `)

  return (
    <>
      <Header siteConfig={siteConfig} location={location} siteName={data.site.siteMetadata.name} />
      <Main>{children}</Main>
      <Footer siteConfig={siteConfig} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
