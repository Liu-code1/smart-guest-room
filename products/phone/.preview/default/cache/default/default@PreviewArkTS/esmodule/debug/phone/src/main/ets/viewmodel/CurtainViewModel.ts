import { AppStorage } from "@ohos:app.ability.AppStorage";
export class CurtainViewModel {
    hotel_name: string = '广科未来酒店';
    room_number: string = '1018';
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
        this.curtains = [
            { id: 1, name: '窗纱', isOpen: false },
            { id: 2, name: '布帘', isOpen: false },
        ];
    }
    openAll(): void {
        this.curtains.forEach((curtain: CurtainItem) => {
            curtain.isOpen = true;
        });
    }
    closeAll(): void {
        this.curtains.forEach((curtain: CurtainItem) => {
            curtain.isOpen = false;
        });
    }
    openCurtain(): void {
        if (this.curtains.length > 1) {
            this.curtains[1].isOpen = true;
        }
    }
    closeCurtain(): void {
        if (this.curtains.length > 1) {
            this.curtains[1].isOpen = false;
        }
    }
    openScreening(): void {
        if (this.curtains.length > 0) {
            this.curtains[0].isOpen = true;
        }
    }
    closeScreening(): void {
        if (this.curtains.length > 0) {
            this.curtains[0].isOpen = false;
        }
    }
}
export interface CurtainItem {
    id: number;
    name: string;
    isOpen: boolean;
}
