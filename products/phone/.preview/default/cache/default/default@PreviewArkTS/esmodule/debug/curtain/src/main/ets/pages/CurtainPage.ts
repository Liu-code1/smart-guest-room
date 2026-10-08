if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { CurtainViewModel } from "@normalized:N&&&@hotel/curtain/src/main/ets/viewmodel/CurtainViewModel&1.0.0";
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
        this.curtainOpen = this.viewModel.roomState.curtains.length > 1 && this.viewModel.roomState.curtains[1].isOpen;
        this.screeningOpen = this.viewModel.roomState.curtains.length > 0 && this.viewModel.roomState.curtains[0].isOpen;
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
            Stack.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(28:5)", "@hotel/curtain");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 0 });
            Column.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(29:7)", "@hotel/curtain");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(30:9)", "@hotel/curtain");
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 12 });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('窗帘控制');
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(31:11)", "@hotel/curtain");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(36:11)", "@hotel/curtain");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('');
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(37:11)", "@hotel/curtain");
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(44:9)", "@hotel/curtain");
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(45:11)", "@hotel/curtain");
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
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(67:5)", "@hotel/curtain");
            Row.width('calc(100% - 48px)');
            Row.margin({ left: 24, right: 24, top: 18 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(68:7)", "@hotel/curtain");
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
            Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(69:9)", "@hotel/curtain");
            Image.width(22);
            Image.height(22);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('全部打开');
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(72:9)", "@hotel/curtain");
            Text.fontSize(14);
            Text.fontColor('#5D4037');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(88:7)", "@hotel/curtain");
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
            Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(89:9)", "@hotel/curtain");
            Image.width(22);
            Image.height(22);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('全部关闭');
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(92:9)", "@hotel/curtain");
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
            Column.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(114:5)", "@hotel/curtain");
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
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(115:7)", "@hotel/curtain");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E8DCC8');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(121:7)", "@hotel/curtain");
            Stack.width('100%');
            Stack.height(170);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.curtainOpen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(123:11)", "@hotel/curtain");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663340, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(124:13)", "@hotel/curtain");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663353, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(128:13)", "@hotel/curtain");
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
                        Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(134:11)", "@hotel/curtain");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663327, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(135:13)", "@hotel/curtain");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663388, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(139:13)", "@hotel/curtain");
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
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(145:9)", "@hotel/curtain");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663331, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(147:9)", "@hotel/curtain");
            Image.width(200);
            Image.height(6);
            Image.margin({ top: 0 });
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 36 });
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(155:7)", "@hotel/curtain");
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
            Column.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(183:5)", "@hotel/curtain");
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
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(184:7)", "@hotel/curtain");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#E8DCC8');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(190:7)", "@hotel/curtain");
            Stack.width('100%');
            Stack.height(170);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.screeningOpen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(192:11)", "@hotel/curtain");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663325, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(193:13)", "@hotel/curtain");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663313, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(197:13)", "@hotel/curtain");
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
                        Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(203:11)", "@hotel/curtain");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663348, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(204:13)", "@hotel/curtain");
                        Image.width(110);
                        Image.height(160);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663358, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(208:13)", "@hotel/curtain");
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
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(214:9)", "@hotel/curtain");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663331, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(216:9)", "@hotel/curtain");
            Image.width(200);
            Image.height(6);
            Image.margin({ top: 0 });
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 36 });
            Row.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(224:7)", "@hotel/curtain");
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
            Column.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(253:5)", "@hotel/curtain");
            Column.onClick(action);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(254:7)", "@hotel/curtain");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663336, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(255:9)", "@hotel/curtain");
            Image.width(50);
            Image.height(50);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(258:9)", "@hotel/curtain");
            Image.width(26);
            Image.height(26);
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("features/curtain/src/main/ets/pages/CurtainPage.ets(263:7)", "@hotel/curtain");
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
