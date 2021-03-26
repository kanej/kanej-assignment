const { JWT } = require('jose')
const { SECRET } = require('../constants')

/* eslint-disable camelcase */
class AdminService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async getApiKeysFor(userId) {
    const result = await this.knexClient
      .select(['id', 'user_id', 'token', 'enabled'])
      .from('api_keys')
      .where('user_id', '=', userId)

    return result
  }

  async createNewApiKeyFor(userId) {
    const newKey = {
      user_id: userId,
      token: 'na',
      enabled: true,
    }

    const [{ id }] = await this.knexClient('api_keys').insert(newKey, ['id'])

    const token = JWT.sign({ userId, apiKeyId: id }, SECRET, {
      issuer: 'https://kanej-assignment.com',
    })

    await this.knexClient('api_keys').where({ id }).update({ token })

    return { id, ...newKey, token }
  }

  async getRequestLogsFor(apiKeyId) {
    const result = await this.knexClient
      .select(['id', 'api_key_id', 'url', 'created_at'])
      .from('request_logs')
      .where('api_key_id', '=', apiKeyId)

    return result
  }

  async setApiKeyEnabled(apiKeyId, userId, enabled) {
    return this.knexClient('api_keys')
      .where({ id: apiKeyId })
      .where({ user_id: userId })
      .update({ enabled })
  }
}

module.exports = AdminService
