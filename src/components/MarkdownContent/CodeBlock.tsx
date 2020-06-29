import React from 'react'
import prism from 'prismjs'
import styled from 'styled-components'

import './prism.css'

const PreTag = styled.pre`
  margin: 1em 0;
  padding: 1em;
  max-width: 100%;
  font-size: 0.875em;
  border-radius: 4px;
  background-color: #eef3f7;
  color: #444;
  overflow-x: auto;

  > code {
    margin: 0;
    padding: 0;
    line-height: 1.8;
    border: 0;
    border-radius: 0;
    white-space: pre;
  }
`

interface CodeBlockProps {
  code: string
  lang?: string
}



const CodeBlock = ({ code, lang }: CodeBlockProps) => {
  const cls = lang ? `language-${lang}` : ''
  const html = lang ? prism.highlight(code, prism.languages[lang], lang) : code
  return (
    <PreTag>
      <code className={cls}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </code>
    </PreTag>
  )
}

export default CodeBlock
