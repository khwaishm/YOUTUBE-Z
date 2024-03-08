// Purpose:  Custom handling the structure of the API response.

class ApiResponse {
  constructor(status, message = 'sucess', data) {
    this.status = status
    this.message = message
    this.data = data
    this.success = true < 400
  }
}

export { ApiResponse }
