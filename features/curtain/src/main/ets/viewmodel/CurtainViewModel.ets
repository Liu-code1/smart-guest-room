import type { RoomState } from '../model/CurtainModel';

/**
 * 窗帘页面视图模型（V2响应式版本）
 *
 * 负责管理窗帘页面的业务逻辑和状态，包括：
 * - 布帘状态管理
 * - 窗纱状态管理
 * - 全部打开/关闭控制
 */
@ObservedV2
export class CurtainViewModel {
  @Trace roomState: RoomState = {
    curtains: [
      { name: '窗纱', isOpen: false },
      { name: '布帘', isOpen: false }
    ]
  };

  /**
   * 初始化房间状态
   */
  initRoomState(): void {
    // Mock数据
    this.roomState = {
      curtains: [
        { name: '窗纱', isOpen: false },
        { name: '布帘', isOpen: false }
      ]
    };
  }

  /**
   * 打开布帘
   */
  openCurtain(): void {
    console.log('布帘已打开');
    if (this.roomState.curtains.length > 1) {
      this.roomState.curtains[1].isOpen = true;
    }
  }

  /**
   * 关闭布帘
   */
  closeCurtain(): void {
    console.log('布帘已关闭');
    if (this.roomState.curtains.length > 1) {
      this.roomState.curtains[1].isOpen = false;
    }
  }

  /**
   * 打开窗纱
   */
  openScreening(): void {
    console.log('窗纱已打开');
    if (this.roomState.curtains.length > 0) {
      this.roomState.curtains[0].isOpen = true;
    }
  }

  /**
   * 关闭窗纱
   */
  closeScreening(): void {
    console.log('窗纱已关闭');
    if (this.roomState.curtains.length > 0) {
      this.roomState.curtains[0].isOpen = false;
    }
  }

  /**
   * 全部打开
   */
  openAll(): void {
    console.log('全部窗帘已打开');
    this.roomState.curtains.forEach(curtain => {
      curtain.isOpen = true;
    });
    // 同步到 AppStorage
    AppStorage.setOrCreate('curtainLeftState', 'open');
    AppStorage.setOrCreate('curtainRightState', 'open');
    AppStorage.setOrCreate('windowScreeningLeftState', 'open');
    AppStorage.setOrCreate('windowScreeningRightState', 'open');
  }

  /**
   * 全部关闭
   */
  closeAll(): void {
    console.log('全部窗帘已关闭');
    this.roomState.curtains.forEach(curtain => {
      curtain.isOpen = false;
    });
    // 同步到 AppStorage
    AppStorage.setOrCreate('curtainLeftState', 'closed');
    AppStorage.setOrCreate('curtainRightState', 'closed');
    AppStorage.setOrCreate('windowScreeningLeftState', 'closed');
    AppStorage.setOrCreate('windowScreeningRightState', 'closed');
  }

  /**
   * 重新加载所有状态（退出登录后重新登录时调用）
   */
  reloadState(): void {
    this.roomState.curtains.forEach(curtain => {
      curtain.isOpen = false;
    });
  }
}
