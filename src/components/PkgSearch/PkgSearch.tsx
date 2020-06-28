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

const SuggestionTitle = styled.h4`
  margin: 0;
`

const SuggestionDescription = styled.p`
  margin: 0;
  font-size: 14px;
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
      <SuggestionTitle>{ModuleRoot}</SuggestionTitle>
      {Description && <SuggestionDescription>{Description}</SuggestionDescription>}
    </div>
  )
}

interface PkgSearchProps {
  location: Location
  siteConfig: SiteConfig
}

const PkgSearch = ({ location, siteConfig }: PkgSearchProps ) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { pkg } = siteConfig
  const onChange = (e, { newValue }) => {
    setValue(newValue)
  }
  const inputProps = {
    placeholder: pkg.searchPlaceholder,
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
      cursor: 'default'
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
    console.log(suggestionValue)
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
        </Search>
      </Wrapper>
    </Container>
  )
}

export default PkgSearch
