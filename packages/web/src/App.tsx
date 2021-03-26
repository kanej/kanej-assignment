import React, { useEffect, useState } from 'react'
import './App.css'
import ApiKeyList from './components/api-key-list'
import { ApiKey } from './domain'

function App() {
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
    <div className="App">
      <h2>Authenticated IPFS API Assignment</h2>

      <ApiKeyList apiKeys={apiKeys} />
    </div>
  )
}

export default App
