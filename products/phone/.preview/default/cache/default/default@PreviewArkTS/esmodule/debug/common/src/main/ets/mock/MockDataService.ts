export class MockDataService {
    static getLoginMockData(): LoginResponse {
        return {
            code: 0,
            msg: '登录成功',
            data: 'mock_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        };
    }
    static getRoomStateMockData(): RoomStateModel {
        const roomState = new RoomStateModel();
        roomState.room_number = '2002';
        roomState.hotel_name = '';
        roomState.hasBidaMachine = false;
        roomState.hasCurtain = true;
        roomState.lights = [
            new LightModel(103125, '洗漱间', 'light_icon_bathroom'),
            new LightModel(103128, '衣柜灯', 'light_icon_wardrobe'),
            new LightModel(103129, '落地灯', 'light_icon_floor_lamp'),
            new LightModel(103130, '吧灯', 'light_icon_bar_light'),
            new LightModel(103131, '书桌灯', 'light_icon_desk_light'),
            new LightModel(103132, '右阅读灯', 'light_icon_read_right'),
            new LightModel(103133, '左阅读灯', 'light_icon_read_left'),
            new LightModel(103134, '排风扇', 'light_icon_fan'),
            new LightModel(103135, '廊灯', 'light_icon_corridor')
        ];
        const ac1 = new AirConditionerModel('kt1', '1', '空调1', '房间', 103136);
        ac1.mode = 1;
        ac1.settingTemp = 22;
        ac1.currentTemp = 19;
        ac1.open = 1;
        ac1.speed = 1;
        roomState.airConditioners.push(ac1);
        const ac2 = new AirConditionerModel('kt2', '1', '空调2', '房间', 103140);
        ac2.mode = 0;
        ac2.settingTemp = 16;
        ac2.currentTemp = 16;
        ac2.open = 0;
        ac2.speed = 0;
        roomState.airConditioners.push(ac2);
        roomState.curtains = [
            new CurtainModel(0, '窗纱', false),
            new CurtainModel(0, '窗帘1', false)
        ];
        roomState.services = [
            new ServiceModel('wurao', '请勿打扰', 103138, false),
            new ServiceModel('qingli', '清理房间', 103139, false)
        ];
        roomState.lightModes = [
            new LightModeModel('1', '明亮模式', 'light_icon_bright_mode'),
            new LightModeModel('2', '柔和模式', 'light_icon_soft'),
            new LightModeModel('3', '阅读模式', 'light_icon_read_mode'),
            new LightModeModel('4', '温馨模式', 'light_icon_warm_mode'),
            new LightModeModel('C', '睡眠模式', 'light_icon_sleep_mode')
        ];
        return roomState;
    }
}
export class LoginResponse {
    code: number = 0;
    msg: string = '';
    data: string = '';
}
export class RoomStateModel {
    room_number: string = '';
    hotel_name: string = '';
    hasBidaMachine: boolean = false;
    hasCurtain: boolean = false;
    lights: LightModel[] = [];
    airConditioners: AirConditionerModel[] = [];
    curtains: CurtainModel[] = [];
    services: ServiceModel[] = [];
    lightModes: LightModeModel[] = [];
}
export class LightModel {
    id: number;
    name: string;
    iconKey: string;
    constructor(id: number, name: string, iconKey: string) {
        this.id = id;
        this.name = name;
        this.iconKey = iconKey;
    }
}
export class AirConditionerModel {
    code: string;
    cpadd: string;
    name: string;
    location: string;
    id: number;
    mode: number = 0;
    settingTemp: number = 22;
    currentTemp: number = 22;
    open: number = 0;
    speed: number = 0;
    constructor(code: string, cpadd: string, name: string, location: string, id: number) {
        this.code = code;
        this.cpadd = cpadd;
        this.name = name;
        this.location = location;
        this.id = id;
    }
}
export class CurtainModel {
    sequence: number;
    name: string;
    isOpen: boolean;
    constructor(sequence: number, name: string, isOpen: boolean) {
        this.sequence = sequence;
        this.name = name;
        this.isOpen = isOpen;
    }
}
export class ServiceModel {
    code: string;
    name: string;
    id: number;
    isActive: boolean = false;
    constructor(code: string, name: string, id: number, isActive: boolean = false) {
        this.code = code;
        this.name = name;
        this.id = id;
        this.isActive = isActive;
    }
}
export class LightModeModel {
    cpadd: string;
    name: string;
    iconKey: string;
    constructor(cpadd: string, name: string, iconKey: string) {
        this.cpadd = cpadd;
        this.name = name;
        this.iconKey = iconKey;
    }
}
