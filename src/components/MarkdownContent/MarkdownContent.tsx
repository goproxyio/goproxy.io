import React from 'react'

import './prism.css'
import './MarkdownContent.css'

interface MarkdownContentProps {
  html: string
}

const MarkdownContent = ({ html }: MarkdownContentProps) =>
  <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />

export default MarkdownContent
