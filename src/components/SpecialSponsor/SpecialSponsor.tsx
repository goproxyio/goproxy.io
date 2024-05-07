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
  background: var(--background-light);
`

const Title = styled.span`
  margin-right: 16px;
  color: var(--text-color-secondary);
`

const SponsorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`

const SponsorItem = styled.div`
  display: inline-flex;
  align-items: center;
  line-height: 1;
`

const SponsorItemLink = styled.a`
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
  line-height: 1;

  & img {
    max-width: 180px;
    max-height: 50px;
  }
`

const SponsorItemDescription = styled.div`
  color: #666;
  font-size: 14px;
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
          {sponsors.map(({ title, image, href, description }, index) => (
            <SponsorItem key={index}>
              <SponsorItemLink href={href} target="_blank" rel="noopener">
                <img src={image} alt={title} />
              </SponsorItemLink>
              {description && <SponsorItemDescription>
                {description}
              </SponsorItemDescription>}
            </SponsorItem>
          ))}
        </SponsorList>
      </Wrapper>
    </SponsorContainer>
  )
}

export default SpecialSponsor
