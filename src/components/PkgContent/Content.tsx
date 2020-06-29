import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import path from 'path'
import marked from 'marked'
import prism from 'prismjs'
import base64 from 'micell/base64'
import qs from 'micell/qs'
import timeAgo from 'micell/date/timeAgo'
import semverRsort from 'semver/functions/rsort'
import he from 'he'
import Tabs from '../Tabs/Tabs'
import TabPane from '../Tabs/TabPane'
import MarkdownContent from '../MarkdownContent/MarkdownContent'
import CodeBlock from '../MarkdownContent/CodeBlock'
import { Module } from 'module'

const PkgHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

const PkgName = styled.h1`
  margin: 0;
`

const PkgVersion = styled.div`
  margin-left: 16px;
  font-size: 16px;
`

const LatestTag = styled.div`
  display: inline-block;
  margin-left: 4px;
  padding: 4px 8px;
  font-size: 14px;
  line-height: 1;
  border-radius: 11px;
  background: #9bd3fd;
`

const PkgMeta = styled.div`
  margin: 8px 0 16px;
`

const PkgMetaLabel = styled.span`
  margin-right: 5px;
`

const PkgMetaDivider = styled.span`
  margin: 0 10px;
  color: #aaa;
`

const Heading2 = styled.h2`
  margin: 1.25em 0 0.75em;
  font-size: 1.5em;
  border-bottom: 1px solid #eee;

  a {
    word-break: break-word;
  }
`

const Heading3 = styled.h3`
  margin: 1.25em 0 0.75em;
  font-size: 1.25em;
  a {
    word-break: break-word;
  }
`

const GoDoc = styled.div`
  ul {
    margin: 1em 0 1em 2em;
    padding: 0;

    ul {
      margin: 0 0 0 2em;
      padding: 0;
    }
  }

  a {
    word-break: break-word;
  }
`

const reGoModLink = /href="\//g

interface ContentProps {
  location: Location
  pkg: any
  tab: string
  getVersionPath: (version: string) => string
  onVersionChange: (version: string) => void
}

