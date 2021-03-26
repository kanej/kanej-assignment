import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const ApiKeyDetails: React.FC = () => {
  const { apiKey } = useParams<{ apiKey: string }>()
  console.log(apiKey)

  const [requestLogs, setRequestLogs] = useState([])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!mounted) {
        return
      }

      const response = await fetch(`/admin/api/api-keys/${apiKey}/request-logs`)

      if (response.status !== 200) {
        return
      }

      setRequestLogs(await response.json())
    }

    run()

    return () => {
      mounted = false
    }
  }, [apiKey])

  return (
    <div>
      <div>Request Logs</div>
      <div>
        <ul>
          {requestLogs.map(({ id, url }) => (
            <li key={id}>
              {id} - {url}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
    </div>
  )
}

export default ApiKeyDetails
