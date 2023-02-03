import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {

   serverURL: string = "http://127.0.0.1:8000/api/";
  // serverURL: string = "http://192.168.43.247:8000/api/";

  public token: string;

  public httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
    })
  };

  constructor(public http: HttpClient) {
  }

  // تسجيل حساب و انشاء حساب
  login(email: string, password: string) {

    return this.http.post(
      this.serverURL + "login",
      {
        'email': email,
        'password': password
      },
      this.httpOptions);
  }

  register(name: string, email: string, mobile_number: string, password: string, re_password: string) {

    return this.http.post(
      this.serverURL + "register",
      {
        'name': name,
        'phone': mobile_number,
        'password': password,
        'c_password': re_password,
        'email': email
      },
      this.httpOptions
    );

  }

  // send student register form
  registrationStudent(data: FormData) {
    return this.http.post(
      this.serverURL + "registrationForm",
      data,
      this.httpOptions
    );
  }

  getRegistrationForm() {
    return this.http.get(
      this.serverURL + "getRegistrationForm",
      this.httpOptions
    )
  }

  // الاعتراضات , ارسال و جلب من السيرفر
  sendObjection(course: string, body: string, year: number, part: number, type: number, university_id: string) {
    return this.http.post(
      this.serverURL + "objection",
      {
        'course': course,
        'body': body,
        'year': year,
        'part': part,
        'type': type,
        'university_id': university_id,
      },
      this.httpOptions
    );
  }

  getObjections() {
    return this.http.get(
      this.serverURL + "objections",
      this.httpOptions
    )
  }

  getArticles() {
    return this.http.get(
      this.serverURL + "articles",
      this.httpOptions
    )
  }

  getAds() {
    return this.http.get(
      this.serverURL + "ads",
      this.httpOptions
    )
  }

  getStudentYearsInfo() {
    return this.http.get(
      this.serverURL + "student_years_info",
      this.httpOptions
    )
  }

  // ضبط الهيدرس من أجل استخدام التوكن
  setHeaderAuthorization() {
    this.token = this.getTokenfromStorage();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + this.token);
  }


  // تخزين البيانات على الموبايل
  saveUserInLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLoggedIn() {
    return (localStorage.getItem('user') != null) ? true : false;
  }

  getTokenfromStorage() {
    return JSON.parse(localStorage.getItem('user')).token;
  }

  getUserNamefromStorage() {
    return JSON.parse(localStorage.getItem('user')).name;
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

}
