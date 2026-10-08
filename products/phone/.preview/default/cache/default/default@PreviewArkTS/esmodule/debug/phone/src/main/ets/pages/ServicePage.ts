if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { ServiceViewModel } from "@normalized:N&&&@hotel/phone/src/main/ets/viewmodel/ServiceViewModel&";
import router from "@ohos:router";
import { AlertDialog } from "@ohos:arkui.advanced.Dialog";
import window from "@ohos:window";
export class ServicePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.viewModel = ServiceViewModel.getInstance();
        this.doNotDisturbActive = false;
        this.cleanRoomActive = false;
        this.sosActive = false;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.viewModel = ServiceViewModel.getInstance();
    }
    @Local
    viewModel: ServiceViewModel;
    @StorageLink('doNotDisturbActive')
    doNotDisturbActive: boolean;
    @StorageLink('cleanRoomActive')
    cleanRoomActive: boolean;
    @StorageLink('sosActive')
    sosActive: boolean;
    aboutToAppear(): void {
        this.viewModel.initRoomState();
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
    toggleDoNotDisturb(): void {
        this.viewModel.toggleDoNotDisturb();
    }
    toggleCleanRoom(): void {
        this.viewModel.toggleCleanRoom();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(34:5)", "@hotel/phone");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 0 });
            Column.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(36:7)", "@hotel/phone");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(37:9)", "@hotel/phone");
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 12 });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('                  服务控制');
            Text.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(38:11)", "@hotel/phone");
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(43:11)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('');
            Text.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(44:11)", "@hotel/phone");
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(51:9)", "@hotel/phone");
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(52:11)", "@hotel/phone");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(53:13)", "@hotel/phone");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.padding({ left: 24, right: 24, top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(54:15)", "@hotel/phone");
            Column.width(160);
            Column.height(180);
            Column.backgroundImage({ "id": 100663360, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Column.backgroundImageSize(ImageSize.Cover);
            Column.borderRadius(20);
            Column.border({ width: this.doNotDisturbActive ? 3 : 1, color: this.doNotDisturbActive ? 'rgba(240, 200, 140, 0.9)' : 'rgba(200, 168, 130, 0.3)' });
            Column.shadow(this.doNotDisturbActive ? { radius: 16, color: 'rgba(220, 175, 110, 0.45)', offsetX: 0, offsetY: 3 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => this.toggleDoNotDisturb());
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663335, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(55:17)", "@hotel/phone");
            Image.width(44);
            Image.height(44);
            Image.colorFilter(this.doNotDisturbActive ? '#FFFFFF' : '#5D4037');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请勿打扰');
            Text.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(60:17)", "@hotel/phone");
            Text.fontSize(15);
            Text.fontColor(this.doNotDisturbActive ? '#FFFFFF' : '#5D4037');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.doNotDisturbActive) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663316, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(66:19)", "@hotel/phone");
                        Image.width(42);
                        Image.height(22);
                        Image.margin({ top: 12 });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663355, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(71:19)", "@hotel/phone");
                        Image.width(42);
                        Image.height(22);
                        Image.margin({ top: 12 });
                    }, Image);
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(88:15)", "@hotel/phone");
            Column.width(160);
            Column.height(180);
            Column.backgroundImage({ "id": 100663360, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Column.backgroundImageSize(ImageSize.Cover);
            Column.borderRadius(20);
            Column.border({ width: this.cleanRoomActive ? 3 : 1, color: this.cleanRoomActive ? 'rgba(240, 200, 140, 0.9)' : 'rgba(200, 168, 130, 0.3)' });
            Column.shadow(this.cleanRoomActive ? { radius: 16, color: 'rgba(220, 175, 110, 0.45)', offsetX: 0, offsetY: 3 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => this.toggleCleanRoom());
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663382, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(89:17)", "@hotel/phone");
            Image.width(44);
            Image.height(44);
            Image.colorFilter(this.cleanRoomActive ? '#FFFFFF' : '#5D4037');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('清理房间');
            Text.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(94:17)", "@hotel/phone");
            Text.fontSize(15);
            Text.fontColor(this.cleanRoomActive ? '#FFFFFF' : '#5D4037');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cleanRoomActive) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663316, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(100:19)", "@hotel/phone");
                        Image.width(42);
                        Image.height(22);
                        Image.margin({ top: 12 });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663355, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(105:19)", "@hotel/phone");
                        Image.width(42);
                        Image.height(22);
                        Image.margin({ top: 12 });
                    }, Image);
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(126:13)", "@hotel/phone");
            Row.width('calc(100% - 48px)');
            Row.height(100);
            Row.margin({ left: 24, right: 24 });
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                if (this.sosActive) {
                    return;
                }
                AlertDialog.show({
                    title: 'SOS紧急求助',
                    message: '确认发送SOS紧急求助信号？工作人员将立即响应。',
                    autoCancel: true,
                    alignment: DialogAlignment.Center,
                    primaryButton: {
                        value: '取消',
                        action: () => { }
                    },
                    secondaryButton: {
                        value: '确认发送',
                        fontColor: '#C62828',
                        action: () => {
                            AppStorage.setOrCreate('sosActive', true);
                        }
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663386, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(127:15)", "@hotel/phone");
            Image.width('90%');
            Image.height('100%');
            Image.objectFit(ImageFit.Fill);
            Image.borderRadius(20);
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(160:13)", "@hotel/phone");
            Blank.height(80);
        }, Blank);
        Blank.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 14 });
            Row.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(168:9)", "@hotel/phone");
            Row.width('calc(100% - 48px)');
            Row.height(54);
            Row.padding({ left: 32, right: 32 });
            Row.backgroundColor('#E53935');
            Row.borderRadius(27);
            Row.margin({ left: 24, right: 24, bottom: 12 });
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.onClick(() => {
                AlertDialog.show({
                    title: '退出登录',
                    message: '确定要退出当前账号吗？',
                    autoCancel: true,
                    alignment: DialogAlignment.Center,
                    primaryButton: {
                        value: '取消',
                        action: () => { }
                    },
                    secondaryButton: {
                        value: '确定退出',
                        fontColor: '#E53935',
                        action: () => {
                            this.viewModel.logout();
                            router.replaceUrl({ url: 'pages/LoginPage' });
                        }
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('退出登录');
            Text.debugLine("products/phone/src/main/ets/pages/ServicePage.ets(169:11)", "@hotel/phone");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
