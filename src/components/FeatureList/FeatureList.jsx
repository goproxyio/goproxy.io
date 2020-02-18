import React from 'react'

import styles from './FeatureList.module.css'

const FeatureList = ({ features }) => {
  const list = features.map((datum, index) => (
    <div className={styles.item} key={index}>
      <div className={styles.image}>
        <i className={`iconfont icon-${datum.icon}`}></i>
      </div>
      <div className={styles.content}>
        <h4>{datum.title}</h4>
        <p>{datum.description}</p>
      </div>
    </div>
  ))

  return (
    <div className={styles.featureList}>
      <div className={styles.wrapper}>
        {list}
      </div>
    </div>
  )
}

export default FeatureList
