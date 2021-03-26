import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RequestLog } from '../domain'

const RequestLogList: React.FC<{
  requestLogs: Array<RequestLog>
}> = ({ requestLogs = [] }) => {
  return (
    <Wrap>
      <div>
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
      <div>
        <h4>Request Logs</h4>
      </div>
      <List>
        {requestLogs.map(({ id, url, created_at }) => (
          <ListEntry key={id}>
            <div>
              <p>#{id}</p>
            </div>

            <div>
              <p>{url}</p>
            </div>
            <div></div>

            <div>{created_at}</div>
          </ListEntry>
        ))}
      </List>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const List = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const ListEntry = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-column-gap: 1rem;
  border: 1px solid gray;
  padding: 1rem;
  p {
    margin: 0;
  }
`

export default memo(RequestLogList)
