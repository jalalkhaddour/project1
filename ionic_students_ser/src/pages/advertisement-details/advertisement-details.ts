import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-advertisement-details',
  templateUrl: 'advertisement-details.html',
})
export class AdvertisementDetailsPage {

  ad_data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ad_data = navParams.get("data");
  }
}
