import { Link, navigate } from 'gatsby'
import React, { useState, useEffect, SyntheticEvent } from 'react'
import styled from 'styled-components'
import isAbsoluteUrl from 'micell/url/isAbsolute'
import join from 'micell/path/join';
import locales from '../../../content/locales.json'
import { SiteConfig, getLocale } from '../../utils'

const defaultLocale = 'en'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #004880;
  color: #66a0cc;
  z-index: 900;

  & a {
    color: #66a0cc;
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  max-width: 900px;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const SiteTitle = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 400;
  line-height: 64px;
  text-align: center;
  z-index: -1;

  & a:hover {
    color: #fff;
    text-decoration: none;
  }

  @media (min-width: 960px) {
    position: static;
    z-index: 0;
    width: initial;
  }
`

const MenuTrigger = styled.div`
  order: -1;

  & button {
    appearance: none;
    margin: 0;
    padding: 0;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: transparent;
    border: 0;
    color: #66a0cc;

    &:hover,
    &:focus {
      color: #fff;
    }
  }

  & i {
    font-size: 20px;
  }

  @media (min-width: 960px) {
    order: 0;
    display: none;
  }
`

// TODO: extract grid components
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SelectWrapper = styled.div`
  position: relative;
`

const Select = styled.select`
  appearance: none;
  padding: 4px 20px 4px 12px;
  font-size: 16px;
  line-height: 18px;
  border: 0;
  color: #66a0cc;
  background: transparent;
`

const SelectArrow = styled.span`
  position: absolute;
  top: 11px;
  right: 6px;
  border: 4px solid transparent;
  border-top-color: #66a0cc;
`

interface MenuProps {
  opened: boolean
}

// TODO: extract a menu component
const Menu = styled.nav`
  display: none;
  padding: 8px 16px;

  ${(props: MenuProps) => props.opened ? `
    display: block;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    background: #004880;
  ` : ''}

  @media (min-width: 960px) {
    display: block;
  }
`

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 960px) {
    display: flex;
    align-items: center;
  }
`

const MenuItem = styled.li`
  border-bottom: 1px dotted #eee;

  & a {
    display: block;
    padding: 12px 8px;
  }

  @media (min-width: 960px) {
    border-bottom: none;

    & a {
      display: block;
      margin: 0 8px;
      padding: 19px 12px;
      position: relative;
      transition: all .15s ease-in;

      &:hover {
        color: #fff;
        text-decoration: none;
        transition: all .15s ease-out;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: transparent;
        transform: scaleX(0);
        transition: all .15s ease-in;
      }

      &:hover::after {
        transform: scaleX(1);
        background: #fff;
        transition: all .15s ease-out;
      }
    }
  }
`

interface HeaderProps {
  location: Location
  siteConfig: SiteConfig
}

const Header = ({ location, siteConfig }: HeaderProps) => {
  const [opened, setOpened] = useState(false)
  const initLocale = getLocale(location.pathname)
  const [locale, setLocale] = useState(initLocale)
  const toggleOpened = () => setOpened(!opened)
  const homePath = () => locale === defaultLocale ? '/' : `/${locale}/`
  const toggleLocale = (e: SyntheticEvent) => {
    const target = e.target as HTMLSelectElement
    setLocale(target.value)
  }

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
      to = join(`/${locale}`, to)
    }
    navigate(to)
  })

  return (
    <Container>
      <Wrapper>
        <SiteTitle>
          <Link
            to={homePath()}
          >
            <span>{siteConfig.name}</span>
          </Link>
        </SiteTitle>
        <MenuTrigger>
          <button onClick={toggleOpened}>
            <i className="iconfont icon-nav"></i>
          </button>
        </MenuTrigger>
        <Main>
          <Menu opened={opened}>
            <MenuList>
              {siteConfig.nav.map((item, index: number) =>
                <MenuItem key={index}>
                  {isAbsoluteUrl(item.url) ?
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferer"
                    >{item.title}</a> :
                    <Link to={item.url}>{item.title}</Link>
                  }
                </MenuItem>
              )}
            </MenuList>
          </Menu>
          <SelectWrapper>
            <Select value={locale} onChange={toggleLocale}>
              {locales.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >{item.label}</option>
              ))}
            </Select>
            <SelectArrow />
          </SelectWrapper>
        </Main>
      </Wrapper>
    </Container>
  )
}

export default Header
