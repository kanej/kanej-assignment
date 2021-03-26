class LoginService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async signIn(username, password) {
    const result = await this.knexClient
      .select('id')
      .from('users')
      .whereRaw('username = ? AND password = crypt(?, password)', [
        username,
        password,
      ])

    if (result.length === 0) {
      return {
        authenticate: false,
      }
    }

    if (result.length > 1) {
      throw new Error('Unexpected user results')
    }

    const [{ id }] = result

    return {
      authenticate: true,
      userId: id,
    }
  }
}

module.exports = LoginService
