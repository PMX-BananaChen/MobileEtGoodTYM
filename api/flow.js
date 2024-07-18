import request from '@/utils/request'

// 查询物品流程列表
export function listFlow(query) {
  return request({
    url: '/system/Flow/list',
    method: 'get',
    params: query
  })
}

// 查询物品流程详细
export function getFlow(id) {
  return request({
    url: '/system/Flow/' + id,
    method: 'get'
  })
}

// 新增物品流程
export function addFlow(data) {
  return request({
    url: '/system/Flow',
    method: 'post',
    data: data
  })
}

// 修改物品流程
export function updateFlow(data) {
  return request({
    url: '/system/Flow',
    method: 'put',
    data: data
  })
}

// 删除物品流程
export function delFlow(id) {
  return request({
    url: '/system/Flow/' + id,
    method: 'delete'
  })
}

// 导出物品流程
export function exportFlow(query) {
  return request({
    url: '/system/Flow/export',
    method: 'get',
    params: query
  })
}