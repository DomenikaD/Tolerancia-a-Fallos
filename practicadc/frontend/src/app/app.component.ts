import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosFormComponent } from './components/gastos-form/gastos-form.component';
import { GastosListComponent } from './components/gastos-list/gastos-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GastosApiService } from './services/api.service';
import { Gasto } from './models/gasto.model';  // interfaace

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, GastosFormComponent, GastosListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  gastos: Gasto[] = [];
  respaldo: Gasto[] = [];

  constructor(private gastosApi: GastosApiService) {} //GastosApiService

  ngOnInit(): void {
    this.cargarGastos();
  }

  cargarGastos(): void {
    this.gastosApi.getGastos().subscribe({
      next: (data: Gasto[]) => this.gastos = data,
      error: (err) => console.error('Error cargando gastos', err)
    });
  }

  agregarGasto(gasto: Gasto): void {
    this.gastosApi.agregarGasto(gasto).subscribe({
      next: (nuevoGasto: Gasto) => this.gastos.push(nuevoGasto),
      error: (err) => console.error('Error agregando gasto', err)
    });
  }

  eliminarGasto(id: number): void {
  this.gastosApi.deleteGasto(id).subscribe({
    next: () => {
      this.gastos = this.gastos.filter(g => g.id !== id);
    },
    error: (err) => console.error('Error eliminando gasto', err)
  });
}

  /*guardarRespaldo() {
    this.gastosApi.guardarRespaldo().subscribe({
      next: (resp) => alert('Respaldo guardado correctamente.'),
      error: (err) => alert('Error al guardar respaldo.'),
    });
  }

  verRespaldo() {
    this.gastosApi.verRespaldo().subscribe({
      next: (data) => (this.respaldo = data),
      error: (err) => alert('No se pudo cargar el respaldo.'),
    });
  }
    */
}
