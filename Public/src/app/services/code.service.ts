import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodeService {
  private code: string = '';
  private email: string = '';

  setCode(code: string, email: string) {
    this.code = code;
    this.email = email
  }

  getCode(): string {
    return this.code;
  }

  getEmail(): string {
    return this.email;
  }
}
