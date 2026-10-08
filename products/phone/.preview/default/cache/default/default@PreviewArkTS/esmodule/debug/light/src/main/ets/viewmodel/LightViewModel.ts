import { RoomStateModel } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import type { LightModel } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { MockDataService } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { AppStorage } from "@ohos:app.ability.AppStorage";
export class LightViewModel {
    private static instance: LightViewModel;
    static getInstance(): LightViewModel {
        if (!LightViewModel.instance) {
            LightViewModel.instance = new LightViewModel();
        }
        return LightViewModel.instance;
    }
    roomState: RoomStateModel = new RoomStateModel();
    selectedModeIndex: number = -1;
    mainSwitchOn: boolean = false;
    private initialized: boolean = false;
    private constructor() {
        this.initRoomState();
    }
    private indexToModeName: string[] = ['明亮模式', '柔和模式', '阅读模式', '温馨模式', '睡眠模式'];
    // Light order: 洗漱间, 衣柜灯, 落地灯, 吧灯, 书桌灯, 右阅读灯, 左阅读灯, 排风扇, 廊灯
    private modeLightStates: boolean[][] = [
        [true, true, true, true, true, false, false, false, true],
        [true, true, true, false, false, false, false, false, true],
        [false, false, false, false, true, true, true, false, true],
        [true, true, true, true, false, false, false, false, false],
        [false, false, false, false, false, false, false, true, false], // 睡眠模式
    ];
    initRoomState(): void {
        if (this.initialized) {
            return;
        }
        this.roomState = MockDataService.getRoomStateMockData();
        this.initialized = true;
    }
    toggleLight(light: LightModel): void {
        light.isOn = !light.isOn;
    }
    toggleLightByIndex(index: number): void {
        if (index >= 0 && index < this.roomState.lights.length) {
            this.roomState.lights[index].isOn = !this.roomState.lights[index].isOn;
        }
    }
    setLightMode(modeIndex: number): void {
        if (modeIndex < 0 || modeIndex >= this.modeLightStates.length) {
            return;
        }
        this.selectedModeIndex = modeIndex;
        if (!this.mainSwitchOn) {
            this.mainSwitchOn = true;
        }
        const states = this.modeLightStates[modeIndex];
        for (let i = 0; i < this.roomState.lights.length && i < states.length; i++) {
            this.roomState.lights[i].isOn = states[i];
        }
        AppStorage.setOrCreate('currentSceneMode', this.indexToModeName[modeIndex]);
    }
    setNightMode(acOpen: boolean): void {
        this.selectedModeIndex = 4;
        this.mainSwitchOn = false;
        AppStorage.setOrCreate('currentSceneMode', '');
        const states = this.modeLightStates[4];
        for (let i = 0; i < this.roomState.lights.length && i < states.length; i++) {
            this.roomState.lights[i].isOn = states[i];
        }
        if (acOpen && this.roomState.lights.length > 7) {
            this.roomState.lights[7].isOn = false;
        }
    }
    deactivateMode(): void {
        this.selectedModeIndex = -1;
        this.mainSwitchOn = false;
        this.roomState.lights.forEach((light) => {
            light.isOn = false;
        });
        AppStorage.setOrCreate('currentSceneMode', '');
    }
    toggleMainSwitch(): void {
        this.mainSwitchOn = !this.mainSwitchOn;
        if (this.mainSwitchOn) {
            const modeToApply = this.selectedModeIndex >= 0 ? this.selectedModeIndex : 0;
            this.applyModeLightStates(modeToApply);
        }
        else {
            this.roomState.lights.forEach((light) => {
                light.isOn = false;
            });
        }
    }
    private applyModeLightStates(modeIndex: number): void {
        if (modeIndex < 0 || modeIndex >= this.modeLightStates.length) {
            return;
        }
        const states = this.modeLightStates[modeIndex];
        for (let i = 0; i < this.roomState.lights.length && i < states.length; i++) {
            this.roomState.lights[i].isOn = states[i];
        }
    }
    getLightIcon(light: LightModel): Resource {
        const name = light.name;
        if (name.includes('洗漱间') || name.includes('卫生间')) {
            return { "id": 100663361, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('衣柜')) {
            return { "id": 100663321, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('落地')) {
            return { "id": 100663305, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('吧')) {
            return { "id": 100663305, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('书桌')) {
            return { "id": 100663338, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('阅读')) {
            return { "id": 100663338, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('排风扇')) {
            return { "id": 100663303, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        else if (name.includes('廊')) {
            return { "id": 100663373, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
        }
        return { "id": 100663305, "type": 20000, params: [], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
    }
}
