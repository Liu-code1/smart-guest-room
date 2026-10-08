export class CommonConstants {
    static readonly BASE_URL: string = 'https://ohosiot.admitpro.cn';
    static readonly LOGIN_URL: string = '/api/sso/login';
    static readonly ROOM_STATE_URL: string = '/api/rcu/room/getState';
    static readonly LIGHT_CONTROL_URL: string = '/api/rcu/room/setLightMode';
    static readonly AIR_CONTROL_URL: string = '/api/rcu/room/clickAirBtn';
    static readonly SERVICE_CONTROL_URL: string = '/api/rcu/room/setService';
    static readonly DEFAULT_ROOM_NO: string = '';
    static readonly DEFAULT_USERNAME: string = '';
}
