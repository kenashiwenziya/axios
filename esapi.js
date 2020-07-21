import { get, post, deleteRequest, put } from './esrequest'

// post
export function post (params) {
  return post('/xxx', params)
}

// get
export function getResult (params) {
  return get('/xxx/' + params)
}

// put
export function put (params) {
  return put('/xxx' + params)
}

// delete
export function delete () {
  return deleteRequest('/xxx')
}
