if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { CurtainViewModel } from "@normalized:N&&&@hotel/phone/src/main/ets/viewmodel/CurtainViewModel&";
import window from "@ohos:window";
export class CurtainPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.viewModel = new CurtainViewModel();
        this.curtainOpen = false;
        this.screeningOpen = false;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.viewModel = new CurtainViewModel();
        this.curtainOpen = false;
        this.screeningOpen = false;
    }
    @Local
    viewModel: CurtainViewModel;
    @Local
    curtainOpen: boolean;
    @Local
    screeningOpen: boolean;
    aboutToAppear(): void {
        this.viewModel.initRoomState();
        this.curtainOpen = this.viewModel.curtains.length > 1 && this.viewModel.curtains[1].isOpen;
        this.screeningOpen = this.viewModel.curtains.length > 0 && this.viewModel.curtains[0].isOpen;
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
            Stack.create();
            Stack.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(27:5)", "@hotel/phone");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 0 });
            Column.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(28:7)", "@hotel/phone");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(29:9)", "@hotel/phone");
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 12 });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('窗帘控制');
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(30:11)", "@hotel/phone");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(35:11)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('');
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(36:11)", "@hotel/phone");
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(43:9)", "@hotel/phone");
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(44:11)", "@hotel/phone");
            Column.width('100%');
            Column.padding({ bottom: 120 });
        }, Column);
        this.QuickControlCard.bind(this)();
        this.CurtainSectionCard.bind(this)();
        this.ScreeningSectionCard.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    QuickControlCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 14 });
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(64:5)", "@hotel/phone");
            Row.width('calc(100% - 48px)');
            Row.margin({ left: 24, right: 24, top: 18 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(65:7)", "@hotel/phone");
            Row.layoutWeight(1);
            Row.height(46);
            Row.padding({ left: 18, right: 18 });
            Row.backgroundColor('#C4A882');
            Row.borderRadius(23);
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                this.viewModel.openAll();
                this.curtainOpen = true;
                this.screeningOpen = true;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663376, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(66:9)", "@hotel/phone");
            Image.width(22);
            Image.height(22);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('全部打开');
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(69:9)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontColor('#5D4037');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(85:7)", "@hotel/phone");
            Row.layoutWeight(1);
            Row.height(46);
            Row.padding({ left: 18, right: 18 });
            Row.backgroundColor('#B89A74');
            Row.borderRadius(23);
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                this.viewModel.closeAll();
                this.curtainOpen = false;
                this.screeningOpen = false;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663375, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(86:9)", "@hotel/phone");
            Image.width(22);
            Image.height(22);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('全部关闭');
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(89:9)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontColor('#5D4037');
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
    }
    CurtainSectionCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 18 });
            Column.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(111:5)", "@hotel/phone");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 22, bottom: 22, left: 24, right: 24 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(190, 155, 105, 0.28)', 0], ['rgba(140, 100, 55, 0.32)', 1]]
            });
            Column.borderRadius(20);
            Column.border({ width: 1, color: 'rgba(196, 168, 130, 0.35)' });
            Column.margin({ left: 24, right: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('布帘');
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(112:7)", "@hotel/phone");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E8DCC8');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(118:7)", "@hotel/phone");
            Stack.width('100%');
            Stack.height(170);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.curtainOpen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(120:11)", "@hotel/phone");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663340, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(121:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663353, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(125:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(131:11)", "@hotel/phone");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663327, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(132:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663388, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(136:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(142:9)", "@hotel/phone");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663331, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(144:9)", "@hotel/phone");
            Image.width(200);
            Image.height(6);
            Image.margin({ top: 0 });
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 36 });
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(152:7)", "@hotel/phone");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.ControlButton.bind(this)('打开', { "id": 100663345, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, () => {
            this.viewModel.openCurtain();
            this.curtainOpen = true;
        });
        this.ControlButton.bind(this)('关闭', { "id": 100663367, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, () => {
            this.viewModel.closeCurtain();
            this.curtainOpen = false;
        });
        Row.pop();
        Column.pop();
    }
    ScreeningSectionCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 18 });
            Column.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(179:5)", "@hotel/phone");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 22, bottom: 22, left: 24, right: 24 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(190, 155, 105, 0.28)', 0], ['rgba(140, 100, 55, 0.32)', 1]]
            });
            Column.borderRadius(20);
            Column.border({ width: 1, color: 'rgba(196, 168, 130, 0.35)' });
            Column.margin({ left: 24, right: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('窗纱');
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(180:7)", "@hotel/phone");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E8DCC8');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(186:7)", "@hotel/phone");
            Stack.width('100%');
            Stack.height(170);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.screeningOpen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(188:11)", "@hotel/phone");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663325, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(189:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663313, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(193:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(199:11)", "@hotel/phone");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663348, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(200:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663358, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(204:13)", "@hotel/phone");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(210:9)", "@hotel/phone");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663331, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(212:9)", "@hotel/phone");
            Image.width(200);
            Image.height(6);
            Image.margin({ top: 0 });
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 36 });
            Row.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(220:7)", "@hotel/phone");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.ControlButton.bind(this)('打开', { "id": 100663345, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, () => {
            this.viewModel.openScreening();
            this.screeningOpen = true;
        });
        this.ControlButton.bind(this)('关闭', { "id": 100663367, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, () => {
            this.viewModel.closeScreening();
            this.screeningOpen = false;
        });
        Row.pop();
        Column.pop();
    }
    ControlButton(text: string, icon: Resource, action: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(247:5)", "@hotel/phone");
            Column.onClick(action);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(248:7)", "@hotel/phone");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663336, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(249:9)", "@hotel/phone");
            Image.width(50);
            Image.height(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(252:9)", "@hotel/phone");
            Image.width(26);
            Image.height(26);
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("products/phone/src/main/ets/pages/CurtainPage.ets(257:7)", "@hotel/phone");
            Text.fontSize(13);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
