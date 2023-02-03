import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';


@Component({
  selector: 'page-registration-status',
  templateUrl: 'registration-status.html',
})
export class RegistrationStatusPage {

  registar_status: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    this.registar_status = navParams.get('status').status;
  }

  ionViewDidLoad() {
  }

  register() {
    this.navCtrl.pop();
    this.navCtrl.push(RegistrationPage, { "status": this.registar_status },
    {
      animate: true,
      animation: 'ios-transition',
      easing: "out",
      duration: 350
    });
  }

}
