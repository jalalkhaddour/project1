import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-student-years-info',
  templateUrl: 'student-years-info.html',
})
export class StudentYearsInfoPage {

  constructor(public navCtrl: NavController,
    public data: DataProvider,
    public navParams: NavParams) {
  }

  years_data: any;

  ionViewDidEnter() {
    this.data.getStudentYearsInfo().subscribe(
      (res: any) => {
        this.years_data = res.data;
      }, (error) => { }
    );
  }

}
