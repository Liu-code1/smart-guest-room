if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    roomNumber?: string;
    userName?: string;
    inputRoomNumber?: string;
    inputUserName?: string;
}
import router from "@ohos:router";
import { AppStorage } from "@ohos:app.ability.AppStorage";
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__roomNumber = this.createStorageLink('roomNumber', '', "roomNumber");
        this.__userName = this.createStorageLink('userName', '', "userName");
        this.__inputRoomNumber = new ObservedPropertySimplePU('', this, "inputRoomNumber");
        this.__inputUserName = new ObservedPropertySimplePU('', this, "inputUserName");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.inputRoomNumber !== undefined) {
            this.inputRoomNumber = params.inputRoomNumber;
        }
        if (params.inputUserName !== undefined) {
            this.inputUserName = params.inputUserName;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__roomNumber.purgeDependencyOnElmtId(rmElmtId);
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__inputRoomNumber.purgeDependencyOnElmtId(rmElmtId);
        this.__inputUserName.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__roomNumber.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__inputRoomNumber.aboutToBeDeleted();
        this.__inputUserName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __roomNumber: ObservedPropertyAbstractPU<string>;
    get roomNumber() {
        return this.__roomNumber.get();
    }
    set roomNumber(newValue: string) {
        this.__roomNumber.set(newValue);
    }
    private __userName: ObservedPropertyAbstractPU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __inputRoomNumber: ObservedPropertySimplePU<string>;
    get inputRoomNumber() {
        return this.__inputRoomNumber.get();
    }
    set inputRoomNumber(newValue: string) {
        this.__inputRoomNumber.set(newValue);
    }
    private __inputUserName: ObservedPropertySimplePU<string>;
    get inputUserName() {
        return this.__inputUserName.get();
    }
    set inputUserName(newValue: string) {
        this.__inputUserName.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(13:5)", "@hotel/phone");
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundImage($r('app.media.bg_welcome'), ImageRepeat.NoRepeat);
            Stack.backgroundImageSize(ImageSize.Cover);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(14:7)", "@hotel/phone");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(15:9)", "@hotel/phone");
            Column.width('85%');
            Column.padding({ top: 40, bottom: 32, left: 24, right: 24 });
            Column.margin({ top: 60 });
            Column.linearGradient({
                angle: 135,
                colors: [['rgba(180, 140, 80, 0.25)', 0], ['rgba(120, 80, 40, 0.35)', 1]]
            });
            Column.border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' });
            Column.borderRadius(24);
            Column.backdropBlur(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('智慧酒店');
            Text.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(16:11)", "@hotel/phone");
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#5D4037');
            Text.margin({ top: 20, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Guangke Future Hotel');
            Text.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(22:11)", "@hotel/phone");
            Text.fontSize(14);
            Text.fontColor('#8D6E63');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入房间号', text: this.inputRoomNumber });
            TextInput.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(27:11)", "@hotel/phone");
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.placeholderColor('#BDBDBD');
            TextInput.backgroundColor('rgba(255, 255, 255, 0.6)');
            TextInput.borderRadius(12);
            TextInput.margin({ bottom: 16 });
            TextInput.onChange((value: string) => {
                this.inputRoomNumber = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入用户名', text: this.inputUserName });
            TextInput.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(39:11)", "@hotel/phone");
            TextInput.width('100%');
            TextInput.height(50);
            TextInput.fontSize(16);
            TextInput.placeholderColor('#BDBDBD');
            TextInput.backgroundColor('rgba(255, 255, 255, 0.6)');
            TextInput.borderRadius(12);
            TextInput.margin({ bottom: 24 });
            TextInput.onChange((value: string) => {
                this.inputUserName = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('登 录');
            Button.debugLine("products/phone/src/main/ets/pages/LoginPage.ets(51:11)", "@hotel/phone");
            Button.width('100%');
            Button.height(50);
            Button.fontSize(18);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#8D6E63');
            Button.borderRadius(12);
            Button.shadow({
                radius: 8,
                color: 'rgba(141, 110, 99, 0.3)',
                offsetX: 0,
                offsetY: 4
            });
            Button.onClick(() => {
                if (this.inputRoomNumber !== '' && this.inputUserName !== '') {
                    this.roomNumber = this.inputRoomNumber;
                    this.userName = this.inputUserName;
                    AppStorage.setOrCreate('isLoggedIn', true);
                    router.replaceUrl({ url: 'pages/Index' });
                }
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.guangkefuturehotel", moduleName: "phone", pagePath: "pages/LoginPage", pageFullPath: "products/phone/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