const Content = ({ location, pkg, tab, getVersionPath, onVersionChange }: ContentProps) => {
  const [currentTab, setCurrentTab] = useState(tab)
  const {
    ModuleVersion,
    ModuleRoot,
    ImportPath,
    Latest,
    Licenses,
    PublishedTime,
    Versions,
    Subdirs,
    PackageDoc,
    Files,
    Examples,
    Constants,
    Variables,
    Funcs,
    Types,
    GoMod,
    Readme
  } = pkg
  const packageName = path.join(path.basename(ModuleRoot), path.relative(ModuleRoot, ImportPath))
  const hasReadme = !!Readme
  const hasOverview = !!PackageDoc
  const hasConstants = Constants && Constants.length > 0
  const hasVariables = Variables && Variables.length > 0
  const hasFuncs = Funcs && Funcs.length > 0
  const hasTypes = Types && Types.length > 0
  const hasIndex = !!(Constants || Variables || Funcs || Types)
  const hasExamples = !!Examples
  const hasSubdirs = Subdirs && Subdirs.length > 0
  const goMod = GoMod.replace(reGoModLink, 'href="/pkg/')
  const hasGoMod = !!goMod
  const hasVerions = Versions && Versions.length > 0
  const hasLicenses = Licenses && Licenses.length > 0
  const overviewContents = []

  if (hasOverview) {
    let startTag = '<pre>'
    let endTag = '</pre>'
    let index = -1
    let lastIndex = 0
    index = PackageDoc.indexOf(startTag)
    if (index > -1) {
      while (index > -1) {
        overviewContents.push({
          type: 'html',
          text: PackageDoc.slice(lastIndex, index)
        })
        lastIndex = index + startTag.length
        index = PackageDoc.indexOf(endTag, lastIndex)
        overviewContents.push({
          type: 'code',
          text: he.decode(PackageDoc.slice(lastIndex, index))
        })
        lastIndex = index + endTag.length
        index = PackageDoc.indexOf(startTag, lastIndex)
      }
    } else {
      overviewContents.push({
        type: 'html',
        text: PackageDoc.slice(lastIndex, index)
      })
    }
  }

  const getNavItemHref = (key: string): string => {
    const query = qs.parse(location.search)
    return `${location.pathname}?${qs.stringify({ ...query, tab: key })}`
  }

  const getSubdirHref = (name: string): string => {
    const { pathname } = location
    const hasVersionTag = pathname.includes('/@v/')
    let href = ''
    if (hasVersionTag) {
      href = pathname.replace(/\/@v\//, `/${name}/@v/`)
    } else {
      href = pathname.replace(/\/?$/, `/${name}`)
    }
    return href
  }

  const onTabsChange = (newCurrent) => {
    setCurrentTab(newCurrent)
    navigate(getNavItemHref(newCurrent), { replace: true })
  }

  marked.setOptions({
    baseUrl: `https://${ImportPath}`,
    highlight(code, lang) {
      let html = code
      if (lang) {
        const prismLang = lang === 'sh' ? 'shell' : lang
        try {
          return prism.highlight(code, prism.languages[prismLang], prismLang)
        } catch (err) {
          console.error(err)
          html = code
        }
      }
      return html
    }
  })

  return (
    <div>
      <PkgHeader>
        <PkgName>{packageName}</PkgName>
        <PkgVersion>{ModuleVersion}</PkgVersion>
        {Latest && <LatestTag>Latest</LatestTag>}
      </PkgHeader>
      <p>
        Module:&nbsp;
        <a href={`/pkg/${ModuleRoot}`}>{ModuleRoot}</a>
      </p>
      <PkgMeta>
        <PkgMetaLabel>Published:</PkgMetaLabel>
        <strong>{timeAgo.format(PublishedTime)}</strong>
        <PkgMetaDivider>|</PkgMetaDivider>
        <PkgMetaLabel>License:</PkgMetaLabel>
        <strong>{hasLicenses ? Licenses[0].Types[0] : 'No License'}</strong>
      </PkgMeta>
      <Tabs current={currentTab} getNavItemHref={getNavItemHref} onChange={onTabsChange}>
        <TabPane title="Readme" key="readme">
          {hasReadme
            ? <MarkdownContent html={marked(base64.decode(Readme))} />
            : <p><strong>No readme!</strong></p>
          }
        </TabPane>
        <TabPane title="GoDoc" key="godoc">
          <GoDoc>
            <ul>
              {hasOverview && <li><a href="#godoc_overview">Overview</a></li>}
              {hasIndex && <li><a href="#godoc_index">Index</a></li>}
              {hasExamples && <li><a href="#godoc_examples">Examples</a></li>}
            </ul>
            {hasOverview && <Heading2 id="godoc_overview">Overview</Heading2>}
            {hasOverview && overviewContents.map((content, index) => {
              if (content.type === 'html') {
                return <div key={String(index)} dangerouslySetInnerHTML={{ __html: content.text }} />
              }
              return <CodeBlock key={String(index)} code={content.text} lang="go" />
            })}
            {hasIndex && <Heading2 id="godoc_index">Index</Heading2>}
            {hasIndex && (
              <ul>
                {Constants && Constants.length > 0 && (
                  <li>
                    <a href="#godoc_constants">Constants</a>
                  </li>
                )}
                {Variables && Variables.length > 0 && (
                  <li>
                    <a href="#godoc_variables">Variables</a>
                  </li>
                )}
                {Funcs && Funcs.map((Func, index) => (
                  <li key={`func-${index}`}>
                    <a href={`#godoc_func_${Func.Name.toLowerCase()}`}>
                      {Func.SignatureString}
                    </a>
                  </li>
                ))}
                {Types && Types.map((Type, index) => (
                  <li key={`type-${index}`}>
                    <a href={`#godoc_type_${Type.Name.toLowerCase()}`}>
                      type {Type.Name}
                    </a>
                    {Type.Methods && Type.Methods.length > 0 && (
                      <ul>
                        {Type.Methods.map((Method, i) => (
                          <li key={`type-method-${i}`}>
                            <a href={`#godoc_type_method_${Method.Name.toLowerCase()}`}>
                              {Method.SignatureString}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {hasExamples && <Heading3 id="godoc_examples">Examples</Heading3>}
            {hasExamples && (
              <ul>
                {Examples.map((Example, index) => (
                  <li key={`example-${index}`}>
                    <a href={`#godoc_example_${Example.Name.replace(/\./g, '_').toLowerCase()}`}>
                      {Example.Name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {hasConstants && <Heading3 id="godoc_constants">Constants</Heading3>}
            {hasConstants && Constants.map((Constant, index) => (
              <div key={`godoc-constant-${index}`}>
                <CodeBlock code={Constant.SignatureString} lang="go" />
                <div dangerouslySetInnerHTML={{ __html: Constant.Doc }} />
              </div>
            ))}
            {hasVariables && <Heading3 id="godoc_variables">Variables</Heading3>}
            {hasVariables && Variables.map((Variable, index) => (
              <div key={`godoc-variable-${index}`}>
                <CodeBlock code={Variable.SignatureString} lang="go" />
                <div dangerouslySetInnerHTML={{ __html: Variable.Doc }} />
              </div>
            ))}
            {hasFuncs && Funcs.map((Func, index) => (
              <div key={`godoc-func-${index}`}>
                <Heading3 id={`godoc_func_${Func.Name.toLowerCase()}`}>
                  func&nbsp;
                  <a>
                    {Func.Name}
                  </a>
                </Heading3>
                <CodeBlock code={Func.SignatureString} lang="go" />
                <div dangerouslySetInnerHTML={{ __html: Func.Doc }} />
              </div>
            ))}
            {hasTypes && Types.map((Type, index) => (
              <div key={`godoc-type-${index}`}>
                <Heading3 id={`godoc_type_${Type.Name.toLowerCase()}`}>
                  type&nbsp;
                  <a>
                    {Type.Name}
                  </a>
                </Heading3>
                <CodeBlock code={Type.SignatureString} lang="go" />
                <div dangerouslySetInnerHTML={{ __html: Type.Doc }} />
                {Type.Methods && Type.Methods.map((Method, i) => (
                  <div key={`godoc-type-method-${i}`}>
                    <Heading3 id={`godoc_type_method_${Method.Name.toLowerCase()}`}>
                      func ({Method.MethodReceiverString})&nbsp;
                      <a>
                        {Method.Name}
                      </a>
                    </Heading3>
                    <CodeBlock code={Method.SignatureString} lang="go" />
                    <div dangerouslySetInnerHTML={{ __html: Method.Doc }} />
                  </div>
                ))}
              </div>
            ))}
            {hasExamples && Examples.map((Example, index) => (
              <div key={`godoc-example-${index}`}>
                <Heading3 id={`godoc_example_${Example.Name.replace(/\./g, '_').toLowerCase()}`}>
                  example&nbsp;
                  <a>
                    {Example.Name}
                  </a>
                </Heading3>
                <CodeBlock code={Example.Code} lang="go" />
                <p><strong>Output</strong></p>
                {Example.Output && <CodeBlock code={Example.Output} />}
              </div>
            ))}
          </GoDoc>
        </TabPane>
        <TabPane title="Subdirectories" key="subdirs">
          {hasSubdirs
            ?
              (
                <ul>
                  {Subdirs.map((Subdir, i) => (
                    <li key={String(i)}>
                      <a href={getSubdirHref(Subdir.Name)}>{Subdir.Name}</a>
                    </li>
                  ))}
                </ul>
              )
            : <p><strong>No Subdirectories</strong></p>
          }
        </TabPane>
        <TabPane title="GoMod" key="gomod">
          {hasGoMod
            ? <CodeBlock code={goMod}></CodeBlock>
            : <p><strong>No go.mod file</strong></p>
          }
        </TabPane>
        <TabPane title="Versions" key="versions">
          {hasVerions && (
            <ul>
              {semverRsort(Versions).map((Version, i) => (
                <li key={String(i)}>
                  <a href={getVersionPath(Version)} onClick={() => onVersionChange(Version)}>{Version}</a>
                </li>
              ))}
            </ul>
          )}
        </TabPane>
        <TabPane title="Licenses" key="licenses">
          {hasLicenses
            ? (
              <div>
                {Licenses.map((License, i) => (
                  <div key={String(i)}>
                    <p><strong>{License.Types[0]}</strong></p>
                    <CodeBlock code={base64.decode(License.Contents || '')}></CodeBlock>
                  </div>
                ))}
              </div>
            )
            : <p><strong>No License</strong></p>
          }
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Content
