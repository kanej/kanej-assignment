class AdminService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async getApiKeysFor(userId) {
    const result = await this.knexClient
      .select(['id', 'user_id', 'enabled'])
      .from('api_keys')
      .where('user_id', '=', userId)

    return result
  }
}

module.exports = AdminService
