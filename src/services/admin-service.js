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

  async getRequestLogsFor(apiKeyId) {
    const result = await this.knexClient
      .select(['id', 'url'])
      .from('request_logs')
      .where('api_key_id', '=', apiKeyId)

    return result
  }

  async setApiKeyEnabled(apiKeyId, enabled) {
    return this.knexClient('api_keys')
      .where({ id: apiKeyId })
      .update({ enabled })
  }
}

module.exports = AdminService
