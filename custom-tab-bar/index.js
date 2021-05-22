Component({
	data: {
		active: 0,
		list: [
			{
        normal:"/assets/index.png",
        active:"/assets/index2.png",
				icon: 'home-o',
				text: '主页',
				url: '/pages/index/index'
			},
			{
				icon: 'search',
				text: '历史',
				url: '/pages/history/history'
      },
      {
				icon: 'search',
				text: '用户',
				url: '/pages/user/user'
			},
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});