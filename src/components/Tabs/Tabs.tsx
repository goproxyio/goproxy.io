import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const TabsNav = styled.ul`
  display: flex;
  margin: 0 0 0 -16px;
  padding: 0;
  list-style: none;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

interface TabsNavItemProps {
  isActive: boolean
}

const TabsNavItem = styled.li`
  border-bottom: 1px solid #eee;
  ${(props: TabsNavItemProps) => props.isActive ? `
    font-weight: 700;
    border-bottom-color: #03A9F4;
  ` : ''}

  > a {
    display: block;
    padding: 4px 16px;
    &:hover,
    &:focus {
      text-decoration: none;
      cursor: pointer;
    }
  }
`

interface TabsProps {
  initialCurrent?: string
  current?: string
  children: React.ReactElement
  onChange?: (key: string) => void
}

const Tabs = ({ initialCurrent, current, children, onChange }: TabsProps) => {
  const firstChild = children ? children[0] : null
  let defaultCurrent = ''
  if (initialCurrent) {
    defaultCurrent = initialCurrent
  } else {
    defaultCurrent = firstChild ? (firstChild.key || '0') : ''
  }
  const [ownCurrent, setOwnCurrent] = useState(defaultCurrent)
  const titles = children.map(child => child.props.title)
  const tabsNavItems = []
  const clonedChildren = []
  const onTabsNavItemClick = (key: string) => {
    if (current) {
      onChange && onChange(key)
    } else {
      setOwnCurrent(key)
    }
  }

  useEffect(() => {
    if (current) {
      setOwnCurrent(current)
    }
  })

  children.forEach((child, index) => {
    const key = String(child.key || index)
    const isActive = ownCurrent === key
    tabsNavItems.push(
      <TabsNavItem isActive={isActive} key={key}>
        <a onClick={() => onTabsNavItemClick(key)}>{child.props.title}</a>
      </TabsNavItem>
    )
    clonedChildren.push(React.cloneElement(child, { key, isActive }, child.props.children))
  })

  return (
    <div>
      <div>
        <TabsNav>
          {tabsNavItems}
        </TabsNav>
      </div>
      {clonedChildren}
    </div>
  )
}

export default Tabs
