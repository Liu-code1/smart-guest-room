/**
 * 窗帘信息接口
 */
export interface CurtainInfo {
  name: string;
  isOpen: boolean;
}

/**
 * 房间状态接口
 */
export interface RoomState {
  curtains: CurtainInfo[];
}