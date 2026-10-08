/**
 * 空调信息接口
 */
export interface AirConditionerInfo {
  currentTemp: number;
  settingTemp: number;
  open: number;
  mode: number;
  speed: number;
}

/**
 * 房间状态信息接口
 */
export interface RoomStateInfo {
  room_number: string;
  hotel_name: string;
  airConditioners: AirConditionerInfo[];
}