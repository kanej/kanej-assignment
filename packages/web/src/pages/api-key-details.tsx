import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Layout from '../components/layout'
import RequestLogList from '../components/request-log-list'

const ApiKeyDetails: React.FC = () => {
  const { apiKey } = useParams<{ apiKey: string }>()

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
      <Layout>
        <RequestLogList requestLogs={requestLogs} />
      </Layout>
    </div>
  )
}

export default ApiKeyDetails
