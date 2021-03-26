/* eslint-disable camelcase */
class RequestLogService {
  constructor(knexClient) {
    this.knexClient = knexClient
  }

  async log(apiKeyId, { url }) {
    const response = await this.knexClient('request_logs').insert({
      api_key_id: apiKeyId,
      url,
    })

    console.log(response)
  }
}

module.exports = RequestLogService
