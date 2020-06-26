import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SEO'
import PkgContent from '../components/PkgContent/PkgContent'
import { getSiteConfig } from '../utils'

const Content = styled.div`
`

const Loading = styled.p`
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
`

const Error = styled.p`
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
  color: #d7604b;
`

interface PkgPageProps {
  location: Location
}

const PkgPage = ({ location }: PkgPageProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pkg, setPkg] = useState(null)
  const [version, setVersion] = useState('latest')
  const siteConfig = getSiteConfig(location.pathname)
  const url = new URL(location.href)
  const { pathname } = url
  const index = pathname.indexOf('/pkg/')
  const pkgPath = pathname.slice(index + 5)
  const tab = url.searchParams.get('tab')
  const onVersionChange = (version) => {
    setVersion(version)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await axios.get(`https://pkg.goproxy.io/pkg/github.com/urfave/cli/@v/${version}`)
        setPkg(res.data)
      } catch (err) {
        console.error(err)
        let message = ''
        if (err.response) {
          message += err.response.status + '! '
        }
        message += 'Failed to fetch package\'s data'
        setError(message)
      }
      setLoading(false)
    }
    fetchData()
    return () => {
      setError('')
    }
  }, [version])
  let content = null
  if (loading) {
    content = <Loading>Loading...</Loading>
  } else if (error) {
    content = <Error>{ error }</Error>
  } else if (pkg) {
    content = <PkgContent pkg={pkg} tab={tab} onVersionChange={onVersionChange} />
  }
  return (
    <Layout siteConfig={siteConfig} location={location}>
      <SEO title="Package" />
      <Content>
        {content}
      </Content>
    </Layout>
  )
}

export default PkgPage
