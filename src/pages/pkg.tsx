import React from 'react'
import { Router } from '@reach/router'

import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SEO'
import PkgContent from '../components/PkgContent/PkgContent'
import { getSiteConfig } from '../utils'

interface PkgPageProps {
  location: Location
}

const PkgPage = ({ location }: PkgPageProps) => {
  const siteConfig = getSiteConfig(location.pathname)
  return (
    <Layout siteConfig={siteConfig} location={location}>
      <SEO title="Package" />
      <Router basepath="/pkg">
        <PkgContent path="*" location={location} />
      </Router>
    </Layout>
  )
}

export default PkgPage
