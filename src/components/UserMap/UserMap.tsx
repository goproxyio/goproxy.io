import React from 'react'
import styled from 'styled-components'

import userMapImg from '../../images/users-map.svg'

const Wrapper = styled.section`
  padding: 32px 0 64px;
  background: #f8f8f8;
  text-align: center;
`

const Title = styled.h3`
  margin-bottom: 32px;
  font-weight: 400;
`

const Image = styled.img`
  max-width: 100%;
`

interface UserMapProps {
  title: string
}

const UserMap = ({ title }: UserMapProps) => (
  <div>
    <Wrapper>
      <Title>{ title }</Title>
      <p>
        <Image src={userMapImg} alt="Users map" />
      </p>
    </Wrapper>
  </div>
)

export default UserMap
