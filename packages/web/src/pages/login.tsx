import { useCallback, useState } from 'react'
import styled from 'styled-components'

const Login: React.FC<{ confirmLoggedIn: Function }> = ({
  confirmLoggedIn,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUsernameChange = useCallback((ev) => {
    setUsername(ev.currentTarget.value)
  }, [])

  const handlePasswordChange = useCallback((ev) => {
    setPassword(ev.currentTarget.value)
  }, [])

  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault()

      const response = await fetch('/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (response.status !== 200) {
        setError('Login failed')
        return
      }

      setError('')
      confirmLoggedIn()
    },
    [confirmLoggedIn, password, username],
  )

  return (
    <div>
      <Wrap>
        <SignInPanel onSubmit={handleSubmit}>
          <h2>Assignment</h2>
          <h2>Sign in</h2>
          <input
            required
            autoFocus
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <ErrorText>{error}</ErrorText>}
          <button type="submit">Login</button>
        </SignInPanel>
      </Wrap>
    </div>
  )
}

const Wrap = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
`

const SignInPanel = styled.form`
  display: grid;
  grid-row-gap: 1rem;
  text-align: center;

  h2 {
    margin: 0;
  }
`

const ErrorText = styled.p`
  color: red;
`

export default Login
