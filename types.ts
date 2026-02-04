
export enum AppState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  COUNTDOWN = 'COUNTDOWN',
  PRANK = 'PRANK'
}

export interface SecurityLog {
  id: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
  timestamp: string;
}
