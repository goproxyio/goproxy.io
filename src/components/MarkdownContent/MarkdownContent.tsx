import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import ClipboardJS from 'clipboard'
import { isSameSite } from '../../utils'
import './prism.css'
import './MarkdownContent.css'

interface MarkdownContentProps {
  html: string
  copyText: string
  copiedText: string
}

const MarkdownContent = ({ html, copyText, copiedText }: MarkdownContentProps) => {
  const onAnchorClick = (e: Event) => {
    const href = (e.target as HTMLAnchorElement).href
    if (isSameSite(href)) {
      e.preventDefault()
      navigate(new URL(href).pathname)
    }
  }
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('.markdown-content a[href]'))
    for (const anchor of anchors) {
      anchor.addEventListener('click', onAnchorClick)
    }
    return () => {
      for (const anchor of anchors) {
        anchor.removeEventListener('click', onAnchorClick)
      }
    }
  })
  useEffect(() => {
    const codeBlocks = Array.from(document.querySelectorAll('.gatsby-highlight'))
    for (const codeBlock of codeBlocks) {
      const copyBtn = document.createElement('button')
      copyBtn.textContent = copyText
      copyBtn.className = 'copy-btn'
      copyBtn.setAttribute('data-clipboard-target', 'pre')
      codeBlock.appendChild(copyBtn)
    }
    const clipboard = new ClipboardJS('.copy-btn')
    const timers: number[] = []
    clipboard.on('success', (e) => {
      e.clearSelection();
      e.trigger.textContent = copiedText
      timers.push(window.setTimeout(() => {
        if (e.trigger) {
          e.trigger.textContent = copyText
        }
      }, 2000))
    })
    return () => {
      const copyBtns = Array.from(document.querySelectorAll('.copy-btn'))
      for (const copyBtn of copyBtns) {
        copyBtn.parentNode?.removeChild(copyBtn)
      }
      for (const timer of timers) {
        clearTimeout(timer)
      }
      clipboard.destroy()
    }
  })
  return (
    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default MarkdownContent
