import React from 'react'

import userMapImg from '../../images/users-map.svg'
import styles from './UserMap.module.css'

const UserMap = ({ title }) => (
  <div className={styles.userMap}>
    <div className={styles.wrapper}>
      <h3>{ title }</h3>
      <p>
        <img src={userMapImg} alt="Users map" />
      </p>
    </div>
  </div>
)

export default UserMap
