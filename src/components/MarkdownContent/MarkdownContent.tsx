import React from 'react'

import './prism.css'
import './MarkdownContent.css'

const MarkdownContent = ({ html }) =>
  <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />

export default MarkdownContent
