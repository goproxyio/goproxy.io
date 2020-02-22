import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

interface SEOProps {
  lang?: string
  title?: string
  description?: string
  author?: string
}
const SEO = ({ lang, title, description, author }: SEOProps) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
    >
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: 'zh-CN',
  title: '',
  description: '',
  author: ''
}

export default SEO
