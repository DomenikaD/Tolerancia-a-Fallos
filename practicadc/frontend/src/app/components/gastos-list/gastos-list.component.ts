import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos-list.component.html',
  styleUrls: ['./gastos-list.component.scss']
})
export class GastosListComponent {
  @Input() gastos: Gasto[] = [];
  @Output() eliminar = new EventEmitter<number>();

  eliminarGasto(id: number) {
    this.eliminar.emit(id);
  }
}



