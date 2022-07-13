import { Link } from 'gatsby'
import classNames from 'classnames'
import styled from 'styled-components'
import React from 'react'
import _ from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { DocsNavNode } from '../../utils/getSidebarData'

const Container = styled.div`
  order: -1;
  @media (min-width: 960px) {
    position: sticky;
    top: 112px;
    display: block;
    margin: 36px 0;
    width: 360px;
    height: calc(100vh - 300px);
    border-right: 1px solid var(--border-color);

    & > ul > li p a {
      font-weight: 500;
      border-right: 2px solid transparent;
    }

    & > ul > .active p a {
      border-right-color: var(--primary-color);
    }
  }
  @media (min-width: 1400px) {
    padding: 16px 16px 16px 64px;
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

interface TreeNodeProps {
  opened: boolean
  active: boolean
  hasSublist: boolean
}

const TreeNode = styled.li`
  @media (min-width: 960px) {
    margin-bottom: 8px;

    ${(props: TreeNodeProps) => props.hasSublist ? `
      & p a::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 16px;
        margin-top: -4px;
        height: 4px;
        border: 4px solid transparent;
        border-left-color: var(--primary-color);
        vertical-align: middle;
      }
    ` : ''}

    ${(props: TreeNodeProps) => props.opened ? `
      border-left-color: transparent;
      border-top-color: var(--primary-color);
    ` : ''}

    & ul {
      display: ${(props: TreeNodeProps) => props.active || props.opened ? 'block' : 'none'};
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

interface AnchorProps {
  active: string
}

const Anchor = styled(Link)`
  @media (min-width: 960px) {
    position: relative;
    display: block;
    padding: 12px 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background: ${(props: AnchorProps) => props.active  ? 'var(--background-hover)' : 'transparent'};

    &:hover {
      text-decoration: none;
    }
  }
`

interface SidebarProps {
  location: Location
  nav: DocsNavNode
}

// TODO: need a react tree component
const Sidebar = ({ location, nav }: SidebarProps) => {
  const initNavData = (tree: DocsNavNode) => {
    if (!tree.children) return
    tree.children.forEach((node: DocsNavNode, index: number) => {
      const { path, url, children } = node
      const { pathname } = location
      const trimSlashPath = pathname.replace(/(.)\/$/, '$1')
      node.isActive = trimSlashPath === url
      if (path) {
        path.forEach((item: DocsNavNode) => {
          if (!item.hasActive) {
            item.hasActive = node.isActive
          }
        })
      }
      if (children) {
        initNavData(node)
      }
    })
  }
  const navData = _.cloneDeep(nav)
  initNavData(navData)
  const getList = (tree: DocsNavNode) => {
    if (Array.isArray(tree.children) && tree.children.length > 0) {
      return (
        <TreeNodeList>
          {tree.children.map((node: DocsNavNode, index: number) => {
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
                active={Boolean(isActive)}
                opened={Boolean(hasActive)}
                hasSublist={Boolean(children)}
              >
                <Text>
                  <Anchor active={isActive ? 'true' : ''} to={String(url)}>{title}</Anchor>
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

export default Sidebar
