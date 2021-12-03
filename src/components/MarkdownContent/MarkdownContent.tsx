import React, { useEffect } from 'react'

import './prism.css'
import './MarkdownContent.css'

interface MarkdownContentProps {
  html: string
}

const MarkdownContent = ({ html }: MarkdownContentProps) => {
  useEffect(() => {
  })
  return (
    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default MarkdownContent
