import request from '@/utils/request'

// 查询物品放行列表
export function listReleaseGood(query) {
  return request({
    url: '/system/ReleaseGood/list',
    method: 'get',
    params: query
  })
}

export function listReleaseGood2(query) {
  return request({
    url: '/system/ReleaseGood/list2',
    method: 'get',
    params: query
  })
}

// 查询物品放行详细
export function getReleaseGood(formno) {
  return request({
    url: '/system/ReleaseGood/' + formno,
    method: 'get'
  })
}

// 新增物品放行
export function addReleaseGood(data) {
  return request({
    url: '/system/ReleaseGood',
    method: 'post',
    data: data
  })
}

// 修改物品放行
export function updateReleaseGood(data) {
  return request({
    url: '/system/ReleaseGood',
    method: 'put',
    data: data
  })
}

// 删除物品放行
export function delReleaseGood(formno) {
  return request({
    url: '/system/ReleaseGood/' + formno,
    method: 'delete'
  })
}

// 导出物品放行
export function exportReleaseGood(query) {
  return request({
    url: '/system/ReleaseGood/export',
    method: 'get',
    params: query
  })
}

// 上传文件
// export function uploadFiles(data) {
//   return request({
//     url: '/system/ReleaseGood/uploadFile',
//     method: 'post',
//     data: data
//   })
 