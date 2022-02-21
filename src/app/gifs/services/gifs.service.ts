import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'datlNfusuxDtgUj4rDX4dTkSrLdR45Od';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    const historialLocalStore = localStorage.getItem('historial');
    const resultsLocalStore = localStorage.getItem('resultados');

    if (historialLocalStore && historialLocalStore.length > 0) {
      this._historial = JSON.parse(historialLocalStore!);
    }
    
    if (resultsLocalStore && resultsLocalStore.length > 0) {
      this.resultados = JSON.parse(resultsLocalStore);
    }

  }

  buscarGif(query: string) {
    query = query.toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      // Guardar el historila
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params:HttpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // Nota: en EC6, si un objeto tiene nombre y valor igual, se puede omitir nombre {params: params} es igual a {params}
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (resp) => {
        this.resultados = resp.data;
        // Guardar resultados de ultima busqueda
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
    console.log(this._historial);
  }
}
