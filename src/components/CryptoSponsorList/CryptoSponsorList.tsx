import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import  { QRCodeSVG } from 'qrcode.react'
import { CryptoSponsor } from '../../utils'

const Wrapper = styled.section`
  padding: 32px 0 64px;
  background: var(--background);
  color: var(--text-color);
  text-align: center;
`

const Title = styled.h3`
  margin-bottom: 32px;
  font-weight: 400;
`


const TabsNav = styled.div`
  display: flex;
  justify-content: center;
`

interface TabsNavItemProps {
  isActive: boolean
}

const TabsNavItem = styled.a`
  display: block;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1;
  text-decoration: none;
  border: 1px solid var(--primary-color);
  background: ${(props: TabsNavItemProps) => props.isActive ? 'var(--primary-color)' : 'var(--background)'};
  color: ${(props: TabsNavItemProps) => props.isActive ? 'var(--background)' : 'var(--primary-color)'};
  &:hover {
    cursor: pointer;
    text-decoration: none;
    color: ${(props: TabsNavItemProps) => props.isActive ? 'var(--background)' : 'var(--primary-color)'};
  }
  &:not(:first-child) {
    border-left: 0;
  }
`

interface TabsPaneProps {
  isActive: boolean
}

const TabsPane = styled.div`
  display: ${(props: TabsPaneProps) => props.isActive ? 'flex' : 'none'};
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
  color: var(--text-color);
`

const Address = styled.p`
  width: 100%;

  code {
    word-break: break-all;
  }
`

const CopyBtn = styled.a`
  margin-left: 16px;

  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`

interface CryptoSponsorListProps {
  title: string
  cryptoSponsors: CryptoSponsor[]
  copyText: string
}

const CryptoSponsorList = ({ title, cryptoSponsors, copyText }: CryptoSponsorListProps ) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const onClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div>
      <Wrapper>
        <Title>{ title }</Title>
        <div className="tabs">
          <TabsNav>
            {
              cryptoSponsors.map((cryptoSponsor, index) => (
                <TabsNavItem isActive={index === currentIndex} onClick={() => onClick(index)}>
                  { cryptoSponsor.title }
                </TabsNavItem>
              ))
            }
          </TabsNav>
          {
            cryptoSponsors.map((cryptoSponsor, index) => {
              return (
                <TabsPane isActive={index === currentIndex}>
                  <Address>
                    <code>
                    { cryptoSponsor.address }
                    </code>
                    <CopyBtn className="copy-btn" data-clipboard-text={cryptoSponsor.address}>
                      { copyText }
                    </CopyBtn>
                  </Address>
                  <QRCodeSVG
                    value={cryptoSponsor.address}
                    size={256}
                    bgColor="#333"
                    fgColor="#fefefe"
                  />
                </TabsPane>
              )
            })
          }
        </div>
      </Wrapper>
    </div>
  )
}

CryptoSponsorList.propTypes = {
  siteName: PropTypes.string
}

CryptoSponsorList.defaultProps = {
  siteName: ``
}

export default CryptoSponsorList
