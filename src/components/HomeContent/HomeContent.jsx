import React from 'react'
import PropTypes from 'prop-types'

import MarkdownContent from '../MarkdownContent/MarkdownContent'
import styles from './HomeContent.module.css'

const HomeContent = ({ html }) => (
  <div className={styles.homeContent}>
    <div className={styles.wrapper}>
      <MarkdownContent html={html} />
    </div>
  </div>
)

HomeContent.propTypes = {
  html: PropTypes.string.isRequired
}

export default HomeContent
