/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { SiteConfig } from '../../utils'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../../base.css'

// TODO: use more precise computation
const Main = styled.main`
  min-height: calc(100vh - 340px);
`

interface LayoutProps {
  siteConfig: SiteConfig
  location: Location
  children: ReactNode
}

const Layout = ({ siteConfig, location, children }: LayoutProps) => {
  return (
    <>
      <Header siteConfig={siteConfig} location={location} />
      <Main>{children}</Main>
      <Footer siteConfig={siteConfig} />
    </>
  )
}

export default Layout
