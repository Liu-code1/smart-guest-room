@ObservedV2
export class LightModel {
    @Trace
    id: number;
    @Trace
    cpadd: string;
    @Trace
    name: string;
    @Trace
    location: string;
    @Trace
    isOn: boolean = false;
    constructor(id: number, cpadd: string, name: string, location: string, isOn: boolean = false) {
        this.id = id;
        this.cpadd = cpadd;
        this.name = name;
        this.location = location;
        this.isOn = isOn;
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
@ObservedV2
export class CurtainModel {
    @Trace
    sequence: number;
    @Trace
    cpadd: string;
    @Trace
    name: string;
    @Trace
    location: string;
    @Trace
    id: number;
    @Trace
    position: number = 0;
    @Trace
    isOpen: boolean = false;
    constructor(sequence: number, cpadd: string, name: string, location: string, id: number) {
        this.sequence = sequence;
        this.cpadd = cpadd;
        this.name = name;
        this.location = location;
        this.id = id;
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
    extra_name: string | null;
    location: string;
    id: number;
    constructor(cpadd: string, name: string, extra_name: string | null, location: string, id: number) {
        this.cpadd = cpadd;
        this.name = name;
        this.extra_name = extra_name;
        this.location = location;
        this.id = id;
    }
}
@ObservedV2
export class RoomStateModel {
    @Trace
    room_number: string = '';
    @Trace
    hotel_name: string = '';
    @Trace
    hasBidaMachine: boolean = false;
    @Trace
    hasCurtain: boolean = false;
    @Trace
    lights: LightModel[] = [];
    @Trace
    airConditioners: AirConditionerModel[] = [];
    @Trace
    curtains: CurtainModel[] = [];
    @Trace
    services: ServiceModel[] = [];
    @Trace
    lightModes: LightModeModel[] = [];
    @Trace
    state: RoomState = new RoomState();
}
export class RoomState {
    qingli: string = '0';
    wurao: string = '0';
    light_mode_1: string = '0';
    light_mode_2: string = '0';
    shaohou: string = '0';
    prefix: string = 'AD';
    infrared_trigger_state: string = '0';
    tui: string = '0';
    inspect_finish_flag: string = '0';
    menci: string = '0';
    sos: string = '0';
    ruzhu: string = '0';
    service_flag: string = '0';
    light_mode_flag: string = '0';
    mcu_type: string = '0';
    power: string = '0000000';
    fuwu: string = '0';
    ver: string = '99';
    other_flag: string = '0';
    yukai: string = '0';
    air_flag: string = '0';
    electricity_flag: string = '0';
    humidity_value: string = '000';
    door_flag: string = '0';
    card: string = '0';
    brightnessState: string = '';
    singleBrightnessState: string = '';
}
export class LoginResponse {
    code: number = 0;
    msg: string = '';
    data: string = '';
}
