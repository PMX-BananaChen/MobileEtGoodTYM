import request from '@/utils/request'

// 查询宿舍签核人员列表
export function listDormlist(query) {
  return request({
    url: '/system/Dormlist/list',
    method: 'get',
    params: query
  })
}

// 查询宿舍签核人员详细
export function getDormlist(dormlistid) {
  return request({
    url: '/system/Dormlist/' + dormlistid,
    method: 'get'
  })
}

// 新增宿舍签核人员
export function addDormlist(data) {
  return request({
    url: '/system/Dormlist',
    method: 'post',
    data: data
  })
}

// 修改宿舍签核人员
export function updateDormlist(data) {
  return request({
    url: '/system/Dormlist',
    method: 'put',
    data: data
  })
}

// 删除宿舍签核人员
export function delDormlist(dormlistid) {
  return request({
    url: '/system/Dormlist/' + dormlistid,
    method: 'delete'
  })
}

// 导出宿舍签核人员
export function exportDormlist(query) {
  return request({
    url: '/system/Dormlist/export',
    method: 'get',
    params: query
  })
}