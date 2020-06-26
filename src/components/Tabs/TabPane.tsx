import React from 'react'
import styled from 'styled-components'

interface TabPaneWrapperProps {
  isActive: boolean
}

const TabPaneWrapper = styled.div`
  display: none;
  ${(props: TabPaneWrapperProps) => props.isActive ? `
    display: block;
  ` : ''}
`

interface TabPaneProps {
  title: string,
  isActive: boolean,
  children: React.ReactElement
}

const TabPane = ({ title, isActive, children }: TabPaneProps) => {
  return (
    <TabPaneWrapper isActive={isActive}>
      {children}
    </TabPaneWrapper>
  )
}

export default TabPane
