import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import ApiKeyDetails from './pages/api-key-details'
import Dashboard from './pages/dashboard'
import Login from './pages/login'

const Authenticate: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleConfirmLoggedIn = useCallback(() => {
    setLoggedIn(true)
  }, [])

  useEffect(() => {
    if (loggedIn) {
      return
    }

    let mounted = true

    const run = async () => {
      if (!mounted) {
        return
      }

      const response = await fetch('/admin/api/whoami')

      if (!mounted) {
        return
      }

      if (response.status !== 200) {
        return
      }

      setLoggedIn(true)
    }

    run()

    return () => {
      mounted = false
    }
  }, [loggedIn])

  if (!loggedIn) {
    return <Login confirmLoggedIn={handleConfirmLoggedIn} />
  }

  return <div>{children}</div>
}

function App() {
  return (
    <div className="App">
      <Authenticate>
        <header>
          <h2>Authenticated IPFS API Assignment</h2>
        </header>
        <main>
          <Router>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/api-keys/:apiKey">
                <ApiKeyDetails />
              </Route>
            </Switch>
          </Router>
        </main>
      </Authenticate>
    </div>
  )
}

export default App
