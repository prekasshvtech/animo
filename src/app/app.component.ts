import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, HostBinding, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0, width:'0'}),
          animate('500ms', style({width: '152px', opacity: 1, }))
        ]),
        transition(':leave', [
          style({opacity: 1, width: '152px', }),
          animate('500ms', style({opacity: 0, width: '0'}))
        ])
      ]
    ),
    trigger(
      'enterEmail', [
        transition(':enter', [
          style({opacity: 0, width: '0'}),
          animate('500ms', style({ width: '250px', opacity: 1}))
        ]),
        transition(':leave', [
          style({width: '250px', opacity: 1}),
          animate('500ms', style({opacity: 0, width: '0'}))
        ])
      ]
    ),
    trigger(
      'enterThankyou', [
        transition(':enter', [
          style({opacity: 0, width: '0'}),
          animate('800ms', style({ width: '300px', opacity: 1}))
        ]),
        transition(':leave', [
          style({width: '300px', opacity: 1}),
          animate('150ms', style({opacity: 0, width:'0'}))
        ])
      ]
    ),
    trigger(
      'showForm', [
        transition(':enter', [
          style({opacity: 0, height: '0'}),
          animate('800ms', style({ height: 'auto', opacity: 1}))
        ]),
        transition(':leave', [
          style({width: 'auto', opacity: 1}),
          animate('500ms', style({opacity: 0, height:'0'}))
        ])
      ]
    )
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  title = 'prelaunch';
  menuList:string[];
  showField:string = "subButton";
  test:string = "Abhi";
  submitted:boolean = false;
  emailfield:string;
  emailstate:boolean;
  slides:any;
  slideConfig:any;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    message: new FormControl(''),
  });
  bgVideo:any;
  bgAudio:any;
  audio = new Audio();
  setInterval:any

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  constructor(private renderer: Renderer2, private el: ElementRef, public httpClient: HttpClient, private toastr: ToastrService) {
  }
  onMouseWheel(evt) {
    
    if(evt.wheelDelta < 0){
      console.log(evt.wheelDelta);
    }
}
  
  showForm(){
    window.scrollTo(0,0);
    // if(this.emailstate){
      this.showField = 'myform'
    // }else{
    //   this.toastr.error('User subscription Not Found');
    // }
  }
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

  muteVideo(){
    if(document.querySelector("#bgVideo")['muted']){
      document.querySelector("#bgVideo")['muted'] = false
      // document.querySelector('audio')['muted'] = false;
      this.playAudio()
    }else{
      document.querySelector("#bgVideo")['muted'] = true;
      // document.querySelector('audio')['muted'] = true;
      this.stopAudio();
    }

    if(document.querySelector(".audioButton").children[0].className.includes('icon-mute')){
      document.querySelector(".audioButton").children[0].classList.remove('icon-mute');
      document.querySelector(".audioButton").children[0].classList.add('icon-unmute');
    }else{
      document.querySelector(".audioButton").children[0].classList.add('icon-mute');
      document.querySelector(".audioButton").children[0].classList.remove('icon-unmute');
    }
  }

  ngOnInit()  {
    this.bgVideo= "/assets/prelaunch.mp4";
    this.bgAudio="/assets/audio.mp3";
        this.menuList = ['OF ANIMO', 'OF ANIMO', 'OF ANIMO', 'OF ANIMO',];
        if(document.querySelector(".marqueeWrapper") != undefined){
          document.querySelector(".marqueeWrapper")['style'].left = -1;
        }

        // if((function iOS() {
        //   return [
        //     'iPad Simulator',
        //     'iPhone Simulator',
        //     'iPod Simulator',
        //     'iPad',
        //     'iPhone',
        //     'iPod'
        //   ].includes(navigator.platform)})()) {
        //     alert(navigator.platform);
        //     if(!document.querySelector('body').classList.contains('iphone')) {
        //       document.querySelector('body').classList.add('iphone')
        //     }
        //   }
  }
  playAudio(){
    this.audio.src = "/assets/audio.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.muted = false;
  }
  stopAudio() {
    this.audio.muted = true;
  }

  ngAfterViewInit() {
    var navWidth = 0;
    // setTimeout(() => {
    //   document.querySelector('audio').play();
    //   document.querySelector('audio')['muted'] = true;
    // },100)
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.setAttribute('data-pos-start', ''+navWidth)
      item.setAttribute('data-pos-end', ''+ (navWidth + item.clientWidth))
      navWidth = navWidth + item.clientWidth;
    });
    this.playBanner()
    setTimeout(() => {
      document.querySelector('video').play()
    },300)
    // document.querySelector("#bgVideo").setAttribute('autoplay', 'true');
    let that = this;
    window.addEventListener('orientationchange', function() {
      window.location.reload();
    }, false)
  }
playBanner() {
  let left = -1;
 this.setInterval = setInterval(() => {
    left = left - 1;
    if(document.querySelector(".marqueeWrapper") != undefined){
      document.querySelector(".marqueeWrapper")['style'].left = left + 'px';
      let width = document.querySelector('.marqueeWrapper .items').clientWidth;
      if(Math.abs(parseInt(document.querySelector(".marqueeWrapper")['style'].left)) == width) {
        left = -1;
      }
    }
  },15)
}
  validateEmail() {
    let responseId;
    let email = document.querySelector("#emailid")['value'];
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){

      this.httpClient.get('https://ofanimo.com:3000/getEmail?email='+email, {'headers': {
    'Content-Type': 'application/json'
  }}).subscribe((res:any ) => {console.log(res)
    if(res.length == 0 && res != null){
      this.showField="inputfield2"
      this.emailstate = true; 
      this.httpClient.post('https://ofanimo.com:3000/usermaster', {Username: email}, {'headers': {
        'Content-Type': 'application/json'
      }}).subscribe({
        next: (res:any ) => {console.log(res); responseId = res.employee_id},
        error: (err) => {console.log(err)},
        complete: () => {
          let newData = [];
          let subProductList = [{SubProductName: "TYPE #001"},{SubProductName: "TYPE #002"},{SubProductName: "TYPE #003"}]
          for (let i = 0; i < subProductList.length; i++) {
            newData.push({ UserID: responseId, ProductID: 1, ProductVariant: subProductList[i].SubProductName, Rating: 0 })
          }
          this.httpClient.post('https://ofanimo.com:3000/ratings', newData, {
                    'headers': {
                      'Content-Type': 'application/json'
                    }
                    }).subscribe(res => {
                      console.log(res);
                    })
        }
      });
    }
    else{
      this.toastr.error('Provided E-Mail-Id is already subscribed ');
    }
  })
    } else{
      this.emailstate = false;
      this.toastr.error('Enter a Valid email id');
    }return re.test(email);
  }
  submitForm() {
    this.submitted = true;
    console.log(this.profileForm.value);//50.62.81.216:3000
    this.httpClient.post('https://ofanimo.com:3000/customers',  this.profileForm.value, {'headers': {
    'Content-Type': 'application/json'
  }}).subscribe((res)=>{
            this.profileForm.reset();
            this.submitted = false;
        });
  }

  ngOnDestroy() {
    clearInterval(this.setInterval);
    if(!document.querySelector('body').classList.contains('iphone')) {
      document.querySelector('body').classList.remove('iphone')
    }
  }
}
