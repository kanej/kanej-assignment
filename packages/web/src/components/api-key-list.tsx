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

  return (
    <div>
      <TitleSection>
        <h4>API Keys</h4>
        <div></div>
        <button onClick={addApiKey}>Add New API Key</button>
      </TitleSection>
      <div>
        <ul>
          {apiKeys
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(({ id, enabled }) => (
              <li key={id}>
                <p>
                  key - {id} - status: {enabled ? 'enabled' : 'disabled'} -{' '}
                  <Link to={`/api-keys/${id}`}>view</Link> -
                  <button data-api-key-id={id} onClick={handleToggleEnabled}>
                    {enabled ? 'Disable' : 'Enable'}
                  </button>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

const TitleSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`

export default memo(ApiKeyList)
