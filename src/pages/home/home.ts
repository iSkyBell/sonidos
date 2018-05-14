import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ANIMALES } from './../../data/data.animales';
import { Animal } from './../../interfaces/animal.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

}
