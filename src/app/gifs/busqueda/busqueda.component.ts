import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor(private gifsService:GifsService) {}

  // Hay que identificar el tipo de elemento html porque ElementRef admite <any>
  @ViewChild('txtBusqueda') textoBusqueda!:ElementRef<HTMLInputElement>; 
  buscar() {
    const valor = this.textoBusqueda.nativeElement.value;
    if (valor.trim().length == 0) {
      return;
    }
    this.gifsService.buscarGif(valor);
    this.textoBusqueda.nativeElement.value = '';
  }

    

  // PRUEBAS JAVI
  @ViewChild('checkJavi') checkJavi!: ElementRef<HTMLInputElement>;
  changeCheck() {
    console.log(this.checkJavi.nativeElement.checked);
  }

  @ViewChild('spanJavi') spanJavi!: ElementRef<HTMLElement>;
  dameValorSpan() {
    console.log(this.spanJavi.nativeElement.innerHTML);
  }
}
