import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-articles-details',
  templateUrl: 'articles-details.html',
})
export class ArticlesDetailsPage {

  public article: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.article = navParams.get("data");
  }

  ionViewDidLoad() {

  }

}
