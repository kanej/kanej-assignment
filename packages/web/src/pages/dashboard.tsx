import React, { useEffect, useState } from 'react'
import ApiKeyList from '../components/api-key-list'

const Dashboard: React.FC = () => {
  const [apiKeys, setApiKeys] = useState([])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!mounted) {
        return
      }

      const response = await fetch('http://localhost:12800/admin/api/apikeys')

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
      <ApiKeyList apiKeys={apiKeys} />
    </div>
  )
}

export default Dashboard
