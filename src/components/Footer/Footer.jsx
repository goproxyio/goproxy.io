import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.footer`
  padding: 50px 0 10px;
  font-size: 14px;
  text-align: center;
  background: #004880;
  color: #79acd2;
  overflow: hidden;
`

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
`

const Footer = ({ siteConfig }) => {
  const { name, copyright } = siteConfig
  return (
    <Container>
      <Wrapper>
        <p>
          © {new Date().getFullYear()} {name} {copyright}
        </p>
      </Wrapper>
    </Container>
  )
}

Footer.propTypes = {
  siteName: PropTypes.string
}

Footer.defaultProps = {
  siteName: ``
}

export default Footer
