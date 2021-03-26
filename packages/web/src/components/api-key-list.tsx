import React, { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ApiKey } from '../domain'

const ApiKeyList: React.FC<{
  apiKeys: Array<ApiKey>
  toggleEnabled: (apiKeyId: string) => void
}> = ({ apiKeys = [], toggleEnabled }) => {
  const handleToggleEnabled = useCallback(
    (ev) => {
      const { apiKeyId } = ev.target.dataset

      return toggleEnabled(apiKeyId)
    },
    [toggleEnabled],
  )

  return (
    <div>
      <div>API Keys</div>
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

export default memo(ApiKeyList)
