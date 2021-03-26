/* eslint-disable camelcase */
class RequestLogService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async log(apiKeyId, { url }) {
    return this.knexClient('request_logs').insert({
      api_key_id: apiKeyId,
      url,
    })
  }
}

module.exports = RequestLogService
