import React, { useCallback, useEffect, useState } from 'react'
import ApiKeyList from '../components/api-key-list'
import { ApiKey } from '../domain'

const Dashboard: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<Array<ApiKey>>([])

  const handleAddApiKey = useCallback(async () => {
    const response = await fetch(`http://localhost:12800/admin/api/api-keys`, {
      method: 'PUT',
    })

    if (response.status !== 200) {
      console.error('Unable to add api key')
      return
    }

    const newApiKey = await response.json()

    setApiKeys([...apiKeys, newApiKey])
  }, [apiKeys])

  const HandleToggleEnabled = useCallback(
    async (apiKeyId) => {
      const keyId = parseInt(apiKeyId, 10)
      const apiKey = apiKeys.find(({ id }) => id === keyId)

      if (!apiKey) {
        throw new Error('Unable to find api key')
      }

      const response = await fetch(
        `http://localhost:12800/admin/api/api-keys/${apiKeyId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...apiKey,
            enabled: !Boolean(apiKey.enabled),
          }),
        },
      )

      if (response.status !== 200) {
        console.error('Unable to read api keys')
        return
      }

      const { id, enabled } = await response.json()

      setApiKeys(
        apiKeys.map((key) => (key.id === id ? { ...key, enabled } : key)),
      )
    },
    [apiKeys],
  )

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!mounted) {
        return
      }

      const response = await fetch('http://localhost:12800/admin/api/api-keys')

      if (response.status !== 200) {
        return
      }

      setApiKeys(await response.json())
    }

    run()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <ApiKeyList
        apiKeys={apiKeys}
        addApiKey={handleAddApiKey}
        toggleEnabled={HandleToggleEnabled}
      />
    </div>
  )
}

export default Dashboard
