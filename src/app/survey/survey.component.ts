import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, width: '0' }),
        animate('500ms', style({ width: '152px', opacity: 1, }))
      ]),
      transition(':leave', [
        style({ opacity: 1, width: '152px', }),
        animate('500ms', style({ opacity: 0, width: '0' }))
      ])
    ]
    ),
    trigger(
      'enterEmail', [
      transition(':enter', [
        style({ opacity: 0, width: '0' }),
        animate('500ms', style({ width: '250px', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ width: '250px', opacity: 1 }),
        animate('250ms', style({ opacity: 0, width: '0' }))
      ])
    ]
    ),
    trigger(
      'enterThankyou', [
      transition(':enter', [
        style({ opacity: 0, width: '0' }),
        animate('800ms', style({ width: '300px', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ width: '300px', opacity: 1 }),
        animate('150ms', style({ opacity: 0, width: '0' }))
      ])
    ]
    ),
    trigger(
      'showForm', [
      transition(':enter', [
        style({ opacity: 0, height: '0' }),
        animate('800ms', style({ height: 'auto', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ width: 'auto', opacity: 1 }),
        animate('500ms', style({ opacity: 0, height: '0' }))
      ])
    ]
    )
  ]
})
export class SurveyComponent implements OnInit, OnDestroy {
  showField: string = 'emailField';;
  emailstate: boolean;
  bgVideo: any;
  productOne: number;
  productTwo: number;
  productThree: number;
  rateArray: any = [];
  menuList: any = [];
  titleState: boolean = true;
  newData: any = [];
  setInterval: any;

  constructor(private toastr: ToastrService, public httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.bgVideo = "/assets/prelaunch.mp4";
    this.menuList = ['OF ANIMO', 'OF ANIMO', 'OF ANIMO', 'OF ANIMO',]
    this.playBanner();
    document.querySelector('body').classList.add('survey');
  }

  playBanner() {
    let left = -1;
    this.setInterval = setInterval(() => {
      left = left - 1;
      if (document.querySelector(".marqueeWrapper") != undefined) {
        document.querySelector(".marqueeWrapper")['style'].left = left + 'px';
        let width = document.querySelector('.marqueeWrapper .items').clientWidth;
        if (Math.abs(parseInt(document.querySelector(".marqueeWrapper")['style'].left)) == width) {
          left = -1;
        }
      }
    }, 15)
  }

  validatePassword() {
    this.showField = "ratingForm"
  }

  rateProvider(event, product) {
    console.log(event.srcElement.name)
    console.log(event.target.value)
    if (this.newData.length != undefined && this.newData.length == 0) {
      product.Rating = event.target.value;
      this.newData.push(product)
    } else {
      this.newData.forEach((element, index) => {
        if (element.ProductVariant == product.ProductVariant) {
          element.Rating = event.target.value;
          return
        } else if (this.newData.length < 3 && this.newData.length == (index + 1)) {
          product.Rating = event.target.value;
          this.newData.push(product)
        }
      });
    }
    // newData.forEach(element => {
    //   if(element.ProductVariant == event.srcElement.name){
    //     newData.push(element)
    //   }
    // });
    // if(product.ProductVariant)
    // if(event.srcElement.checked){
    //   if(product.ProductVariant == event.srcElement.name){
    //     this.productOne = event.target.value;
    //   }
    //   else if(product == 'productB'){
    //     this.productTwo = event.target.value;

    //   }
    //   else if(product == 'productC'){
    //     this.productThree = event.target.value;

    //   }
    // }
  }

  validateEmail() {
    let email = document.querySelector("#emailid")['value'];
    var userID = null;
    let responseId;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {

      this.httpClient.get('https://ofanimo.com:3000/usermaster?user=' + email, {
        'headers': {
          'Content-Type': 'application/json'
        }
      }).subscribe((res: any) => {
        console.log("Service Response")
        console.log(res)
        if (res.length >= 1) {
          this.showField = "passwordField"
          this.emailstate = true;
          this.titleState = false;
          this.showField = "ratingForm";
          userID = res[0].userid;
          console.log(userID)
          console.log(res);
          this.httpClient.get('https://ofanimo.com:3000/ratings?user=' + userID + '&product=' + 1, {
            'headers': {
              'Content-Type': 'application/json'
            }
          }).subscribe((res: []) => {
            console.log(res)
            this.rateArray = res;
          })
        } else {
          this.httpClient.post('https://ofanimo.com:3000/usermaster', { Username: email }, {
            'headers': {
              'Content-Type': 'application/json'
            }
          }).subscribe({

            next: (res: any) => { console.log(res); responseId = res.employee_id; userID = res.employee_id },
            error: (err) => { console.log(err) },
            complete: () => {
              let newData = [];
              let subProductList = [{ SubProductName: "TYPE #001" }, { SubProductName: "TYPE #002" }, { SubProductName: "TYPE #003" }]
              for (let i = 0; i < subProductList.length; i++) {
                newData.push({ UserID: responseId, ProductID: 1, ProductVariant: subProductList[i].SubProductName, Rating: 0 })
              }
              this.httpClient.get('https://ofanimo.com:3000/ratings?user=' + userID + '&product=' + 1, {
                'headers': {
                  'Content-Type': 'application/json'
                }
              }).subscribe((res: []) => {
                console.log(res)
                if (res.length == 0) {
                  this.httpClient.post('https://ofanimo.com:3000/ratings', newData, {
                    'headers': {
                      'Content-Type': 'application/json'
                    }
                  }).subscribe(res => {
                    console.log(res);
                    this.rateArray = newData;
                    this.emailstate = true;
                    this.titleState = false;
                    this.showField = "ratingForm";
                  })
                }

              })
            }
          });
        }

      });


    } else {
      this.emailstate = false;
      this.toastr.error('Enter a Valid email id');
    } return re.test(email);
  }

  submit() {
    console.log(this.newData);
    let isSucces = this.httpClient.put('https://ofanimo.com:3000/ratings', this.newData, {
      'headers': {
        'Content-Type': 'application/json'
      }
    }).subscribe(res => {
        console.log(res);
        return res;
      });

    if(isSucces){
      this.showField = 'thankyouField';
      setTimeout(() => {
        this.router.navigate(['/'])
      },10000)
    }
    // this.showField = 'emailField';
    // this.emailstate = false; 
    // this.titleState = true;
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('survey');
    clearInterval(this.setInterval);
  }

}
