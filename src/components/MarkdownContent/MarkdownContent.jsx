import React from 'react'

import './prism.css'
import styles from './MarkdownContent.module.css'

const MarkdownContent = ({ html }) =>
  <div className={styles.markdownContent} dangerouslySetInnerHTML={{ __html: html }} />

export default MarkdownContent
