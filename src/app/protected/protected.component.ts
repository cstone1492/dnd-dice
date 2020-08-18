import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure',
  template: `{{message}}`
})
export class ProtectedComponent {
  message;

  constructor() {
    this.message = 'Protected endpoint!';
  }
}
