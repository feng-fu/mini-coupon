const cloud = require('wx-server-sdk');
cloud.init();

// 0-1.9包邮, 1-今日爆款, 2-品牌好货,3-相似商品推荐,4-猜你喜欢,5-实时热销,6-实时收益,7-今日畅销,8-高佣榜单，默认1
const subBanners = [
  {
    title: '618',
    tags: '10939',
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/sale.png',
    banner: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/618.jpeg',
  },
  {
    title: '优选品牌',
    tags: '10926',
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/icon-6.png',
    banner: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/baiyi.png',
  },
	{
    title: '万人团',
    tags: '10635',
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/icon-01.png',
    banner: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/wanren.jpg',
	},
	// {
  //   tags: '10851',
  //   title: '品牌日',
  //   image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/1.9.png',
  //   banner: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/1.9-banner.png',
	// },
	{
		type: 5,
    title: '实时热销',
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/icon-03.png',
		banner: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/s-pp.jpg',
	},
	{
		type: 6,
    title: '畅销榜单',
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/icon-05.png',
		banner: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/bao.jpeg',
	},
];

const sellBanners = [
  {
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/ele.jpeg',
    appId: 'wxece3a9a4c82f58c9',
    path: 'taoke/pages/shopping-guide/index?scene=QQEOVmu',
  },
	{
		image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/TB16Sf834v1gK0jSZFFXXb0sXXa-640-361.jpeg',
    appId: 'wxece3a9a4c82f58c9',
		path: 'pages/sharePid/web/index?scene=https://s.click.ele.me/Wc37jmu',
  },
  {
    image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/mtwm.jpeg',
    appId: 'wxde8ac0a21135c07d',
    path: '/index/pages/h5/h5?f_userId=1&f_token=1&s_cps=1&weburl=https%3A%2F%2Fdpurl.cn%2F5V5RmGbz',
  },
	{
		image: 'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/TB1RJGpq6MZ7e4jSZFOXXX7epXa-800-450.jpeg',
    appId: 'wxece3a9a4c82f58c9',
		path: 'pages/sharePid/web/index?scene=https://s.click.ele.me/zkw7jmu',
	},
	{
		image:
			'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/O1CN01rkzxym1NkVY83cXzy_!!6000000001608-2-tps-800-450.png',
		appId: 'wxece3a9a4c82f58c9',
		path: 'pages/sharePid/web/index?scene=https://s.click.ele.me/iar7jmu',
	},
	{
		image:
			'cloud://pre-2grho195022e5708.7072-pre-2grho195022e5708-1306187285/files/O1CN01EHXwxB1EtMfdfp64d_!!6000000000409-2-tps-800-450.png',
		appId: 'wxece3a9a4c82f58c9',
		path: 'pages/sharePid/web/index?scene=https://s.click.ele.me/BrVqbmu',
	},
];

const more = [
	{
		image: '',
		appId: '',
		path: '/index/pages/h5/h5?f_userId=1&f_token=1&s_cps=1&weburl=https%3A%2F%2Fdpurl.cn%2F5V5RmGbz',
	},
	{
		image: '',
		appId: '',
		path: '/index/pages/h5/h5?f_userId=1&f_token=1&s_cps=1&weburl=https%3A%2F%2Fdpurl.cn%2Fyo5BmGwz',
	},
	{
		image: '',
		appId: '',
		path:
			'/index/pages/h5/h5?lch=mhqIykekFEV63u81zLSTaQViQ&noshare=1&f_userId=0&f_openId=0&f_token=0&weburl=https%3A%2F%2Fdpurl.cn%2FQV53mG4z',
	},
];

const categorys = [
    {
      text: "精选",
      oid: 1,
    },
    {
      text: "百货",
      oid: 15,
    },
    {
      text: "母婴",
      oid: 4,
    },
    {
      text: "女装",
      oid: 14,
    },
    {
      text: "电器",
      oid: 18,
    },
    {
      text: "鞋包",
      oid: 1281,
    },
    {
      text: "内衣",
      oid: 1282,
    },
    {
      text: "美妆",
      oid: 16,
    },
    {
      text: "男装",
      oid: 743,
    },
    {
      text: "水果",
      oid: 13,
    },
    {
      text: "家纺",
      oid: 818,
    },
    {
      text: "文具",
      oid: 2478,
    },
    {
      text: "运动",
      oid: 1451,
    },
    {
      text: "汽车",
      oid: 2048,
    },
    {
      text: "家装",
      oid: 1917,
    },
    {
      text: "家具",
      oid: 2974,
    },
    {
      text: "医药",
      oid: 3279,
    },
  ];

exports.main = async () => {
	return {
		subBanners,
        sellBanners,
        categorys,
        more,
	};
};
