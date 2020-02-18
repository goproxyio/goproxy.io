import React from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO/SEO"
import { getSiteConfig } from "../utils"

const NotFoundPage = ({ location }) => {
  const siteConfig = getSiteConfig(location.pathname)
  return (
    <Layout siteConfig={siteConfig} location={location}>
      <SEO title="404: Not found" />
      <div className="wrapper" style={{ marginTop: 100, textAlign: 'center' }}>
        <h1>{siteConfig.notFound.title}</h1>
        <p>{siteConfig.notFound.description}</p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
