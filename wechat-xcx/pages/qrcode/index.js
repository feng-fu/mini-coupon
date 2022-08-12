import QR from './util';
const canvasId = 'mycanvas';
// pages/qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    qrcode: '',
    generated: false,
    imagePath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onChange: function(e) {
    this.setData({
      value: e.detail.value,
    });
  },

  onGenerate: function() {
    this.createQrCode (this.data.value);
  },

  createQrCode: function (content) {
    wx.showLoading({
      title: '生成中',
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 500);
    wx.createSelectorQuery().select('#' + canvasId).boundingClientRect().exec(([res]) => {
      const { width, height } = res || {};
      //调用插件中的draw方法，绘制二维码图片
      //this.canvasToTempImage 为绘制完成的回调函数，可根据自己的业务添加
      QR.api.draw(content, canvasId, width, height, this, this.canvasToTempImage);
      this.setData({
        generated: true,
      });
    })
  },

  //获取临时缓存图片路径，存入data中
  canvasToTempImage: function (canvasId) {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId,   // 这里canvasId即之前创建的canvas-id
      success: function (res) {
        let tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({       // 如果采用mpvue,即 this.imagePath = tempFilePath
          imagePath:tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  pressSaveImage: function() {
    if (!this.data.generated) return;
    var that = this;
    //用户需要授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 同意授权,保存图片
              that.canvasTrans();
            },
            fail: (res) => {
              console.log(res)
            }
          })
        } else {
          // 已经授权了
          that.canvasTrans();
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  canvasTrans() {
    const self = this;
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        canvasId: canvasId,
        fileType: 'png',
        success(res) {
          self.saveImg(res.tempFilePath);
        }
      })
    }, 500)
  },
  saveImg(url) {
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success: res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        });
      }
    })
    // var that = this;
    // const url = 
    // var fm = wx.getFileSystemManager(); //是获取文件管理器对象
    // fm.saveFile({
    //   filePath: wx.env.USER_DATA_PATH + '/qCode.png', //创建一个临时文件的文件名
    //   tempFilePath: url,
    //   success: res => {
    //     debugger
    //     // 保存到相册
    //     // wx.saveImageToPhotosAlbum({
    //     //   filePath: wx.env.USER_DATA_PATH + '/qCode.png',
    //     //   success: function(res) {
    //     //     wx.showModal({
    //     //       content: '二维码已保存到相册，赶紧扫码加群吧~',
    //     //       showCancel: false,
    //     //       confirmText: '好的',
    //     //       confirmColor: '#333333',
    //     //       success: function(res) {
    //     //         // if (res.confirm) {
    //     //         //   /* 隐藏弹框 */
    //     //         //   that.setData({
    //     //         //     codeModal: true
    //     //         //   })
    //     //         // }
    //     //       },
    //     //       fail: function(res) {
    //     //         console.log(res)
    //     //       }
    //     //     })
    //     //   },
    //     //   fail: function(err) {
    //     //     console.log(err)
    //     //   }
    //     // })
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
  },

  onShareAppMessage: function () {
    return {
      title: '来pdd省钱多，不仅有生成二维码工具，还能省钱',
      path: '/pages/qrcode/index'
    }
  },
})