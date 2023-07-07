import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('douyinTestPanel')
export class douyinTestPanel extends Component {

    @property({type:Node,tooltip:"btnContainer"})
    btnContainer:Node = null;

    @property({type:Button,tooltip:"login"})
    loginBtn:Button = null;

    @property({type:Button,tooltip:"checkSession"})
    checkSessionBtn:Button = null;

    @property({type:Button,tooltip:"getSetting"})
    getSettingBtn:Button = null;

    @property({type:Button,tooltip:"openSettingBtn"})
    openSettingBtn:Button = null;

    @property({type:Button,tooltip:"getUserInfoBtn"})
    getUserInfoBtn:Button = null;

    @property({type:Button,tooltip:"authenticateRealNameBtn"})
    authenticateRealNameBtn:Button = null;

    @property({type:Button,tooltip:"authorizeBtn"})
    authorizeBtn:Button = null;

    @property({type:Button,tooltip:"showDouyinOpenAuthBtn"})
    showDouyinOpenAuthBtn:Button = null;

    @property({type:Button,tooltip:"showFavoriteGuideBtn"})
    showFavoriteGuideBtn:Button = null;

    @property({type:Button,tooltip:"createRewardedVideoAdBtn"})
    createRewardedVideoAdBtn:Button = null;

    @property({type:Button,tooltip:"createBannerAdBtn"})
    createBannerAdBtn:Button = null;

    @property({type:Button,tooltip:"createInterstitialAdBtn"})
    createInterstitialAdBtn:Button = null;

    @property({type:Button,tooltip:"joinGroup"})
    joinGroupBtn:Button = null;

    @property({type:Button,tooltip:"checkGroupInfoBtn"})
    checkGroupInfoBtn:Button = null;

    // @property({type:Button,tooltip:"share"})
    // shareBtn:Button = null;

    // @property({type:Button,tooltip:"share"})
    // shareBtn:Button = null;

    // @property({type:Button,tooltip:"share"})
    // shareBtn:Button = null;

    private btnCallBack: {name:string,func:Function}[] = new Array<{name:string,func:Function}>();
    protected onLoad(): void {
        console.log("douyinTestPanel onLoad");

        // for (let i = 0; i < this.btnContainer.children.length; i++) {
        //     const element = this.btnContainer.children[i];
        //     const btn = element.getComponent(Button);

        // }

        if (typeof tt !== 'undefined')
        {
            //监听实名认证成功，在用户未实名的情况下，打开游戏后会主动弹出实名认证弹框，用户完成认证后会回调该方法，该方法为同步方法。
            tt.onRealNameAuthenticationComplete(function (obj) {
                console.log("实名认证完成回调 ", obj.state);
            });

            //监听用户点击右上角菜单中的“添加到我的小程序”按钮时触发的事件
            tt.onFavoriteStateChange((isFavorited) => {
            if (isFavorited) {
                console.log("收藏成功");
            } else {
                console.log("收藏失败");
            }
            });
        }
    }

