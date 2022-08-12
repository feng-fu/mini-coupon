//index.js

//获取应用实例
const app = getApp()

Page({
  onShareAppMessage: function() {
    return {
      title: "快来，这里有PDD低价的秘密",
      path: "/pages/index/index",
    }
  },
  data: {
    sellBanners: [],
    subBanners: [],
    s_category_oid: 0,
    categorys: [],
    productions: [],
    list_id: "",
    request_id: "",
    search_id: "",
    total_count: 0,
    // 排序方式:0-综合排序;3-按价格升序;4-按价格降序;6-按销量降序;12-按照加入多多进宝时间降序;;8-优惠券金额排序降序
    sort_type: 0,
    page: 1,
    navbarHeight: app.globalData.navbarHeight,
  },
  gotoAll: function() {
    wx.navigateTo({
      url: '/pages/all/all',
    });
  },
  gotoOtherMini: function(event) {
    wx.navigateToMiniProgram({
      appId: event.currentTarget.dataset.id,
      path: event.currentTarget.dataset.path,
    })
  },
  gotoStype: function(event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/stype/stype?type=' + (event.currentTarget.dataset.type || '') + "&title=" + event.currentTarget.dataset.title + "&banner=" + event.currentTarget.dataset.banner + "&tags=" + (event.currentTarget.dataset.tags || ''),
    });
  },
  onPullDownRefresh: function() {
    this.reloadData();
  },
  onReachBottom: function() {
    this.loadNext();
  },
  initPageConfig() {
    wx.showLoading({
      title: '页面初始化中...',
    });
    wx.cloud.callFunction({
      name: 'config',
    })
    .then(({ result = {} }) => {
      const { oid = 0 } = (result.categorys || {})[0] || {};
      this.setData({
        sellBanners: result.sellBanners || [],
        subBanners: result.subBanners || [],
        categorys: result.categorys || [],
        s_category_oid: oid,
      });
      this.reloadData();
      wx.hideLoading();
    })
    .catch(ex => {
      wx.showToast({
        title: ex.message,
        icon: 'fail',
      });
      wx.hideLoading();
    })
  },
  reloadData() {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.page = 1;
    const data = {
      sort_type: this.data.sort_type,
      opt_id: this.data.s_category_oid,
    };
    wx.cloud.callFunction({
      name: "pquery",
      data,
    })
    .then(res => {
      if (res.result && res.result._status === 0 && res.result.data && res.result.data.goods_search_response && res.result.data.goods_search_response.goods_list) {
        const list = res.result.data.goods_search_response.goods_list;
        this.setData({
          productions: list,
          list_id:  res.result.data.goods_search_response.list_id,
          request_id:  res.result.data.goods_search_response.request_id,
          search_id:  res.result.data.goods_search_response.search_id,
          total_count:  res.result.data.goods_search_response.total_count,
        });
      }
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }).catch(err => {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    });
  },
  loadNext() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "pquery",
      data: {
        sort_type: this.data.sort_type,
        opt_id: this.data.s_category_oid,
        page: this.data.page + 1,
        list_id: this.data.list_id,
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result && res.result._status === 0 && res.result.data && res.result.data.goods_search_response && res.result.data.goods_search_response.goods_list) {
        const list = res.result.data.goods_search_response.goods_list;
        this.setData({
          productions: this.data.productions.concat(list),
          list_id:  res.result.data.goods_search_response.list_id,
          request_id:  res.result.data.goods_search_response.request_id,
          search_id:  res.result.data.goods_search_response.search_id,
          total_count:  res.result.data.goods_search_response.total_count,
          page: this.data.page + 1
        });
      }
    }).catch(err => {
      wx.hideLoading();
    });
  },
  changeCategoryId: function(event) {
    if (event && event.target && event.target.dataset) {
      if (this.data.s_category_oid != event.target.dataset.oid) {
        this.setData({
          s_category_oid: event.target.dataset.oid,
        });
        this.reloadData();
      }
    }
  },
  changeSortType: function(event) {
    let isChange = false;
    if (event && event.target && event.target.dataset) {
      if (event.target.dataset.type) {
        switch(event.target.dataset.type) {
          case "zh":
            if (this.data.sort_type !== 0) {
              this.setData({
                sort_type: 0
              });
              isChange = true;
            }
            break;
          case "yhq":
            if (this.data.sort_type !== 8) {
              this.setData({
                sort_type: 8
              });
              isChange = true;
            }
            break;
          case "xl":
            if (this.data.sort_type !== 6) {
              this.setData({
                sort_type: 6
              });
              isChange = true;
            }
            break;
          case "jg":
            if (this.data.sort_type !== 3 && this.data.sort_type !== 4) {
              this.setData({
                sort_type: 3
              });
              isChange = true;
            } else {
              this.setData({
                sort_type: this.data.sort_type === 3 ? 4 : 3
              });
              isChange = true;
            }
            break;
          default:
            break;
        }
        if (isChange) {
          this.reloadData();
        }
      }
    }
  },
  onLoad: function () {
    this.initPageConfig();
  }
})
