// pages/stype/stype.js

//获取应用实例
const app = getApp()

Page({
  data: {
    banner: null,
    type: 1,
    title: '好货',
    productions: [],
    list_id: "",
    request_id: "",
    search_id: "",
    activity_tags: [],
    total_count: 0,
    // 排序方式:0-综合排序;3-按价格升序;4-按价格降序;6-按销量降序;12-按照加入多多进宝时间降序;;8-优惠券金额排序降序
    page: 1,
    page_size: 10,
  },
  onPullDownRefresh: function() {
    this.reloadData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },
  onShareAppMessage: function() {
    return {
      title: `${this.data.title}`,
      path: `/pages/banners/banners?title=${this.data.title}&url=${this.data.url}&tags=${this.data.activity_tags.join(',')}`,
    };
  },
  onReachBottom: function() {
    this.loadNext();
  },
  reloadData() {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.page = 1;
    wx.cloud.callFunction({
      name: "pquery",
      data: {
        banner: true,
        page_size: this.data.page_size,
        page: this.data.page,
        activity_tags: this.data.activity_tags,
      }
    })
   .then(res => {
      if (res.result && res.result._status === 0 && res.result.data && res.result.data.goods_basic_detail_response && res.result.data.goods_basic_detail_response.list) {
        const list = res.result.data.goods_basic_detail_response.list;
        this.setData({
          productions: list,
          list_id:  res.result.data.goods_basic_detail_response.list_id,
          request_id:  res.result.data.goods_basic_detail_response.request_id,
          search_id:  res.result.data.goods_basic_detail_response.search_id,
          total_count:  res.result.data.goods_basic_detail_response.total_count,
        });
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    });
  },
  loadNext() {
    if (this.data.productions.length >= this.data.total_count) return;
    wx.showLoading({
      title: '加载中...',
    });
    wx.cloud.callFunction({
      name: "pquery",
      data: {
        banner: true,
        page_size: this.data.page_size,
        page: this.data.page + 1,
        activity_tags: this.data.activity_tags,
      }
    }).then(res => {
      wx.hideLoading();
      if (res.result && res.result._status === 0 && res.result.data && res.result.data.goods_basic_detail_response && res.result.data.goods_basic_detail_response.list) {
        const list = res.result.data.goods_basic_detail_response.list;
        this.setData({
          productions: this.data.productions.concat(list),
          list_id:  res.result.data.goods_basic_detail_response.list_id,
          request_id:  res.result.data.goods_basic_detail_response.request_id,
          search_id:  res.result.data.goods_basic_detail_response.search_id,
          total_count:  res.result.data.goods_basic_detail_response.total_count,
          page: this.data.page + 1,
        });
      }
    }).catch(err => {
      wx.hideLoading();
    });
  },
  onLoad: function (option) {
    const title = option.title;
    const activity_tags = (option.tags || '').split(',').map(v => Number(v));
    const url = option.url;
    wx.setNavigationBarTitle({
      title,
    });
    this.setData({
      title,
      activity_tags,
      url,
    })
    this.reloadData();
  },
})
