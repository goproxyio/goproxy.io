import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { navigate } from 'gatsby'

import Content from './Content'

const Container = styled.div`
  background: #f8f8f8;
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px 16px;
  max-width: 900px;
  min-height: calc(100vh - 174px);
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

interface PkgContentProps {
  location: Location
}

const PkgContent = ({ location }: PkgContentProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pkg, setPkg] = useState(null)
  const { href, pathname, search, hash } = location
  const url = href ? new URL(href) : null
  const tab = url ? url.searchParams.get('tab') : ''
  const index = pathname.indexOf('/pkg/')
  const hasVersion = pathname.includes('@v')
  let pkgPath = pathname.slice(index + 5)
  if (!hasVersion) {
    pkgPath += (pkgPath[pkgPath.length - 1] === '/' ? '' : '/') + '@v/latest'
  }
  const getVersionPath = (version) => {
    let path = pathname
    if (!hasVersion) {
      path += (path[path.length - 1] === '/' ? '' : '/') + '@v/latest'
    }
    return path.replace(/[^/]+$/, version)
  }
  const onVersionChange = (version) => {
    navigate(getVersionPath(version))
  }
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await axios.get(`https://pkg.goproxy.io/pkg/${pkgPath}`)
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
  }, [pkgPath])

  let content = null
  if (loading) {
    content = <Loading>Loading...</Loading>
  } else if (error) {
    content = <Error>{ error }</Error>
  } else if (pkg) {
    content = (
      <Content
        location={location}
        pkg={pkg}
        tab={tab}
        getVersionPath={getVersionPath}
        onVersionChange={onVersionChange}
      />
    )
  }

  return (
    <Container>
      <Wrapper>
        {content}
      </Wrapper>
    </Container>
  )
}

export default PkgContent
