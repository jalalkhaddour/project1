import { AdvertisementDetailsPage } from './../advertisement-details/advertisement-details';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-advertisements',
  templateUrl: 'advertisements.html',
})
export class AdvertisementsPage {

  public ads: any;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public data: DataProvider) {

  }

  ionViewDidLoad(){
    this.getAds();
    setInterval(() => {
    this.getAds();
    }, 5000);
  }

  getAds() {
    this.loading = true;
    this.data.getAds().subscribe(
      (res: any) => {
        this.loading = false;
        this.ads = res.data
      }, (error) => {
        this.loading = false;
      }
    )
  }

  openArticle(ad: any) {
    this.navCtrl.push(AdvertisementDetailsPage, { "data": ad },
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

}
