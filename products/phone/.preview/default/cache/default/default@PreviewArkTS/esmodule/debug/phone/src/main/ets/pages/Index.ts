if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { HomePage } from "@normalized:N&&&@hotel/home/src/main/ets/index&1.0.0";
import { LightPage } from "@normalized:N&&&@hotel/light/src/main/ets/index&1.0.0";
import { CurtainPage } from "@normalized:N&&&@hotel/curtain/src/main/ets/index&1.0.0";
import { ServicePage } from "@normalized:N&&&@hotel/service/src/main/ets/index&1.0.0";
import window from "@ohos:window";
export class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.currentTabIndex = 0;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.currentTabIndex = 0;
    }
    @Local
    currentTabIndex: number;
    aboutToAppear(): void {
        const savedIndex: number | undefined = AppStorage.Get<number>('currentTabIndex');
        if (savedIndex !== undefined) {
            this.currentTabIndex = savedIndex;
        }
        window.getLastWindow(getContext()).then((win: window.Window) => {
            win.setWindowSystemBarProperties({
                statusBarColor: '#00000000',
                navigationBarColor: '#00000000',
                isStatusBarLightIcon: true,
                isNavigationBarLightIcon: true,
                statusBarContentColor: '#FFFFFF',
            });
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Bottom });
            Stack.debugLine("products/phone/src/main/ets/pages/Index.ets(29:5)", "@hotel/phone");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663380, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/Index.ets(30:7)", "@hotel/phone");
            Image.width('100%');
            Image.height('100%');
            Image.objectFit(ImageFit.Cover);
            Image.blur(20);
            Image.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("products/phone/src/main/ets/pages/Index.ets(37:7)", "@hotel/phone");
            Column.width('100%');
            Column.height('100%');
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/Index.ets(38:9)", "@hotel/phone");
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End, index: this.currentTabIndex });
            Tabs.debugLine("products/phone/src/main/ets/pages/Index.ets(41:9)", "@hotel/phone");
            Tabs.animationDuration(0);
            Tabs.onChange((index: number) => {
                this.currentTabIndex = index;
                AppStorage.SetOrCreate('currentTabIndex', index);
            });
            Tabs.barHeight(60);
            Tabs.barBackgroundColor('rgba(30, 20, 12, 0.75)');
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HomePage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 43, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HomePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '首页', { "id": 100663334, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, { "id": 100663308, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 0);
                } });
            TabContent.debugLine("products/phone/src/main/ets/pages/Index.ets(42:11)", "@hotel/phone");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LightPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 48, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "LightPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '灯光', { "id": 100663370, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, { "id": 100663301, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 1);
                } });
            TabContent.debugLine("products/phone/src/main/ets/pages/Index.ets(47:11)", "@hotel/phone");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new CurtainPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 53, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "CurtainPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '窗帘', { "id": 100663387, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, { "id": 100663333, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 2);
                } });
            TabContent.debugLine("products/phone/src/main/ets/pages/Index.ets(52:11)", "@hotel/phone");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ServicePage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 58, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ServicePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBarItem.call(this, '服务', { "id": 100663362, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, { "id": 100663365, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 3);
                } });
            TabContent.debugLine("products/phone/src/main/ets/pages/Index.ets(57:11)", "@hotel/phone");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Stack.pop();
    }
    TabBarItem(text: string, selectedIcon: Resource, unselectedIcon: Resource, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.debugLine("products/phone/src/main/ets/pages/Index.ets(80:5)", "@hotel/phone");
            Column.width(60);
            Column.height(50);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentTabIndex === index ? selectedIcon : unselectedIcon);
            Image.debugLine("products/phone/src/main/ets/pages/Index.ets(81:7)", "@hotel/phone");
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("products/phone/src/main/ets/pages/Index.ets(84:7)", "@hotel/phone");
            Text.fontSize(12);
            Text.fontColor(this.currentTabIndex === index ? '#C8A882' : '#8A7A6A');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
