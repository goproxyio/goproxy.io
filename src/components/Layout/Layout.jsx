/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../../base.css'
import styles from './Layout.module.css'

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
      <main className={styles.main}>{children}</main>
      <Footer siteConfig={siteConfig} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
