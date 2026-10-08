export class FormatUtil {
  static formatRoomNo(roomNo: string): string {
    return roomNo.padStart(4, '0');
  }

  static formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static formatPrice(price: number): string {
    return `¥${price.toFixed(2)}`;
  }
}