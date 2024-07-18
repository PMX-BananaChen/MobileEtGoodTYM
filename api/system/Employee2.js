import request from '@/utils/request'

// 查询人员列表
export function listEmployee2(query) {
  return request({
    url: '/system/Employee2/list',
    method: 'get',
    params: query
  })
}

// 查询人员详细
export function getEmployee2(empNo) {
  return request({
    url: '/system/Employee2/' + empNo,
    method: 'get'
  })
}

// 新增人员
export function addEmployee2(data) {
  return request({
    url: '/system/Employee2',
    method: 'post',
    data: data
  })
}

// 修改人员
export function updateEmployee2(data) {
  return request({
    url: '/system/Employee2',
    method: 'put',
    data: data
  })
}

// 删除人员
export function delEmployee2(empNo) {
  return request({
    url: '/system/Employee2/' + empNo,
    method: 'delete'
  })
}

// 导出人员
export function exportEmployee2(query) {
  return request({
    url: '/system/Employee2/export',
    method: 'get',
    params: query
  })
}

// 查询子表人员列表
export function listEmployee21(query) {
  return request({
    url: '/system/Employee2/list1',
    method: 'get',
    params: query
  })
}
