import React, { useEffect, useState } from 'react'
import ajax from 'micell/ajax'
import Trianglify from 'trianglify'

import animLogo from '../../images/anim-logo.svg'
import styles from './Intro.module.css'

const Intro = ({ slogan }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const countElem = document.getElementById('ghCount')
    if (countElem) {
      ajax('https://api.github.com/repos/goproxyio/goproxy')
        .then(({ response }) => {
          setCount(response.stargazers_count)
        })
        .catch((err) => {
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
    <div id="intro" className={styles.intro}>
      <div className={styles.wrapper}>
        <div className={styles.aside}>
          <img src={animLogo} width="200" alt="Logo" />
        </div>
        <div className={styles.main}>
          <h1>{title}</h1>
          <p className={styles.links}>
            <span className={styles.githubBtn}>
              <a
                className={styles.ghBtn}
                href="https://github.com/goproxyio/goproxy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={`iconfont icon-github ${styles.ghIco}`}></span>
                <span className={styles.ghText}>Star</span>
              </a>
              <a
                id="ghCount"
                className={styles.ghCount}
                style={{ display: count > 0 ? 'inline' : 'none' }}
                href="https://github.com/goproxyio/goproxy"
                target="_blank"
                rel="noopener noreferrer"
              >{count}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Intro
