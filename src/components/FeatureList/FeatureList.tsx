import React from 'react'
import styled from 'styled-components'
import { Feature } from '../../utils'

// TODO: extract a single Wrapper component
// TODO: extract theme color configuration into siteConfig.json
// TODO: extract media query rules
const Wrapper = styled.section`
  margin: 0 auto;
  padding: 30px 16px;
  max-width: 900px;

  @media (min-width: 960px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 900px;
  }
`

const Icon = styled.i`
  font-size: 72px;
  line-height: 1;
  color: var(--primary-color);
`

const Title = styled.h4`
  margin: 1em 0;
  font-size: 24px;
  line-height: 1;
  color: var(--primary-color);
`

const Description = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  color: var(--text-color-secondary);
`

const FeatureItem = styled.div`
  margin-top: 40px;
  text-align: center;

  @media (min-width: 960px) {
    margin: 0 40px;
    padding-top: 50px;
    width: 300px;
  }
`

interface FeatureListProps {
  features: Feature[]
}

const FeatureList = ({ features }: FeatureListProps) => {
  const list = features.map((datum, index) => (
    <FeatureItem key={index}>
      <Icon className={`iconfont icon-${datum.icon}`}></Icon>
      <Title>{datum.title}</Title>
      <Description>{datum.description}</Description>
    </FeatureItem>
  ))

  return (
    <div>
      <Wrapper>
        {list}
      </Wrapper>
    </div>
  )
}

export default FeatureList
