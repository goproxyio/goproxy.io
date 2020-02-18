import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import React from 'react'
import _ from 'lodash'
import { useMediaQuery } from 'react-responsive'

import styles from './Sidebar.module.css'

// TODO: need a react tree component
const Sidebar = ({ nav, location }) => {
  const initNavData = (tree) => {
    tree.children.forEach((node, index) => {
      const { path, url, children } = node
      const { pathname } = location
      const trimSlashPath = pathname.replace(/(.)\/$/, '$1')
      node.isActive = trimSlashPath === url
      path.forEach(item => {
        if (!item.hasActive) {
          item.hasActive = node.isActive
        }
      })
      if (children) {
        initNavData(node)
      }
    })
  }
  const navData = _.cloneDeep(nav)
  initNavData(navData)
  const getList = (tree) => {
    if (Array.isArray(tree.children) && tree.children.length > 0) {
      return (
        <ul>
          {tree.children.map((node, index) => {
            const { url, title, children, isActive, hasActive } = node
            const cls = classNames({
              [styles.active]: isActive,
              [styles.opened]: hasActive,
              [styles.hasSublist]: Boolean(children)
            })
            const sublist = children ? getList(node) : false
            return (
              <li className={cls} key={index}>
                <p><Link to={url}>{title}</Link></p>
                {sublist}
              </li>
            )
          })}
        </ul>
      )
    }
    return false
  }
  const isDesktop = useMediaQuery({
    query: '(min-width: 960px)'
  })

  return (
    <div className={styles.container}>
      {isDesktop ?
        getList(navData) :
        <details>
          <summary>文档</summary>
          {getList(navData)}
        </details>
      }
    </div>
  )
}

Sidebar.propTypes = {
  nav: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

export default Sidebar