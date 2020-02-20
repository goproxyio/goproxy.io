import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'
import React from 'react'
import _ from 'lodash'
import { useMediaQuery } from 'react-responsive'

const Container = styled.div`
  order: -1;
  @media (min-width: 960px) {
    position: sticky;
    top: 112px;
    display: block;
    margin: 36px 0;
    width: 360px;
    height: calc(100vh - 160px);
    padding: 16px 16px 16px 64px;
    border-right: 1px solid #e4e4e4;

    & > ul > li p a {
      font-weight: 500;
      border-right: 2px solid transparent;
    }

    & > ul > .active p a {
      border-right-color: #03A9F4;
    }
  }
`

const TreeNodeList = styled.ul`
  @media (min-width: 960px) {
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1;

    & p a {
      padding-left: 32px;
    }
  }
`

const TreeNode = styled.li`
  @media (min-width: 960px) {
    margin-bottom: 8px;

    ${props => props.hasSublist ? `
      & p a::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 16px;
        margin-top: -4px;
        height: 4px;
        border: 4px solid transparent;
        border-left-color: #03A9F4;
        vertical-align: middle;
      }
    ` : ''}

    ${props => props.opend ? `
      margin-top: -2px;
      border-left-color: transparent;
      border-top-color: #03A9F4;
    ` : ''}

    & ul {
      display: ${props => props.isActive || props.hasActive ? 'block' : 'none'};
      margin: 0 0 16px 32px;
      font-size: 14px;
    }

    & ul a {
      padding: 8px 12px;
    }
  }
`

const Text = styled.p`
  @media (min-width: 960px) {
    margin: 0 0 8px;
  }
`

const Anchor = styled(Link)`
  @media (min-width: 960px) {
    position: relative;
    display: block;
    padding: 12px 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background: ${props => props.active  ? '#f4f4f4' : 'transparent'};

    &:hover {
      text-decoration: none;
    }
  }
`

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
        <TreeNodeList>
          {tree.children.map((node, index) => {
            const { url, title, children, isActive, hasActive } = node
            const cls = classNames({
              active: isActive,
              opened: hasActive
            })
            const sublist = children ? getList(node) : false
            return (
              <TreeNode
                key={index}
                className={cls}
                active={isActive}
                opened={hasActive}
                hasSublist={Boolean(children)}
              >
                <Text>
                  <Anchor active={isActive} to={url}>{title}</Anchor>
                </Text>
                {sublist}
              </TreeNode>
            )
          })}
        </TreeNodeList>
      )
    }
    return false
  }
  const isDesktop = useMediaQuery({
    query: '(min-width: 960px)'
  })

  return (
    <Container>
      {isDesktop ?
        getList(navData) :
        <details>
          <summary>文档</summary>
          {getList(navData)}
        </details>
      }
    </Container>
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
