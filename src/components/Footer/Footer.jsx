import React from 'react'
import PropTypes from 'prop-types'

import styles from './Footer.module.css'

const Footer = ({ siteConfig }) => {
  const { name, copyright } = siteConfig
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {name} {copyright}
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  siteName: PropTypes.string
}

Footer.defaultProps = {
  siteName: ``
}

export default Footer
