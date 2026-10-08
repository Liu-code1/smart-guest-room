export interface MockRoomState {
  roomNo: string;
  temperature: number;
  humidity: number;
  light: boolean;
  doNotDisturb: boolean;
  cleanRoom: boolean;
}

export interface MockAirConditioner {
  temperature: number;
  mode: 'cool' | 'heat' | 'auto' | 'fan';
  speed: 'low' | 'medium' | 'high';
  power: boolean;
}

export interface MockLightInfo {
  id: string;
  name: string;
  brightness: number;
  color: string;
  power: boolean;
  mode: string;
}

export interface MockCurtainInfo {
  id: string;
  name: string;
  position: number;
  status: 'open' | 'closed' | 'partially_open' | 'paused';
}

export class MockDataService {
  private static instance: MockDataService;

  private constructor() {}

  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  getRoomState(roomNo: string): MockRoomState {
    return {
      roomNo: roomNo,
      temperature: 24,
      humidity: 55,
      light: true,
      doNotDisturb: false,
      cleanRoom: false
    };
  }

  getAirConditioner(): MockAirConditioner {
    return {
      temperature: 24,
      mode: 'auto',
      speed: 'medium',
      power: true
    };
  }

  getLightList(): MockLightInfo[] {
    return [
      { id: '1', name: '主灯', brightness: 80, color: '#FFFFFF', power: true, mode: 'normal' },
      { id: '2', name: '床头灯', brightness: 50, color: '#FFE4B5', power: false, mode: 'warm' },
      { id: '3', name: '阅读灯', brightness: 100, color: '#FFFFFF', power: true, mode: 'reading' },
      { id: '4', name: '氛围灯', brightness: 30, color: '#8A2BE2', power: false, mode: 'ambient' }
    ];
  }

  getCurtainList(): MockCurtainInfo[] {
    return [
      { id: '1', name: '窗帘', position: 50, status: 'partially_open' },
      { id: '2', name: '纱帘', position: 100, status: 'open' }
    ];
  }

  login(roomNo: string, userName: string): boolean {
    return roomNo.length === 4 && userName.length >= 2;
  }

  logout(): void {
    AppStorage.clear();
  }
}