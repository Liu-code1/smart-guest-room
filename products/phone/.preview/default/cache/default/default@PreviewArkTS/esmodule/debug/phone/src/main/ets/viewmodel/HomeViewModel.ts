import { AppStorage } from "@ohos:app.ability.AppStorage";
export class HomeViewModel {
    hotel_name: string = '广科未来酒店';
    room_number: string = '1018';
    temperature: number = 26;
    acOpen: boolean = true;
    currentTemp: number = 24;
    targetTemp: number = 26;
    nightModeActive: boolean = false;
    lights: LightItem[] = [];
    curtains: CurtainItem[] = [];
    constructor() { }
    initRoomState(): void {
        const hotelNameVal = AppStorage.get<string>('hotelName');
        if (hotelNameVal !== undefined) {
            this.hotel_name = hotelNameVal;
        }
        const roomNumberVal = AppStorage.get<string>('roomNumber');
        if (roomNumberVal !== undefined) {
            this.room_number = roomNumberVal;
        }
        this.temperature = 26;
        this.lights = [
            { id: 1, name: '洗漱间', iconKey: 'light_icon_bathroom', isOn: false },
            { id: 2, name: '客厅灯', iconKey: 'light_icon_living_room', isOn: false },
            { id: 3, name: '主卧灯', iconKey: 'light_icon_bedroom', isOn: false },
            { id: 4, name: '阳台灯', iconKey: 'light_icon_balcony', isOn: false },
            { id: 5, name: '氛围灯', iconKey: 'light_icon_ambience', isOn: false },
        ];
        this.curtains = [
            { id: 1, name: '窗纱', isOpen: false },
            { id: 2, name: '布帘', isOpen: false },
        ];
    }
    toggleAirConditioner(): void {
        this.acOpen = !this.acOpen;
    }
    adjustTemp(delta: number): void {
        this.targetTemp += delta;
        if (this.targetTemp < 16)
            this.targetTemp = 16;
        if (this.targetTemp > 30)
            this.targetTemp = 30;
    }
    switchSceneMode(mode: string): void {
        const currentModeVal = AppStorage.get<string>('currentSceneMode');
        const currentMode: string = currentModeVal !== undefined ? currentModeVal : '';
        if (currentMode === mode) {
            AppStorage.setOrCreate('currentSceneMode', '');
        }
        else {
            AppStorage.setOrCreate('currentSceneMode', mode);
        }
    }
    toggleService(service: string): void {
        if (service === '请勿打扰') {
            const storedVal = AppStorage.get<boolean>('doNotDisturbActive');
            const current: boolean = storedVal !== undefined ? storedVal : false;
            const newValue: boolean = !current;
            AppStorage.setOrCreate('doNotDisturbActive', newValue);
        }
        else if (service === '清理房间') {
            const storedVal = AppStorage.get<boolean>('cleanRoomActive');
            const current: boolean = storedVal !== undefined ? storedVal : false;
            const newValue: boolean = !current;
            AppStorage.setOrCreate('cleanRoomActive', newValue);
        }
    }
    toggleNightMode(): void {
        this.nightModeActive = !this.nightModeActive;
        if (this.nightModeActive) {
            this.lights.forEach((light: LightItem) => {
                light.isOn = false;
            });
        }
    }
}
export interface LightItem {
    id: number;
    name: string;
    iconKey: string;
    isOn: boolean;
}
export interface CurtainItem {
    id: number;
    name: string;
    isOpen: boolean;
}
