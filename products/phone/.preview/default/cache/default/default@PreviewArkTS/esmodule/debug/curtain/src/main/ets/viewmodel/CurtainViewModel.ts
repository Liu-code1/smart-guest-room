import { RoomStateModel } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import type { CurtainModel } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
import { MockDataService } from "@normalized:N&&&@hotel/common/src/main/ets/index&1.0.0";
export class CurtainViewModel {
    roomState: RoomStateModel = new RoomStateModel();
    selectedCurtainIndex: number = 1;
    initRoomState(): void {
        this.roomState = MockDataService.getRoomStateMockData();
    }
    selectCurtain(index: number): void {
        this.selectedCurtainIndex = index;
    }
    openCurtain(): void {
        if (this.roomState.curtains.length > this.selectedCurtainIndex) {
            this.roomState.curtains[this.selectedCurtainIndex].isOpen = true;
        }
    }
    closeCurtain(): void {
        if (this.roomState.curtains.length > this.selectedCurtainIndex) {
            this.roomState.curtains[this.selectedCurtainIndex].isOpen = false;
        }
    }
    pauseCurtain(): void {
    }
    openScreening(): void {
        if (this.roomState.curtains.length > 0) {
            this.roomState.curtains[0].isOpen = true;
        }
    }
    pauseScreening(): void {
    }
    closeScreening(): void {
        if (this.roomState.curtains.length > 0) {
            this.roomState.curtains[0].isOpen = false;
        }
    }
    openAll(): void {
        this.roomState.curtains.forEach((curtain) => {
            curtain.isOpen = true;
        });
    }
    closeAll(): void {
        this.roomState.curtains.forEach((curtain) => {
            curtain.isOpen = false;
        });
    }
    getCurrentCurtain(): CurtainModel | null {
        if (this.roomState.curtains.length > this.selectedCurtainIndex) {
            return this.roomState.curtains[this.selectedCurtainIndex];
        }
        return null;
    }
}
