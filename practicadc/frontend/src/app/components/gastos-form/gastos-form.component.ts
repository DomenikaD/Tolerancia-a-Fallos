import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-gastos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gastos-form.component.html',
  styleUrls: ['./gastos-form.component.scss']
})
export class GastosFormComponent {
  @Output() gastoAgregado = new EventEmitter<Gasto>();
  gastoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.gastoForm = this.fb.group({
      item: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      expense_date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.gastoForm.valid) {
      const nuevoGasto: Gasto = this.gastoForm.value;
      this.gastoAgregado.emit(nuevoGasto);
      this.gastoForm.reset(); // sin reload
    }
  }
}