    start() {

        this.btnCallBack.push({name:"关闭",func:()=>{
            this.node.active = false;
            this.node.destroy();
        }});
        this.btnCallBack.push({name:"login",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.login({
                    force: true,
                    success(res) {
                        console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
                    },
                    fail(res) {
                        console.log(`login 调用失败`);
                    },
                    });
            }
        }});
        this.btnCallBack.push({name:"checkSession",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.checkSession({
                    success() {
                      console.log(`session 未过期`);
                    },
                    fail() {
                      console.log(`session 已过期，需要重新登录`);
                      tt.login({
                        success: (res) => {
                          console.log("登录成功", res);
                        },
                        fail: (err) => {
                          console.log("登录失败", err);
                        },
                      });
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"getSetting",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.getSetting({
                    success(res) {
                      console.log(res);
                    },
                    fail(res) {
                      console.log(`getSetting 调用失败`);
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"openSetting",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.openSetting({
                    success(res) {
                      console.log(res);
                    },
                    fail(res) {
                      console.log(`openSetting 调用失败`);
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"getUserInfo",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.getUserInfo({
                    // withCredentials: true,
                    // withRealNameAuthenticationInfo: true,
                    success(res) {
                      console.log(`getUserInfo 调用成功`, res.userInfo);
                    },
                    fail(res) {
                      console.log(`getUserInfo 调用失败`, res.errMsg);
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"authenticateRealName",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.authenticateRealName({
                    success(_res) {
                      console.log("用户实名认证成功");
                    },
                    fail(res) {
                      console.log("用户实名认证失败", res.errMsg);
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"authorize",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.authorize({
                    scope: "scope.userInfo",
                    success() {
                      // 用户同意授权用户信息
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"showDouyinOpenAuth",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.showDouyinOpenAuth({
                    scopes: {
                      im: 0, // 用户无法取消
                      "im.media": 2,
                    },
                    success(res) {
                      console.log("success", res);
                    },
                    fail(res) {
                      console.log("fail", res);
                    },
                    complete(res) {
                      console.log("complete", res);
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"showFavoriteGuide",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.showFavoriteGuide({
                    type: "customize",
                    success(res) {
                      console.log("isFavorited",res.isFavorited);  //此处输出 “ifFavorited：true” 代表用户已收藏，若为false代表用户未收藏
                    },
                    fail(res) {
                      console.log("自定义弹窗展示失败");
                    },
                  });
            }
        }});
        this.btnCallBack.push({name:"createRewardedVideoAd",func:()=>{
            if (typeof tt !== 'undefined')
            {
                const videoAd = tt.createRewardedVideoAd({
                    adUnitId: "xxxxxxxxxxx",
                    multiton: true,
                    multitonRewardMsg: ['更多奖励1', '更多奖励2', '更多奖励3'],
                    multitonRewardTimes: 3,
                    progressTip: false,
                });
                videoAd.onLoad(() => {
                });
                videoAd.offLoad(() => {
                });
                videoAd.load().then(() => {
                });

                videoAd.onClose((res) => {
                });
                videoAd.offClose((res) => {
                });
                videoAd.onError((err) => {
                });
                videoAd.offError((err) => {
                });
                
                videoAd.show().then(() => {
                    console.log("广告显示成功");
                  })
                  .catch((err) => {
                    console.log("广告组件出现问题", err);
                    // 可以手动加载一次
                    videoAd.load().then(() => {
                      console.log("手动加载成功");
                      // 加载成功后需要再显示广告
                      videoAd.show();
                    });
                });
            }
        }});
        this.btnCallBack.push({name:"createBannerAd",func:()=>{
            if (typeof tt !== 'undefined')
            {
                const bannerAd = tt.createBannerAd({
                    adUnitId: "xxxxxxxxxxx",
                    adIntervals: 31,
                    style: {
                        left: 0,
                        top: 0,
                        width: 300,
                    }
                });
                bannerAd.onLoad(() => {
                });
                bannerAd.offLoad(() => {
                });
                bannerAd.load().then(() => {
                });

                bannerAd.onClose((res) => {
                });
                bannerAd.offClose((res) => {
                });
                bannerAd.onError((err) => {
                });
                bannerAd.offError((err) => {
                });
                
                bannerAd.show().then(() => {
                    console.log("广告显示成功");
                  })
                  .catch((err) => {
                    console.log("广告组件出现问题", err);
                    // 可以手动加载一次
                    bannerAd.load().then(() => {
                      console.log("手动加载成功");
                      // 加载成功后需要再显示广告
                      bannerAd.show();
                    });
                });
            }
        }});
        this.btnCallBack.push({name:"createInterstitialAd",func:()=>{
            if (typeof tt !== 'undefined')
            {
                const interstitialAd = tt.createInterstitialAd({
                    adUnitId: "xxxxxxxxxxx",
    
                });
                interstitialAd.onLoad(() => {
                });
                interstitialAd.offLoad(() => {
                });
                interstitialAd.load().then(() => {
                });

                interstitialAd.onClose((res) => {
                });
                interstitialAd.offClose((res) => {
                });
                interstitialAd.onError((err) => {
                });
                interstitialAd.offError((err) => {
                });
                
                interstitialAd.show().then(() => {
                    console.log("广告显示成功");
                  })
                  .catch((err) => {
                    console.log("广告组件出现问题", err);
                    // 可以手动加载一次
                    interstitialAd.load().then(() => {
                      console.log("手动加载成功");
                      // 加载成功后需要再显示广告
                      interstitialAd.show();
                    });
                });
            }
        }});
        this.btnCallBack.push({name:"joinGroup",func:()=>{
            if (typeof tt !== 'undefined')
            {

                tt .getSystemInfoSync({
                    success(res) {
                        console.log(`pixelRatio: ${res.pixelRatio}`)
                        console.log(`windowWidth: ${res.windowWidth}`)
                        console.log(`windowHeight: ${res.windowHeight}`)
                        console.log(`screenWidth: ${res.screenWidth}`)
                        console.log(`screenHeight: ${res.screenHeight}`)
                        console.log(`language: ${res.language}`)
                        console.log(`version: ${res.version}`)
                        console.log(`system: ${res.system}`)
                        console.log(`platform: ${res.platform}`)
                        console.log(`fontSizeSetting: ${res.fontSizeSetting}`)
                        console.log(`SDKVersion: ${res.SDKVersion}`)
                    }
                })

                tt.joinGroup({
                    groupid: "998877", //加入的群id，可在平台创建群聊后获得
                    sessionFrom: "sessionFrom",
                    extraInfo: "extraInfo",
                    success(res) {
                        console.log(res);
                    },
                    fail(res) {
                        console.log(res);
                    }
                });
            }
        }});
        this.btnCallBack.push({name:"checkGroupInfo",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.checkGroupInfo({
                    openid: "openid",
                    success(res) {
                      console.log(res);
                    },
                    fail(res) {
                      console.log(res);
                    },
                  });
            }
        }});
        // this.btnCallBack.push({name:"share",func:this.share});
        // this.btnCallBack.push({name:"shareWithGroup",func:this.shareWithGroup});
        // this.btnCallBack.push({name:"shareWithTicket",func:this.shareWithTicket});


        this.btnCallBack.push({name:"设置好友排名",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.setImRankData({
                    dataType: 0, //成绩为数字类型
                    value: "999999", //该用户得了999999分
                    priority: 0, //dataType为数字类型，不需要权重，直接传0
                    extra: "extra",
                    success(res) {
                      console.log(`setImRankData success res: ${res}`);
                    },
                    fail(res) {
                      console.log(`setImRankData fail res: ${res.errMsg}`);
                    },
                  });
            }
        }});





        this.btnCallBack.push({name:"获取好友排名",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.getImRankList({
                    relationType: "default", //好友榜、总榜都展示
                    dataType: 1, //只圈选type为枚举类型的数据进行排序
                    rankType: "day", //每天凌晨0点更新，只对当天0点到现在写入的数据进行排序
                    suffix: "", //为空或不填，一般枚举类型不需要填后缀
                    rankTitle: "rankTitle", //标题
                    success(res) {
                      console.log(`getImRankData success res: ${res}`);
                    },
                    fail(res) {
                      console.log(`getImRankData fail res: ${res.errMsg}`);
                    },
                  });
            }
        }});





        this.btnCallBack.push({name:"获取排名数据",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.getOpenDataContext().postMessage({
                    command: "getImRankData",
                    arg: {
                        relationType: "friend",
                        dataType: 0,
                        rankType: "month",
                        pageNum: 1,
                        pageSize: 40,
                        success(res) {
                          console.log(`getImRankData success res: ${res}`);
                        },
                        fail(res) {
                          console.log(`getImRankData fail res: ${res.errMsg}`);
                        },
                      }
                    });
        
            }
        }});






        this.btnCallBack.push({name:"写入排行榜数据",func:()=>{
            if (typeof tt !== 'undefined')
            {

                tt.getOpenDataContext().postMessage({
                    command: "setImRankDataInOpenContext",
                    arg: {
                        dataType: 0, //成绩为数字类型
                        value: "999999", //该用户得了999999分
                        priority: 0, //dataType为数字类型，不需要权重，直接传0
                        extra: "extra",
                        success(res) {
                          console.log(`setImRankDataInOpenContext success res: ${res}`);
                        },
                        fail(res) {
                          console.log(`setImRankDataInOpenContext fail res: ${res.errMsg}`);
                        },
                      }
                    });

            }
        }});



        this.btnCallBack.push({name:"上报分析",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.reportAnalytics("clickBanner", {
                    time: 1547533711355,
                    uid: 123456,
                  });
            }
        }});

        this.btnCallBack.push({name:"订阅消息",func:()=>{
            if (typeof tt !== 'undefined')
            {
                const tmplIds = ["MSGxx", "MSGxx"];
                tt.requestSubscribeMessage({
                  tmplIds: tmplIds,
                  complete: (res) => {
                    tt.showModal({
                      title: "订阅完成",
                      content: JSON.stringify(res),
                    });
                  },
                });
            }
        }});


        this.btnCallBack.push({name:"获取开放数据域",func:()=>{
            if (typeof tt !== 'undefined')
            {
                const openCtx = tt.getOpenDataContext();
                openCtx.postMessage({
                  company: "bytedance",
                });
            }
        }});


        this.btnCallBack.push({name:"测试开放数据域",func:()=>{
            if (typeof tt !== 'undefined')
            {
                const openCtx = tt.getOpenDataContext();
                openCtx.postMessage({
                  command: "render",
                });
                const openDataContext = tt.getOpenDataContext();
                const sharedCanvas = openDataContext.canvas;
                
                const canvas = tt.createCanvas();
                const context = canvas.getContext("2d");
                context.drawImage(sharedCanvas, 0, 0);
            }
        }});


        this.btnCallBack.push({name:"获取托管数据friend",func:()=>{
            if (typeof tt !== 'undefined')
            {
                // 获取关系类型为friend的用户托管数据（非排行榜）

                tt.getOpenDataContext().postMessage({
                    command: "getCloudStorageByRelation",
                    arg: {
                        type: "friend",
                        keyList: ["score"],
                        success: (res) => {
                        console.log("调用成功");
                        console.log(res.data);
                        },
                        fail: (res) => {
                        console.log("调用失败");
                        },
                        complete: (res) => {
                        console.log("调用完成");
                        },
                    }
                    });

            }
        }});

        this.btnCallBack.push({name:"获取托管数据group",func:()=>{
            if (typeof tt !== 'undefined')
            {
                // 获取关系类型为group的挑战排行榜数据

                tt.getOpenDataContext().postMessage({
                    command: "getCloudStorageByRelation",
                    arg: {
                        type: "group",
                        keyList: ["ranlList"],
                        extra: {
                          sortKey: "ranlList", // 指定的key需要在后台配置过
                          groupId: "test_group", // 指定要获取的用户所属分组
                        },
                        success: (res) => {
                          console.log("调用成功");
                          console.log(res.data);
                        },
                        fail: (res) => {
                          console.log("调用失败");
                        },
                        complete: (res) => {
                          console.log("调用完成");
                        },
                      }
                    });
            }
        }});

        this.btnCallBack.push({name:"用户存储写入",func:()=>{
            if (typeof tt !== 'undefined')
            {

                tt.getOpenDataContext().postMessage({
                    command: "setUserCloudStorage",
                    arg: {
                        KVDataList: [
                          {
                            key: "ranlList",
                            value: JSON.stringify({
                              ttgame: {
                                score: 100,
                                update_time: 1557813466,
                              },
                              progress: 10,
                            }),
                          },
                        ],
                        success: (res) => {
                          console.log("调用成功");
                          console.log(res.errMsg);
                        },
                        fail: (res) => {
                          console.log("调用失败");
                        },
                        complete: (res) => {
                          console.log("调用完成");
                        },
                      }
                    });
            }
        }});

        this.btnCallBack.push({name:"用户存储读取",func:()=>{
            if (typeof tt !== 'undefined')
            {

                tt.getOpenDataContext().postMessage({
                    command: "getUserCloudStorage",
                    arg: {
                        keyList: ["xxx"], // 要获取的 key 列表
                        success: (res) => {
                          console.log("调用成功");
                          console.log(res.KVDataList);
                        },
                        fail: (res) => {
                          console.log("调用失败");
                        },
                        complete: (res) => {
                          console.log("调用完成");
                        },
                      }
                    });
            }
        }});

        this.btnCallBack.push({name:"用户存储删除",func:()=>{
            if (typeof tt !== 'undefined')
            {

                
                tt.getOpenDataContext().postMessage({
                    command: "removeUserCloudStorage",
                    arg: {
                        keyList: ["xxx"], // 要删除的 key 列表,
                        success: (res) => {
                          console.log("调用成功");
                          console.log(res.errMsg);
                        },
                        fail: (res) => {
                          console.log("调用失败");
                        },
                        complete: (res) => {
                          console.log("调用完成");
                        },
                      }
                    });
            }
        }});


        this.btnCallBack.push({name:"设置数据分组",func:()=>{
            if (typeof tt !== 'undefined')
            {
                tt.setUserGroup({
                    groupId: "test_group",
                  });
            }
        }});




        console.log("自定义分析数据上报",this.btnCallBack);
        let btnCallBackIndex = 0;
        for (let i = 0; i < this.btnContainer.children.length; i++) {
            if (btnCallBackIndex >= this.btnCallBack.length) {
                break;
            }
            let callback = this.btnCallBack[btnCallBackIndex];
            const element = this.btnContainer.children[i];
            const btn =  element.getComponent(Button);
            btn.node.on("click",callback.func,this);
            btnCallBackIndex++;
            btn.getComponentInChildren(Label).string = callback.name;
        }




    }

    update(deltaTime: number) {
        
    }
}


