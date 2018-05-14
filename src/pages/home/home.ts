import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';

import { ANIMALES } from './../../data/data.animales';
import { Animal } from './../../interfaces/animal.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];

  audio = new Audio();
  audioTiempo:any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  // Produce un efecto de clic
  reproducir(animal:Animal) {

    // Validamos si estamos reproduciendo en estos momentos un audio
    this.pausarAudio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }// fin if

    this.audio.src = animal.audio;// Le pasamos el audio del animal que dio clic
    this.audio.load();
    this.audio.play();

    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000 );
    animal.reproduciendo = true;
  }// fin reproducir

  // Pausamos el audio
  private pausarAudio(animalSel: Animal) {
    
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    // Pausamos todos los sonidos de los animales excepto el que presionamos actualmente
    for (let animal of this.animales) {
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }// fin if
    }// fin for
  }// fin funcion pausarAudio

  // Borramos de la lista con la posicion enviada desde la vista el animal.
  borrarAnimal(position: number) {
    this.animales.splice(position, 1);
  }// fin borrarAnimal

  // Al bajar la lista esta se recarga la lista.
  recargarLista(refresher: Refresher) {
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }// fin funcion recargarLista

  // Reordenar las posiciones de la lista
  reOrdenarAnimales(indice:any) {
    this.animales = reorderArray(this.animales,indice);
  }// fin reOrdenarAnimales

}
