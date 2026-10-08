import { AppStorage } from "@ohos:app.ability.AppStorage";
export class LightViewModel {
    private static instance: LightViewModel = new LightViewModel();
    hotel_name: string = '广科未来酒店';
    room_number: string = '1018';
    mainSwitchOn: boolean = false;
    selectedModeIndex: number = -1;
    selectedModeName: string = '';
    lights: LightItem[] = [];
    private constructor() { }
    static getInstance(): LightViewModel {
        return LightViewModel.instance;
    }
    initRoomState(): void {
        const hotelNameVal = AppStorage.get<string>('hotelName');
        if (hotelNameVal !== undefined) {
            this.hotel_name = hotelNameVal;
        }
        const roomNumberVal = AppStorage.get<string>('roomNumber');
        if (roomNumberVal !== undefined) {
            this.room_number = roomNumberVal;
        }
        this.lights = [
            { id: 1, name: '洗漱间', iconKey: 'light_icon_bathroom', isOn: false },
            { id: 2, name: '客厅灯', iconKey: 'light_icon_living_room', isOn: false },
            { id: 3, name: '主卧灯', iconKey: 'light_icon_bedroom', isOn: false },
            { id: 4, name: '阳台灯', iconKey: 'light_icon_balcony', isOn: false },
            { id: 5, name: '氛围灯', iconKey: 'light_icon_ambience', isOn: false },
        ];
    }
    toggleMainSwitch(): void {
        this.mainSwitchOn = !this.mainSwitchOn;
        this.lights.forEach((light: LightItem) => {
            light.isOn = this.mainSwitchOn;
        });
    }
    setLightMode(index: number): void {
        if (this.selectedModeIndex === index) {
            this.selectedModeIndex = -1;
            this.selectedModeName = '';
            AppStorage.setOrCreate('currentLightMode', '');
        }
        else {
            this.selectedModeIndex = index;
            const modes: string[] = ['明亮模式', '柔和模式', '阅读模式', '温馨模式', '睡眠模式'];
            this.selectedModeName = modes[index];
            AppStorage.setOrCreate('currentLightMode', this.selectedModeName);
        }
    }
    getLightIcon(light: LightItem): Resource {
        return { "id": -1, "type": -1, params: ['app.media.' + light.iconKey], "bundleName": "com.example.guangkefuturehotel", "moduleName": "phone" };
    }
}
export interface LightItem {
    id: number;
    name: string;
    iconKey: string;
    isOn: boolean;
}
