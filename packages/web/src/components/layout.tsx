import React from 'react'
import styled from 'styled-components'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Wrap>
        <div></div>
        <div>
          {' '}
          <header>
            <h2>Authenticated IPFS API Assignment</h2>
          </header>
          <Main>{children}</Main>
        </div>
        <div></div>
      </Wrap>
    </div>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 680px) 1fr;
`

const Main = styled.div`
  width: 100%;
  max-width: 680px;
`

export default Layout
