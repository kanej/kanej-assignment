import React from 'react'
import { Link } from 'react-router-dom'
import { ApiKey } from '../domain'

const ApiKeyList: React.FC<{ apiKeys: Array<ApiKey> }> = ({ apiKeys = [] }) => {
  return (
    <div>
      <div>API Keys</div>
      <div>
        <ul>
          {apiKeys.map(({ id, enabled }) => (
            <li key={id}>
              <p>
                key - {id} - enabled {enabled} -{' '}
                <Link to={`/api-keys/${id}`}>view</Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ApiKeyList
