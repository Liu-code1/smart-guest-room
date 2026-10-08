if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { LightViewModel } from "@normalized:N&&&@hotel/light/src/main/ets/viewmodel/LightViewModel&1.0.0";
import type { LightModel } from '@hotel/common';
import window from "@ohos:window";
export class LightPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.viewModel = LightViewModel.getInstance();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.viewModel = LightViewModel.getInstance();
    }
    @Local
    viewModel: LightViewModel;
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
            Stack.debugLine("features/light/src/main/ets/pages/LightPage.ets(24:5)", "@hotel/light");
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 0 });
            Column.debugLine("features/light/src/main/ets/pages/LightPage.ets(25:7)", "@hotel/light");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("features/light/src/main/ets/pages/LightPage.ets(26:9)", "@hotel/light");
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 12 });
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('灯光控制');
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(27:11)", "@hotel/light");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("features/light/src/main/ets/pages/LightPage.ets(32:11)", "@hotel/light");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('');
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(33:11)", "@hotel/light");
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("features/light/src/main/ets/pages/LightPage.ets(40:9)", "@hotel/light");
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("features/light/src/main/ets/pages/LightPage.ets(41:11)", "@hotel/light");
            Column.width('100%');
            Column.padding({ bottom: 120 });
        }, Column);
        this.MainSwitchCard.bind(this)();
        this.SceneModeCard.bind(this)();
        this.LightListCard.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    MainSwitchCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("features/light/src/main/ets/pages/LightPage.ets(61:5)", "@hotel/light");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 32, bottom: 24, left: 24, right: 24 });
            Column.borderRadius(20);
            Column.shadow(this.viewModel.mainSwitchOn ? { radius: 16, color: 'rgba(220, 175, 110, 0.4)', offsetX: 0, offsetY: 3 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Column.margin({ left: 24, right: 24, top: 20 });
            Column.alignItems(HorizontalAlign.Center);
            Column.backdropBlur(12);
            Column.onClick(() => {
                this.viewModel.toggleMainSwitch();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("features/light/src/main/ets/pages/LightPage.ets(62:7)", "@hotel/light");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 100663351, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
            Image.debugLine("features/light/src/main/ets/pages/LightPage.ets(63:9)", "@hotel/light");
            Image.width(this.viewModel.mainSwitchOn ? 110 : 90);
            Image.height(this.viewModel.mainSwitchOn ? 110 : 90);
            Image.opacity(this.viewModel.mainSwitchOn ? 1 : 0.5);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.viewModel.mainSwitchOn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('Ⅰ');
                        Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(69:11)", "@hotel/light");
                        Text.fontSize(28);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#FFFFFF');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.viewModel.mainSwitchOn ? '总开关 - 开启' : '总开关 - 关闭');
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(76:7)", "@hotel/light");
            Text.fontSize(15);
            Text.fontWeight(this.viewModel.mainSwitchOn ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.viewModel.mainSwitchOn ? '#FFFFFF' : '#E0E0E0');
        }, Text);
        Text.pop();
        Column.pop();
    }
    SceneModeCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.debugLine("features/light/src/main/ets/pages/LightPage.ets(95:5)", "@hotel/light");
            Column.width('calc(100% - 48px)');
            Column.padding({ top: 20, bottom: 20, left: 20, right: 20 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(180, 140, 80, 0)', 0], ['rgba(120, 80, 40, 0', 1]]
            });
            Column.borderRadius(20);
            Column.border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' });
            Column.margin({ left: 24, right: 24 });
            Column.backdropBlur(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('场景模式');
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(96:7)", "@hotel/light");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("features/light/src/main/ets/pages/LightPage.ets(102:7)", "@hotel/light");
            Flex.width('100%');
        }, Flex);
        this.ModeItem.bind(this)('明亮模式', { "id": 100663310, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 0);
        this.ModeItem.bind(this)('柔和模式', { "id": 100663304, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 1);
        this.ModeItem.bind(this)('阅读模式', { "id": 100663359, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 2);
        this.ModeItem.bind(this)('温馨模式', { "id": 100663317, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 3);
        this.ModeItem.bind(this)('睡眠模式', { "id": 100663384, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, 4);
        Flex.pop();
        Column.pop();
    }
    ModeItem(text: string, icon: Resource, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("features/light/src/main/ets/pages/LightPage.ets(125:5)", "@hotel/light");
            Row.width(index === 4 ? '100%' : 'calc(50% - 6px)');
            Row.height(48);
            Row.padding({ left: 16, right: 16 });
            Row.margin({ bottom: index < 4 ? 6 : 0 });
            Row.backgroundImage({ "id": 100663349, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" }, ImageRepeat.NoRepeat);
            Row.backgroundImageSize(ImageSize.Cover);
            Row.borderRadius(12);
            Row.border({
                width: this.viewModel.selectedModeIndex === index ? 1.5 : 0.5,
                color: this.viewModel.selectedModeIndex === index ? 'rgba(240, 200, 140, 0.9)' : 'rgba(160, 125, 75, 0.25)'
            });
            Row.shadow(this.viewModel.selectedModeIndex === index ? { radius: 12, color: 'rgba(220, 175, 110, 0.35)', offsetX: 0, offsetY: 2 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
            Row.backdropBlur(8);
            Row.onClick(() => {
                this.viewModel.setLightMode(index);
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("features/light/src/main/ets/pages/LightPage.ets(126:7)", "@hotel/light");
            Image.width(22);
            Image.height(22);
            Image.colorFilter(this.viewModel.selectedModeIndex === index ? '#f0d184' : '#b99d6e');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(131:7)", "@hotel/light");
            Text.fontSize(17);
            Text.fontColor(this.viewModel.selectedModeIndex === index ? '#FFFFFF' : '#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
    }
    LightListCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.debugLine("features/light/src/main/ets/pages/LightPage.ets(158:5)", "@hotel/light");
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
            Text.create('独立控制');
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(159:7)", "@hotel/light");
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#FFFFFF');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("features/light/src/main/ets/pages/LightPage.ets(165:7)", "@hotel/light");
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const light = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LightControlItemComponent(this, { light: light, onToggle: () => { light.isOn = !light.isOn; } }, undefined, elmtId, () => { }, { page: "features/light/src/main/ets/pages/LightPage.ets", line: 167, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    light: light,
                                    onToggle: () => { light.isOn = !light.isOn; }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                light: light
                            });
                        }
                    }, { name: "LightControlItemComponent" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.viewModel.roomState.lights, forEachItemGenFunction, (light: LightModel) => light.id.toString(), true, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class LightControlItemComponent extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("light", (params && "light" in params) ? params.light : undefined);
        this.onToggle = "onToggle" in params ? params.onToggle : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("light", (params && "light" in params) ? params.light : undefined);
        this.onToggle = "onToggle" in params ? params.onToggle : () => { };
    }
    @Param
    readonly light: LightModel;
    @Event
    onToggle?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("features/light/src/main/ets/pages/LightPage.ets(191:5)", "@hotel/light");
            Row.width('calc(50% - 6px)');
            Row.padding({ left: 16, right: 16, top: 14, bottom: 14 });
            Row.margin({ bottom: 6 });
            Row.linearGradient({
                angle: 135,
                colors: this.light.isOn ?
                    [['rgba(230, 190, 130, 0)', 0], ['rgba(200, 155, 90, 0)', 1]] :
                    [['rgba(80, 60, 40, 0)', 0], ['rgba(50, 35, 25, 0)', 1]]
            });
            Row.borderRadius(14);
            Row.border({
                width: this.light.isOn ? 1.5 : 0.5,
                color: this.light.isOn ? 'rgba(240, 200, 140, 0.8)' : 'rgba(120, 90, 60, 0.25)'
            });
            Row.shadow(this.light.isOn ? { radius: 10, color: 'rgba(220, 175, 110, 0.3)', offsetX: 0, offsetY: 2 } : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 });
            Row.backdropBlur(8);
            Row.onClick(() => {
                this.onToggle?.();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(LightViewModel.getInstance().getLightIcon(this.light));
            Image.debugLine("features/light/src/main/ets/pages/LightPage.ets(192:7)", "@hotel/light");
            Image.width(26);
            Image.height(26);
            Image.colorFilter(this.light.isOn ? '#FFFFFF' : '#E0E0E0');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.light.name);
            Text.debugLine("features/light/src/main/ets/pages/LightPage.ets(197:7)", "@hotel/light");
            Text.fontSize(12);
            Text.fontWeight(this.light.isOn ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.light.isOn ? '#FFFFFF' : '#E0E0E0');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.light.isOn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663316, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/light/src/main/ets/pages/LightPage.ets(204:9)", "@hotel/light");
                        Image.width(46);
                        Image.height(24);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 100663355, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" });
                        Image.debugLine("features/light/src/main/ets/pages/LightPage.ets(208:9)", "@hotel/light");
                        Image.width(46);
                        Image.height(24);
                    }, Image);
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("light" in params) {
            this.updateParam("light", params.light);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
