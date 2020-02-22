import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ajax from 'micell/ajax'
import Trianglify from 'trianglify'

import animLogo from '../../images/anim-logo.svg'

const Container = styled.div`
  position: relative;
  background: #004880;
  color: #fff;
`

const Wrapper = styled.div`
  padding: 32px 16px;
  position: relative;
  z-index: 1;
  text-align: center;

  @media (min-width: 960px) {
    display: flex;
    justify-content: center;
  }
`

const Aside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 960px) {
    margin-right: 32px;
    width: 256px;
  }
`

const Main = styled.div`
  @media (min-width: 960px) {
    margin-left: -16px;
    text-align: left;
  }
`

const Title = styled.h2`
  font-size: 48px;
  font-weight: 400;
  line-height: 64px;
  color: #B3E5FC;
`

const GithubButtonWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`

const GithubButton = styled.a`
  padding: 2px 5px 2px 4px;
  font: 700 16px/1 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  line-height: 20px;
  background-color: #eee;
  background-image: -webkit-linear-gradient(top,#fcfcfc 0,#eee 100%);
  background-image: -moz-linear-gradient(top,#fcfcfc 0,#eee 100%);
  background-image: -ms-linear-gradient(top,#fcfcfc 0,#eee 100%);
  background-image: linear-gradient(to bottom,#fcfcfc 0,#eee 100%);
  background-repeat: no-repeat;
  border: 1px solid #d5d5d5;

  &:focus,
  &:hover {
    text-decoration: none;
    background-color: #ddd;
    background-image: -webkit-linear-gradient(top,#eee 0,#ddd 100%);
    background-image: -moz-linear-gradient(top,#eee 0,#ddd 100%);
    background-image: -ms-linear-gradient(top,#eee 0,#ddd 100%);
    background-image: linear-gradient(to bottom,#eee 0,#ddd 100%);
    border-color: #ccc;
  }

  &:active {
    background-image: none;
    background-color: #dcdcdc;
    border-color: #b5b5b5;
    box-shadow: inset 0 2px 4px rgba(0,0,0,.15)
  }
`

const GithubIcon = styled.i`
  margin-right: 4px;
`

interface GithubCountProps {
  count: number
}

const GithubCount = styled.a`
  padding: 2px 5px 2px 4px;
  font: 700 16px/1 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  display: ${(props: GithubCountProps) => props.count > 0 ? 'inline' : 'none'};
  margin-left: 6px;
  padding: 3px 10px 3px 8px;
  line-height: 18px;
  background-color: #fafafa;
  border: 1px solid #d4d4d4;

  &:hover {
    text-decoration: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid
  }

  &::before {
    top: 50%;
    left: -5px;
    margin-top: -6px;
    border-width: 6px 6px 6px 0;
    border-right-color: #fafafa
  }
`

interface IntroProps {
  slogan: string
}

interface RepoResponse {
  stargazers_count: number
}

interface AjaxResult {
  response?: RepoResponse
}

const Intro = ({ slogan }: IntroProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const countElem = document.getElementById('ghCount')
    if (countElem) {
      ajax('https://api.github.com/repos/goproxyio/goproxy')
        .then(({ response }: AjaxResult) => {
          if (response) {
            setCount(response.stargazers_count)
          }
        })
        .catch((err: Error) => {
          console.error(err)
        })
    }
  }, [])
  useEffect(() => {
    const intro = document.getElementById('intro')
    if (!intro) return
    const { width, height } = intro.getBoundingClientRect()
    const pattern = Trianglify({
      width,
      height,
      cell_size: 48,
      x_colors: ['#004880', '#004880'],
      y_colors: ['#004880', '#005799', '#004880']
    })
    const svg = pattern.svg()
    svg.style.cssText = 'position: absolute; top: 0; right: 0; width: 100%; height: 100%;'
    intro.appendChild(svg)
  }, [])

  const title = slogan.split('\n').map((v, i) => (
    <div key={i}>
      {v}
    </div>
  ))
  return (
    <Container id="intro">
      <Wrapper>
        <Aside>
          <img src={animLogo} width="200" alt="Logo" />
        </Aside>
        <Main>
          <Title>{title}</Title>
          <p>
            <GithubButtonWrapper>
              <GithubButton
                href="https://github.com/goproxyio/goproxy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className={`iconfont icon-github`}></GithubIcon>
                <span>Star</span>
              </GithubButton>
              <GithubCount
                id="ghCount"
                count={count}
                href="https://github.com/goproxyio/goproxy"
                target="_blank"
                rel="noopener noreferrer"
              >{count}</GithubCount>
            </GithubButtonWrapper>
          </p>
        </Main>
      </Wrapper>
    </Container>
  )
}

export default Intro
