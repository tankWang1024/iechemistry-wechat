// pages/index/analyse/analyse.js
import Notify from '/@vant/weapp/notify/notify';
import Toast from '/@vant/weapp/toast/toast';
const {
    $ajax
} = require("../../../utils/util")
const double = {
    concentration: ['R', 'G', 'B', '(G+R)/B', 'G/B', 'R/B', 'R/G', 'S/V', 'H/S', 'H', 'S', 'V'],
    // 福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
const doubleMap = {
    "concentration": "C"
}

// const FitCollect = ["LeastSquares", "Ridge", "Lasso", "LassoLars", "BayesianRidge", "SVM","DecisionTree", "KNN","RandomForest", "SGD"]
const FitCollect = ["Least Squares", "Ridge", "Lasso", "Lasso Lars", "Bayesian Ridge", "SVM"]
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageid: 0,
        columns: FitCollect,
        method: "",
        axiosx: "",
        axiosy: "",
        params_msg: "please select",
        method_show: false,
        params_show: false,
        concentration_range: "",
        resultData: [],
        two_columns: [{
                values: Object.keys(double),
                className: 'column1',
            },
            {
                values: double['concentration'],
                className: 'column2',
                defaultIndex: 0,
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            imageid: options.imageid
        })
        this.getData()
    },
    onConcentration(e) {
        this.setData({
            concentration_range: e.detail
        })
    },
    getData() {

        $ajax("/processresult", "GET", {
            imageid: parseInt(this.data.imageid)
        }).then(res => {
            console.log('/processresult结果: ')
            console.log(res.datas)
            let resData = res.datas
            // 后端传的rgb，hsv值实为bgr，vsh
            for (let item of resData) {
                let strArr = item.rgb.split(" ")
                item.rgb = strArr[2] + " " + strArr[1] + " " + strArr[0]
                strArr = item.hsv.split(" ")
                item.hsv = strArr[2] + " " + strArr[1] + " " + strArr[0]
            }
            this.setData({
                resultData: res.datas
            })
        })
    },
    toShow() {
        let data = this.data
        if (!this.data.method) {
            Notify({
                type: 'warning',
                message: 'Fitting method cannot be empty'
            });
        } else if (!this.data.axiosx) {
            Notify({
                type: 'warning',
                message: 'Fitting parameter cannot be empty'
            });
        } else {
            Toast.loading({
                message: 'Under analysis...',
                forbidClick: true,
                duration: 0
            });

            $ajax("/fit", "GET", {
                method: data.method,
                imageid: data.imageid,
                axiosx: data.axiosx,
                axiosy: data.axiosy,
                concentration_range:data.concentration_range
            }).then(res => {
                console.log(res)
                Toast.clear()
                if (res.code == 1) {
                    Notify({
                        type: 'success',
                        message: 'Successful analysis, about to jump'
                    });
                    setTimeout(() => {
                        wx.navigateTo({
                            url: `/pages/index/details/details?linear=${res.linear.url}&scatter=${res.scatter.url}`,
                        })
                    }, 1000)
                } else {
                    Notify({
                        type: 'danger',
                        message: res.message
                    });
                }
            })

        }

    },
    onConfirmMethod(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            method: value,
            method_show: false
        })
    },
    onConfirmParams(event) {
        console.log(event)
        const {
            value,
            index
        } = event.detail;
        let y = doubleMap[value[0]]
        let x = value[1]
        console.log("x=" + x + " y=" + y)
        this.setData({
            axiosx: x,
            axiosy: y,
            params_msg: value[0] + " " + value[1],
            params_show: false
        })
    },
    onCloseMethod() {
        this.setData({
            method_show: false
        })
    },
    onCloseParams() {
        this.setData({
            params_show: false
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    selectMethod() {
        this.setData({
            method_show: true
        })
    },
    selectParams() {
        this.setData({
            params_show: true
        })
    },
})