import React from 'react'
import styled from 'styled-components'

import MarkdownContent from '../MarkdownContent/MarkdownContent'

const Container = styled.div`
  background: var(--background-hover);
  color: var(--text-color);
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px 16px;
  max-width: 900px;
`

interface HomeContentProps {
  htmlAst: any
  copyText: string
  copiedText: string
}

const HomeContent = ({ htmlAst, copyText, copiedText }: HomeContentProps) => (
  <Container>
    <Wrapper>
      <MarkdownContent
        htmlAst={htmlAst}
        copyText={copyText}
        copiedText={copiedText}
      />
    </Wrapper>
  </Container>
)

export default HomeContent
