const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'https://ruankun.natappvip.cc';

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    let header = {
      'content-type': 'application/json',
    };
    if(url !== '/login'){
      header.token = ''
    }
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        if (res.data.code == 1) {
          resolve(res);
        } else {
          reject('错误,' + res.msg);
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const API = {
  login: (data) => request(POST, '/login', data),
  // 修改用户信息
  changeInfo: (data) => request(POST, '/user', data),
  // 获取用户信息
  getInfo: () => request(GET, '/user'),
  // 上传实验图片
  upImg: (data) => request(POST, '/image', data),
  // 调用算法处理实验数据，处理完成后只返回imageid
  upProcess: (data) => request(POST, '/process', data),
  // 根据imageid获取处理结果
  getProcessRes: (data) => request(GET, '/processresult', data),
  // 返回拟合出的scatter和linear数据
  getAxios: (data) => request(GET, '/fit', data),
  //
}