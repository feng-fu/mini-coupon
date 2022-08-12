// components/navbar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入关键字',
    },
    search: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: app.globalData.navbarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
  }
})

// {
//   "pagePath": "pages/search/search",
//   "text": "搜索",
//   "iconPath": "/images/search.png",
//   "selectedIconPath": "/images/search-s.png"
// },