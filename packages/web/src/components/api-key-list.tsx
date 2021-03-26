import React, { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ApiKey } from '../domain'

const ApiKeyList: React.FC<{
  apiKeys: Array<ApiKey>
  addApiKey: () => void
  toggleEnabled: (apiKeyId: string) => void
}> = ({ apiKeys = [], addApiKey, toggleEnabled }) => {
  const handleToggleEnabled = useCallback(
    (ev) => {
      const { apiKeyId } = ev.target.dataset

      return toggleEnabled(apiKeyId)
    },
    [toggleEnabled],
  )

  const handleCopyToken = useCallback(
    (ev) => {
      const { apiKeyId } = ev.target.dataset
      const keyId = parseInt(apiKeyId, 10)
      const key = apiKeys.find(({ id }) => id === keyId)

      if (!key) {
        throw new Error('Could not find key')
      }

      navigator.clipboard.writeText(key.token)
    },
    [apiKeys],
  )

  return (
    <div>
      <TitleSection>
        <h4>API Keys</h4>
        <div></div>
        <button onClick={addApiKey}>Add New API Key</button>
      </TitleSection>
      <div>
        {apiKeys.length === 0 ? (
          <div>
            <p>
              There are no api keys currently for you user, add one with the
              "Add New API Key" button!
            </p>
          </div>
        ) : (
          <List>
            {apiKeys
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map(({ id, token, enabled }) => (
                <ListEntry key={id}>
                  <p>key - #{id}</p>
                  <p>status - {enabled ? 'enabled' : 'disabled'}</p>
                  <p>Token:</p>
                  <TokenTextarea value={token} readOnly></TokenTextarea>
                  <ActionBar>
                    <button data-api-key-id={id} onClick={handleCopyToken}>
                      Copy Token
                    </button>
                    <button data-api-key-id={id} onClick={handleToggleEnabled}>
                      {enabled ? 'Disable' : 'Enable'}
                    </button>
                    <Link to={`/api-keys/${id}`}>View Logs</Link>
                  </ActionBar>
                </ListEntry>
              ))}
          </List>
        )}
      </div>
    </div>
  )
}

const TitleSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`

const List = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const ListEntry = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  border: 1px solid gray;
  padding: 2rem;
  p {
    margin: 0;
  }
`

const TokenTextarea = styled.textarea`
  width: 100%;
`

const ActionBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-column-gap: 1rem;
`

export default memo(ApiKeyList)
