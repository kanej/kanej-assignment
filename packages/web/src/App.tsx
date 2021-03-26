import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import ApiKeyDetails from './pages/api-key-details'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App
