import React from 'react'
import { ApiKey } from '../domain'

const ApiKeyList: React.FC<{ apiKeys: Array<ApiKey> }> = ({ apiKeys = [] }) => {
  return (
    <div>
      <div>API Keys</div>
      <div>
        <ul>
          {apiKeys.map(({ id, enabled }) => (
            <li>
              <p>
                key - {id} - enabled {enabled}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ApiKeyList
