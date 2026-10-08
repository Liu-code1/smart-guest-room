import { RoomStateModel } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { MockDataService } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { AppStorage } from "@ohos:app.ability.AppStorage";
export class ServiceViewModel {
    private static instance: ServiceViewModel;
    static getInstance(): ServiceViewModel {
        if (!ServiceViewModel.instance) {
            ServiceViewModel.instance = new ServiceViewModel();
        }
        return ServiceViewModel.instance;
    }
    roomState: RoomStateModel = new RoomStateModel();
    doNotDisturbActive: boolean = false;
    cleanRoomActive: boolean = false;
    sosActive: boolean = false;
    private initialized: boolean = false;
    private constructor() {
        this.initRoomState();
    }
    initRoomState(): void {
        if (this.initialized) {
            return;
        }
        this.roomState = MockDataService.getRoomStateMockData();
        this.roomState.services.forEach((service) => {
            if (service.code === 'wurao') {
                this.doNotDisturbActive = service.isActive;
            }
            else if (service.code === 'qingli') {
                this.cleanRoomActive = service.isActive;
            }
        });
        AppStorage.setOrCreate('doNotDisturbActive', this.doNotDisturbActive);
        AppStorage.setOrCreate('cleanRoomActive', this.cleanRoomActive);
        AppStorage.setOrCreate('sosActive', this.sosActive);
        this.initialized = true;
    }
    toggleDoNotDisturb(): void {
        this.doNotDisturbActive = !this.doNotDisturbActive;
        this.roomState.services.forEach((service) => {
            if (service.code === 'wurao') {
                service.isActive = this.doNotDisturbActive;
            }
        });
        AppStorage.setOrCreate('doNotDisturbActive', this.doNotDisturbActive);
    }
    toggleCleanRoom(): void {
        this.cleanRoomActive = !this.cleanRoomActive;
        this.roomState.services.forEach((service) => {
            if (service.code === 'qingli') {
                service.isActive = this.cleanRoomActive;
            }
        });
        AppStorage.setOrCreate('cleanRoomActive', this.cleanRoomActive);
    }
    triggerSOS(): void {
        this.sosActive = true;
        this.roomState.state.sos = '1';
        AppStorage.setOrCreate('sosActive', this.sosActive);
    }
    logout(): void {
        AppStorage.Delete('token');
        AppStorage.Delete('roomNo');
    }
}
