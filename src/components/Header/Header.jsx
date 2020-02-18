import { Link, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import isAbsoluteUrl from 'micell/url/isAbsolute'
import locales from '../../../content/locales.json'
import { getLocale } from '../../utils'
import styles from './Header.module.css'

const defaultLocale = 'en'

const Header = ({ location, siteConfig }) => {
  const [opened, setOpened] = useState(false)
  const initLocale = getLocale(location.pathname)
  const [locale, setLocale] = useState(initLocale)
  const toggleOpened = () => setOpened(!opened)
  const toggleLocale = (e) => {
    setLocale(e.target.value)
  }
  const menuCls = classNames({
    [styles.menu]: 1,
    [styles.menuOpened]: opened
  })

  useEffect(() => {
    if (locale === initLocale) return
    const { pathname, search } = location
    const re = /\/(.+?)\//
    const matched = pathname.match(re)
    let lastLocale = ''
    if (matched) {
      locales.forEach((v) => {
        if (v.value === matched[1]) {
          lastLocale = v.value
        }
      })
    }
    let to = `${pathname}${search}`
    if (lastLocale) {
      to = to.replace(/\/.+?(\/.*)/, '$1')
    }
    if (locale !== defaultLocale) {
      to = `/${locale}/${to}`
    }
    navigate(to)
  })

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.siteName}>
          <Link
            to="/"
          >
            <span>{siteConfig.name}</span>
          </Link>
        </h1>
        <div className={styles.menuTrigger}>
          <button onClick={toggleOpened}>
            <i className="iconfont icon-nav"></i>
          </button>
        </div>
        <div className={styles.main}>
          <nav className={menuCls}>
            <ul>
              {siteConfig.nav.map((item, index) =>
                <li key={index}>
                  {isAbsoluteUrl(item.url) ?
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferer"
                    >{item.title}</a> :
                    <Link to={item.url}>{item.title}</Link>
                  }
                </li>
              )}
            </ul>
          </nav>
          <div className={styles.select}>
            <select value={locale} onChange={toggleLocale}>
              {locales.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >{item.label}</option>
              ))}
            </select>
            <span className={styles.arrow}></span>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteName: PropTypes.string,
}

Header.defaultProps = {
  siteName: ``,
}

export default Header
