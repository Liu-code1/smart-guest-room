import { AppStorage } from "@ohos:app.ability.AppStorage";
export class ServiceViewModel {
    private static instance: ServiceViewModel = new ServiceViewModel();
    hotel_name: string = '广科未来酒店';
    room_number: string = '1018';
    private constructor() { }
    static getInstance(): ServiceViewModel {
        return ServiceViewModel.instance;
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
    }
    toggleDoNotDisturb(): void {
        const storedVal = AppStorage.get<boolean>('doNotDisturbActive');
        const current: boolean = storedVal !== undefined ? storedVal : false;
        const newValue: boolean = !current;
        AppStorage.setOrCreate('doNotDisturbActive', newValue);
    }
    toggleCleanRoom(): void {
        const storedVal = AppStorage.get<boolean>('cleanRoomActive');
        const current: boolean = storedVal !== undefined ? storedVal : false;
        const newValue: boolean = !current;
        AppStorage.setOrCreate('cleanRoomActive', newValue);
    }
    logout(): void {
        AppStorage.setOrCreate('isLoggedIn', false);
        AppStorage.setOrCreate('roomNumber', '');
        AppStorage.setOrCreate('userName', '');
        AppStorage.setOrCreate('doNotDisturbActive', false);
        AppStorage.setOrCreate('cleanRoomActive', false);
        AppStorage.setOrCreate('sosActive', false);
    }
}
