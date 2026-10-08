if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { HomeViewModel } from "@normalized:N&&&@hotel/phone/src/main/ets/viewmodel/HomeViewModel&";
import window from "@ohos:window";
export class HomePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.viewModel = new HomeViewModel();
        this.doNotDisturbActive = false;
        this.cleanRoomActive = false;
        this.currentSceneMode = '';
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.viewModel = new HomeViewModel();
    }
    @Local
    viewModel: HomeViewModel;
    @StorageLink('doNotDisturbActive')
    doNotDisturbActive: boolean;
    @StorageLink('cleanRoomActive')
    cleanRoomActive: boolean;
    @StorageLink('currentSceneMode')
    currentSceneMode: string;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("products/phone/src/main/ets/pages/HomePage.ets(26:5)", "@hotel/phone");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 0 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(27:7)", "@hotel/phone");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(28:9)", "@hotel/phone");
            Row.width('100%');
            Row.padding({ left: 24, right: 24, top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('智慧客房');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(29:11)", "@hotel/phone");
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/HomePage.ets(33:11)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.viewModel.roomState.hotel_name);
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(34:11)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontColor('#C8A882');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('欢迎回家，房号 ' + this.viewModel.roomState.room_number);
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(41:9)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
            Text.padding({ left: 24 });
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("products/phone/src/main/ets/pages/HomePage.ets(48:9)", "@hotel/phone");
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.None);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(49:11)", "@hotel/phone");
            Column.width('100%');
            Column.padding({ bottom: 16 });
        }, Column);
        this.AirConditionerCard.bind(this)();
        this.SceneModeCard.bind(this)();
        this.QuickServiceCard.bind(this)();
        this.NightModeCard.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    AirConditionerCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 18 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(71:5)", "@hotel/phone");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 24, bottom: 24, left: 24, right: 24 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(180, 140, 80, 0.35)', 0], ['rgba(120, 80, 40, 0.45)', 1]]
            });
            Column.borderRadius(20);
            Column.border({ width: 1, color: 'rgba(200, 168, 130, 0.3)' });
            Column.margin({ left: 24, right: 24, top: 8 });
            Column.backdropBlur(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(72:7)", "@hotel/phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663344, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(73:9)", "@hotel/phone");
            Image.width(40);
            Image.height(40);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(77:9)", "@hotel/phone");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('空调');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(78:11)", "@hotel/phone");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.viewModel.acOpen ? '运行中' : '已关闭');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(82:11)", "@hotel/phone");
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/HomePage.ets(87:9)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663372, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(89:9)", "@hotel/phone");
            Image.width(56);
            Image.height(56);
            Image.opacity(this.viewModel.acOpen ? 1 : 0.4);
            Image.onClick(() => {
                this.viewModel.toggleAirConditioner();
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(99:7)", "@hotel/phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(100:9)", "@hotel/phone");
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(101:11)", "@hotel/phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('当前温度');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(102:13)", "@hotel/phone");
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/HomePage.ets(106:13)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设定温度');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(108:13)", "@hotel/phone");
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/HomePage.ets(112:13)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.viewModel.currentTemp + '°C');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(114:13)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontColor('#D4A574');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 24 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(120:11)", "@hotel/phone");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663339, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(121:13)", "@hotel/phone");
            Image.width(44);
            Image.height(44);
            Image.onClick(() => {
                this.viewModel.adjustTemp(-1);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.viewModel.targetTemp + '°C');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(128:13)", "@hotel/phone");
            Text.fontSize(40);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#D4A574');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663326, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(133:13)", "@hotel/phone");
            Image.width(44);
            Image.height(44);
            Image.onClick(() => {
                this.viewModel.adjustTemp(1);
            });
        }, Image);
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    SceneModeCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(161:5)", "@hotel/phone");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 20, bottom: 20, left: 20, right: 20 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(180, 140, 80, 0.25)', 0], ['rgba(120, 80, 40, 0.35)', 1]]
            });
            Column.borderRadius(20);
            Column.border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' });
            Column.margin({ left: 24, right: 24 });
            Column.backdropBlur(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('场景模式');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(162:7)", "@hotel/phone");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("products/phone/src/main/ets/pages/HomePage.ets(168:7)", "@hotel/phone");
            Flex.width('100%');
        }, Flex);
        this.ModeItem.bind(this)('明亮模式', { "id": 100663369, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
        this.ModeItem.bind(this)('柔和模式', { "id": 100663329, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
        this.ModeItem.bind(this)('阅读模式', { "id": 100663356, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
        this.ModeItem.bind(this)('温馨模式', { "id": 100663323, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
        Flex.pop();
        Column.pop();
    }
    ModeItem(text: string, icon: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(190:5)", "@hotel/phone");
            Row.width('calc(50% - 8px)');
            Row.height(60);
            Row.padding({ left: 18, right: 18 });
            Row.margin({ bottom: 6 });
            Row.backgroundImage({ "id": 100663360, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Row.backgroundImageSize(ImageSize.Cover);
            Row.borderRadius(14);
            Row.border({
                width: this.currentSceneMode === text ? 4 : 0.5,
                color: this.currentSceneMode === text ? '#FFFFFF' : 'rgba(160, 125, 75, 0.25)'
            });
            Row.shadow(this.currentSceneMode === text
                ? { radius: 18, color: 'rgba(255, 190, 120, 0.6)', offsetX: 0, offsetY: 4 }
                : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
            Row.backdropBlur(8);
            Row.onClick(() => {
                this.viewModel.switchSceneMode(text);
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(191:7)", "@hotel/phone");
            Image.width(28);
            Image.height(28);
            Image.colorFilter(this.currentSceneMode === text ? '#5D4037' : '#5D4037');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(195:7)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontWeight(this.currentSceneMode === text ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.currentSceneMode === text ? '#5D4037' : '#5D4037');
        }, Text);
        Text.pop();
        Row.pop();
    }
    QuickServiceCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(224:5)", "@hotel/phone");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 20, bottom: 20, left: 20, right: 20 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(180, 140, 80, 0.25)', 0], ['rgba(120, 80, 40, 0.35)', 1]]
            });
            Column.borderRadius(20);
            Column.border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' });
            Column.margin({ left: 24, right: 24 });
            Column.backdropBlur(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('快捷服务');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(225:7)", "@hotel/phone");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 14 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(231:7)", "@hotel/phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(232:9)", "@hotel/phone");
            Row.layoutWeight(1);
            Row.height(54);
            Row.padding({ left: 18, right: 18 });
            Row.backgroundImage({ "id": 100663360, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Row.backgroundImageSize(ImageSize.Cover);
            Row.borderRadius(14);
            Row.border({ width: this.doNotDisturbActive ? 4 : 1, color: this.doNotDisturbActive ? '#FFFFFF' : 'rgba(200, 168, 130, 0.3)' });
            Row.shadow(this.doNotDisturbActive ? { radius: 16, color: 'rgba(220, 175, 110, 0.45)', offsetX: 0, offsetY: 3 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
            Row.onClick(() => {
                this.viewModel.toggleService('请勿打扰');
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663335, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(233:11)", "@hotel/phone");
            Image.width(26);
            Image.height(26);
            Image.colorFilter(this.doNotDisturbActive ? '#5D4037' : '#5D4037');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请勿打扰');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(238:11)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontWeight(this.doNotDisturbActive ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.doNotDisturbActive ? '#5D4037' : '#5D4037');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(257:9)", "@hotel/phone");
            Row.layoutWeight(1);
            Row.height(54);
            Row.padding({ left: 18, right: 18 });
            Row.backgroundImage({ "id": 100663360, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Row.backgroundImageSize(ImageSize.Cover);
            Row.borderRadius(14);
            Row.border({ width: this.cleanRoomActive ? 4 : 1, color: this.cleanRoomActive ? '#FFFFFF' : 'rgba(200, 168, 130, 0.3)' });
            Row.shadow(this.cleanRoomActive ? { radius: 16, color: 'rgba(220, 175, 110, 0.45)', offsetX: 0, offsetY: 3 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
            Row.onClick(() => {
                this.viewModel.toggleService('清理房间');
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663382, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(258:11)", "@hotel/phone");
            Image.width(26);
            Image.height(26);
            Image.colorFilter(this.cleanRoomActive ? '#FFFFFF' : '#5D4037');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('清理房间');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(263:11)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontWeight(this.cleanRoomActive ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.cleanRoomActive ? '#5D4037' : '#5D4037');
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
    NightModeCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 14 });
            Row.debugLine("products/phone/src/main/ets/pages/HomePage.ets(298:5)", "@hotel/phone");
            Row.width('calc(100% - 48px)');
            Row.padding({ left: 30, right: 30, top: 20, bottom: 20 });
            Row.backgroundImage({ "id": 100663357, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Row.backgroundImageSize(ImageSize.Cover);
            Row.borderRadius(20);
            Row.border({
                width: this.viewModel.nightModeActive ? 4 : 1,
                color: this.viewModel.nightModeActive ? '#FFFFFF' : 'rgba(200, 168, 130, 0.4)'
            });
            Row.shadow(this.viewModel.nightModeActive
                ? { radius: 24, color: 'rgba(255, 215, 0, 0.7)', offsetX: 0, offsetY: 4 }
                : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Row.margin({ left: 30, right: 24 });
            Row.backdropBlur(12);
            Row.onClick(() => {
                this.viewModel.toggleNightMode();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663332, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(299:7)", "@hotel/phone");
            Image.width(40);
            Image.height(40);
            Image.colorFilter(this.viewModel.nightModeActive ? '#FFFFFF' : '#E0E0E0');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.debugLine("products/phone/src/main/ets/pages/HomePage.ets(304:7)", "@hotel/phone");
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('晚安模式');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(305:9)", "@hotel/phone");
            Text.fontSize(17);
            Text.fontWeight(this.viewModel.nightModeActive ? FontWeight.Bold : FontWeight.Medium);
            Text.fontColor(this.viewModel.nightModeActive ? '#5D4037' : '#5D4037');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('一键关闭所有灯光');
            Text.debugLine("products/phone/src/main/ets/pages/HomePage.ets(309:9)", "@hotel/phone");
            Text.fontSize(12);
            Text.fontColor(this.viewModel.nightModeActive ? '#5D4037' : '#5D4037');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("products/phone/src/main/ets/pages/HomePage.ets(315:7)", "@hotel/phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663383, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("products/phone/src/main/ets/pages/HomePage.ets(317:7)", "@hotel/phone");
            Image.width(28);
            Image.height(28);
            Image.colorFilter(this.viewModel.nightModeActive ? '#FFFFFF' : '#E0E0E0');
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
