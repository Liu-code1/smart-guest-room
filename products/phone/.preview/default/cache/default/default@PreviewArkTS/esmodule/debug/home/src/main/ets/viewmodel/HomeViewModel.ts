import { RoomStateModel } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { MockDataService } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { AppStorage } from "@ohos:app.ability.AppStorage";
export class HomeViewModel {
    roomState: RoomStateModel = new RoomStateModel();
    isLoading: boolean = false;
    currentTemp: number = 22;
    targetTemp: number = 22;
    acOpen: boolean = false;
    acMode: number = 1;
    acSpeed: number = 1;
    initRoomState(): void {
        this.roomState = MockDataService.getRoomStateMockData();
        const loginRoomNoVal = AppStorage.get<string>('roomNo');
        if (loginRoomNoVal !== undefined && loginRoomNoVal !== '') {
            this.roomState.room_number = loginRoomNoVal;
        }
        if (this.roomState.airConditioners.length > 0) {
            const ac = this.roomState.airConditioners[0];
            this.currentTemp = ac.currentTemp;
            this.targetTemp = ac.settingTemp;
            this.acOpen = ac.open === 1;
            this.acMode = ac.mode;
            this.acSpeed = ac.speed;
        }
    }
    setAirConditionerTemp(temp: number): void {
        this.targetTemp = temp;
        if (this.roomState.airConditioners.length > 0) {
            this.roomState.airConditioners[0].settingTemp = temp;
        }
    }
    toggleAirConditioner(): void {
        this.acOpen = !this.acOpen;
        if (this.roomState.airConditioners.length > 0) {
            this.roomState.airConditioners[0].open = this.acOpen ? 1 : 0;
        }
    }
    setAirConditionerMode(mode: number): void {
        this.acMode = mode;
        if (this.roomState.airConditioners.length > 0) {
            this.roomState.airConditioners[0].mode = mode;
        }
    }
    setAirConditionerSpeed(speed: number): void {
        this.acSpeed = speed;
        if (this.roomState.airConditioners.length > 0) {
            this.roomState.airConditioners[0].speed = speed;
        }
    }
    adjustTemp(delta: number): void {
        const newTemp = this.targetTemp + delta;
        if (newTemp >= 16 && newTemp <= 30) {
            this.setAirConditionerTemp(newTemp);
        }
    }
    @Trace
    currentSceneMode: string = '';
    private modeNameToIndexMap: Record<string, number> = {
        '明亮模式': 0,
        '柔和模式': 1,
        '阅读模式': 2,
        '温馨模式': 3,
        '睡眠模式': 4,
    };
    switchSceneMode(mode: string): void {
        const syncedMode: string | undefined = AppStorage.Get<string>('currentSceneMode');
        if (syncedMode !== undefined) {
            this.currentSceneMode = syncedMode;
        }
        if (this.currentSceneMode === mode) {
            this.currentSceneMode = '';
            AppStorage.setOrCreate('currentSceneMode', '');
            LightViewModel.getInstance().deactivateMode();
        }
        else {
            this.currentSceneMode = mode;
            AppStorage.setOrCreate('currentSceneMode', mode);
            const modeIndex = this.modeNameToIndexMap[mode];
            if (modeIndex !== undefined) {
                LightViewModel.getInstance().setLightMode(modeIndex);
            }
        }
    }
    toggleService(serviceName: string): void {
        const svm: ServiceViewModel = ServiceViewModel.getInstance();
        if (serviceName === '请勿打扰') {
            svm.toggleDoNotDisturb();
        }
        else if (serviceName === '清理房间') {
            svm.toggleCleanRoom();
        }
    }
    @Trace
    nightModeActive: boolean = false;
    toggleNightMode(): void {
        this.nightModeActive = !this.nightModeActive;
        if (this.nightModeActive) {
            this.currentSceneMode = '';
            LightViewModel.getInstance().setNightMode(this.acOpen);
        }
    }
}
