import { NewObjectionPage } from './../new-objection/new-objection';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public objections: any;
  loading: boolean = false;

  constructor(public navCtrl: NavController,
    public data: DataProvider, ) {

  }

  ionViewDidLoad() {
    this.getObjections();
    setInterval(() => {
      this.getObjections();
    }, 5000);
  }

  getObjections() {
    this.loading = true;
    this.data.getObjections().subscribe(
      (res: any) => {
        this.loading = false;
        this.objections = res.data.reverse()
      }, (error) => {
        this.loading = false;
      }
    )
  }

  newObjection() {
    this.navCtrl.push(NewObjectionPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

}
