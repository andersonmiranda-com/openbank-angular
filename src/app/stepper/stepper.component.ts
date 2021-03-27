import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input() step: number;
  steps: Array<number> = [1, 2, 3];

  constructor() {}

  ngOnInit(): void {}
}
