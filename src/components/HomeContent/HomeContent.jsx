import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MarkdownContent from '../MarkdownContent/MarkdownContent'

const Container = styled.div`
  background: #f8f8f8;
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px 16px;
  max-width: 900px;
`

const HomeContent = ({ html }) => (
  <Container>
    <Wrapper>
      <MarkdownContent html={html} />
    </Wrapper>
  </Container>
)

HomeContent.propTypes = {
  html: PropTypes.string.isRequired
}

export default HomeContent
