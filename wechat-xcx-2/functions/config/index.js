const cloud = require('wx-server-sdk');
cloud.init();

// 4-秒杀，7-百亿补贴，10851-千万补贴，10913-招商礼金商品，31-品牌黑标，10564-精选爆品-官方直推爆款，10584-精选爆品-团长推荐，24-品牌高佣，其他的值请忽略
const subBanners = [
  {
    title: '百亿补贴',
    tags: '10851',
    image: 'https://t16img.yangkeduo.com/mms_static/88a318a31eff2a8106d6cf8d0a4f0f53.png',
  },
  {
    title: '品牌黑标',
    tags: '31',
    image: 'https://t16img.yangkeduo.com/mms_static/3a68aa18c4383bf81a73dabdfdf45b25.png',
  },
	{
		tags: '10564',
    title: '官方直推',
    // 这是一个秒表
    image: 'https://t16img.yangkeduo.com/mms_static/164ed90b8597500292acc0715a5c42d1.png',
	},
	{
		tags: '10584',
    title: '精选爆品',
    image: 'https://t16img.yangkeduo.com/mms_static/f1f6ae6cae5abbea7e5b3bf2bdab2b05.png',
	},
	{
    tags: '24',
    title: '畅销榜单',
    image: 'https://t16img.yangkeduo.com/mms_static/2019-11-22/ba0ac4ef-77f8-46dd-861b-f6b5c2de279e.png',
	},
];

const banners = [
  {
    title: '阿迪达斯狂暑季，超值爆款69起',
    activity_tags: '11019',
    url: 'https://t16img.yangkeduo.com/pdd_oms/2021-07-20/49902202339977cc2d426aeb773d1a7b.png'
  },
  {
    title: '三彩断码清仓大促，爆款直降1折起~',
    activity_tags: '11009',
    url: 'https://promotion.pddpic.com/cart/2021-07-16/a838e2bb-6369-4107-b45d-b96a028ec63e_suffix.jpeg'
  },
  {
    title: '百草味超级爆款15.5起 官方额外补贴',
    activity_tags: '11005',
    url: 'https://t16img.yangkeduo.com/pdd_oms/2021-07-14/55c7108bf7d0cb5b9824cac213ebbbce.jpg',
  },
  {
    activity_tags: '10990',
    title: '拼多多品牌优选补贴',
    url: 'https://t16img.yangkeduo.com/pdd_oms/2021-07-05/1f6244bffe1c5605c12d9c29f89bdf14.png',
  },
  {
    url: 'https://t16img.yangkeduo.com/pdd_oms/2020-12-13/0cf02d3c49ebfafee1582b9150e6c2ff.jpg',
    activity_tags: '10635',
    title: '拼多多万人团',
  },
  {
    url: 'https://t16img.yangkeduo.com/pdd_oms/2021-06-30/d3bd01301e9984532d4d6e9a7cc3e38b.png',
    activity_tags: '10983',
    title: '阿迪达斯奥莱官方专场',
  },
]

const categorys = [
    {
      text: "精选",
      oid: 0,
      tag: 4,
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
  ];

exports.main = async () => {
	return {
    subBanners,
    banners,
    categorys,
	};
};
