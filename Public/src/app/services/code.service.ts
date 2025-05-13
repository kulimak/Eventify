import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodeService {
  private code: string = '';

  setCode(code: string) {
    this.code = code;
  }

  getCode(): string {
    return this.code;
  }
}
