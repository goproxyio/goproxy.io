import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ajax from 'micell/ajax'

interface Contributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

interface AjaxResult {
  response: Contributor[]
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  & th,
  & td {
    padding: 10px;
    text-align: center;
  }

  & th {
    font-weight: 600;
    background: #e8e8e8;
  }

  & tr {
    &:nth-child(2n) {
      background: #e8e8e8;
    }
  }

  & thead tr {
    border-bottom: 1px solid #ddd;
  }

  & img {
    display: block;
    border-radius: 16px;
  }
`

const Footer = () => {
  const [responded, setResponded] = useState(false)
  const [contributors, setContributors] = useState([] as Contributor[])
  const [reqError, setReqError] = useState('')
  useEffect(() => {
    ajax('https://api.github.com/repos/goproxyio/goproxy/contributors')
      .then(({ response }: AjaxResult) => {
        setContributors(response)
        setResponded(true)
      })
      .catch((err: Error) => {
        console.error(err)
        setReqError(err.message)
        setResponded(true)
      })
  }, [])
  const trs = contributors.map(contributor => (
    <tr key={contributor.id}>
      <td>
        <img src={contributor.avatar_url} width="32" height="32" alt="contributor.login" />
      </td>
      <td>
        <a href={contributor.html_url}>{contributor.login}</a>
      </td>
      <td>
        <a href={contributor.html_url}>{contributor.html_url}</a>
      </td>
      <td>
        {contributor.contributions}
      </td>
    </tr>
  ))
  if (!responded) {
    return <span>Fetching contributors</span>
  }
  if (reqError) {
    return <span>Fetch contributors error</span>
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          <th>Github</th>
          <th>Commits</th>
        </tr>
      </thead>
      <tbody>
        {trs}
      </tbody>
    </Table>
  )
}

Footer.propTypes = {
  siteName: PropTypes.string
}

Footer.defaultProps = {
  siteName: ``
}

export default Footer
