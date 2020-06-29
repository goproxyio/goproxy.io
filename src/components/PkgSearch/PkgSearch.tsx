import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { navigate } from 'gatsby'
import timeAgo from 'micell/date/timeAgo'
import AutoSuggest from 'react-autosuggest'

import { SiteConfig } from '../../utils'

const Container = styled.div``

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  min-height: calc(100vh - 174px);
`

const Title = styled.h1`
  text-align: center;
`

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  max-width: 500px;
`

const Icon = styled.i`
  position: absolute;
  left: 8px;
  z-index: 1;
  font-size: 20px;
  color: #aaa;
`

const getSuggestionValue = suggestion => suggestion.ModuleRoot

const SuggestionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const SuggestionTitle = styled.h4`
  margin: 0;
`

const SuggestionStar = styled.div`
  font-size: 14px;
  color: #aaa;
`

const SuggestionDescription = styled.p`
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ClearButton = styled.button`
  appearance: none;
  position: absolute;
  top: 7px;
  right: 4px;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 10px;
  line-height: 24px;
  text-align: center;
  background: transparent;
  border: 0;
  color: #aaa;
  overflow: hidden;

  i {
    font-size: 20px;
  }
`

const renderSuggestion = suggestion => {
  const {
    PackageName,
    ModuleVersion,
    PublishedTime,
    ModuleRoot,
    GithubRepo
  } = suggestion
  let Description = ''
  let StargazersCount = ''
  let License = ''
  if (GithubRepo) {
    Description = GithubRepo.Description
    StargazersCount = GithubRepo.StargazersCount
    License = GithubRepo.License
  }
  return (
    <div>
      <SuggestionHeader>
        <SuggestionTitle>{ModuleRoot}</SuggestionTitle>
        {StargazersCount && StargazersCount > 0 && (
          <SuggestionStar>{StargazersCount} stars</SuggestionStar>
        )}
      </SuggestionHeader>
      {Description && <SuggestionDescription>{Description}</SuggestionDescription>}
    </div>
  )
}

interface PkgSearchProps {
  location: Location
  siteConfig: SiteConfig
}

const inputRef = React.createRef()

const PkgSearch = ({ location, siteConfig }: PkgSearchProps ) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { pkg } = siteConfig
  const showClear = !!value.trim()
  const onChange = (e, { newValue }) => {
    setValue(newValue)
  }
  const onClear = () => {
    setValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  const inputProps = {
    ref: inputRef,
    placeholder: pkg.searchPlaceholder,
    autoFocus: true,
    value,
    onChange
  }
  const theme = {
    container: {
      display: 'block',
      width: '100%',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '8px 8px 8px 32px'
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      width: '100%',
      maxHeight: '400px',
      overflow: 'auto',
      background: '#fff',
      border: '1px solid #ddd'
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      overflow: 'auto'
    },
    suggestion: {
      padding: '8px 16px',
      cursor: 'pointer'
    },
    suggestionHighlighted: {
      background: '#9bd3fd'
    }
  }
  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const res = await axios.get(`https://pkg.goproxy.io/pkg/?keyword=${value}`)
      if (res.data) {
        setSuggestions(res.data.slice(0, 10))
      } else {
        setSuggestions([])
      }
    } catch (err) {
      setError('Search request error. Please try later!')
    }
  }
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }
  const onSuggestionSelected = (e, { suggestionValue }) => {
    e.preventDefault()
    const path = `/pkg/${suggestionValue}`
    navigate(path)
  }

  return (
    <Container>
      <Wrapper>
        <Title>
          Go Package Search
        </Title>
        <Search>
          <Icon className="iconfont icon-search"></Icon>
          <AutoSuggest
            suggestions={suggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={theme}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
          />
          {showClear && (
            <ClearButton type="button" onClick={onClear}>
              <i className="iconfont icon-clear"></i>
            </ClearButton>
          )}
        </Search>
      </Wrapper>
    </Container>
  )
}

export default PkgSearch
