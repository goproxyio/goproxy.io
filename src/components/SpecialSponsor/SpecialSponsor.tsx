import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 16px;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 960px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 900px;
  }
`

const SponsorContainer = styled.div`
  background: #fff;
`

const Title = styled.span`
  margin-right: 16px;
  color: #888;
`

const SponsorList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SponsorItem = styled.a`
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;

  & img {
    max-width: 180px;
    max-height: 50px;
  }
`

interface SponsorDatum {
  title: string
  image: string
  href: string
}

interface SponsorProps {
  title: string
  sponsors: SponsorDatum[]
}

const SpecialSponsor = ({ title, sponsors }: SponsorProps) => {
  return (
    <SponsorContainer>
      <Wrapper>
        <Title>{title}</Title>
        <SponsorList>
          {sponsors.map(({ title, image, href }, index) => (
            <SponsorItem key={index} href={href} target="_blank" rel="noopener noreferrer">
              <img src={image} alt={title} />
            </SponsorItem>
          ))}
        </SponsorList>
      </Wrapper>
    </SponsorContainer>
  )
}

export default SpecialSponsor
