import { ArticlesDetailsPage } from './../articles-details/articles-details';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html'
})
export class ArticlesPage {

  public articles: any;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public data: DataProvider) {
  }

  ionViewDidLoad(){
    this.getArticles();
    setInterval(() => {
    this.getArticles();
    }, 5000);
  }

  getArticles() {
    this.loading = true;
    this.data.getArticles().subscribe(
      (res: any) => {
        this.loading = false;
        this.articles = res.data
      }, (error) => {
        this.loading = false;
      }
    )
  }

  openArticle(article: any) {
    this.navCtrl.push(ArticlesDetailsPage, { "data": article },
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }


}
