import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from "ngx-tabs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userMsgList: any;
  userList: any;
  bgVideo: any;
  ProductName: any;
  Description: any;
  type1: any;
  type2: any;
  type3: any;
  productList: any = [];
  constructor(public httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.bgVideo = "/assets/prelaunch.mp4";
    this.httpClient.get('https://ofanimo.com:3000/customers', {
      'headers': {
        'Content-Type': 'application/json'
      }
    }).subscribe((res) => {
      this.userMsgList = res;
    });
    this.httpClient.get('https://ofanimo.com:3000/usermaster', {
      'headers': {
        'Content-Type': 'application/json'
      }
    }).subscribe((res) => {
      this.userList = res;
    });

    this.addProduct()
  }

  switchTabs(event) {
    document.querySelector('.nav-link.active').classList.remove('active');
    document.querySelectorAll('.tab-pane').forEach(element => {
      if (element.classList.contains('active')) {
        element.classList.remove('active')
        element.classList.remove('show')
      }
    });
    document.querySelector(event.target.attributes[3].nodeValue).classList.add('show')
    document.querySelector(event.target.attributes[3].nodeValue).classList.add('active')
    event.target.classList.add('active')

  }
  addProduct() {
    this.httpClient.get('https://ofanimo.com:3000/product', {
      'headers': {
        'Content-Type': 'application/json'
      }
    }).subscribe(res => { console.log(res); this.productList = res; })
  }
  productSubmit() {
    let data = { ProductName: this.ProductName, Description: this.Description, type1: this.type1, type2: this.type2, type3: this.type3 }
    this.httpClient.post('https://ofanimo.com:3000/product', data, {
      'headers': {
        'Content-Type': 'application/json'
      }
    }).subscribe(res => {
      console.log(res)
    })
  }

  assignProduct(event, list) {
    console.log(event, list);
    let subProductList;
    let isUserProduct = false;
    let ratingData;
    let data = { UserID: list.id, ProductID: '', ProductVariant: '', Rating: 0 }
    this.productList.forEach(element => {
      if (element.ProductName == event.target.value) {
        data.ProductID = element.ProductID;
        this.httpClient.get('https://ofanimo.com:3000/ratings?user='+list.userid+'&product='+element.ProductID, {
          'headers': {
            'Content-Type': 'application/json'
          }
        }).subscribe({
          next: (res: any) => {
            console.log(res);
            ratingData = res;
            if (res.length == 0) {
              isUserProduct = true;
            }
          },
          error: (err) => { console.log(err) },
          complete: () => {
            this.httpClient.put('https://ofanimo.com:3000/usermaster?productid='+element.ProductID+'&userid='+list.userid, {
                'headers': {
                  'Content-Type': 'application/json'
                }
              }).subscribe(res => {console.log(res)});
            let newData = [];
            console.log(isUserProduct)
            if (isUserProduct) {
              this.httpClient.get('https://ofanimo.com:3000/subProduct?id='+element.ProductID, {
                'headers': {
                  'Content-Type': 'application/json'
                }
              }).subscribe({
                next: res => {
                  subProductList = res;
                  for (let i = 0; i < subProductList.length; i++) {
                    console.log(list.id)
                    newData.push({ UserID: list.userid, ProductID: element.ProductID, ProductVariant: subProductList[i].SubProductName, Rating: 0 })
                  }
                },
                error: (err) => console.log(err),
                complete: () => {
                  if(ratingData.length < 1){
                    this.httpClient.post('https://ofanimo.com:3000/ratings', newData, {
                    'headers': {
                      'Content-Type': 'application/json'
                    }
                    }).subscribe(res => {
                      console.log(res);
                    })
                  }
                  // this.httpClient.post('https://ofanimo.com:3000/ratings', newData, {
                  //   'headers': {
                  //     'Content-Type': 'application/json'
                  //   }
                  // }).subscribe(res => {
                  //   console.log(res);
                  // })
                }
              }
              )
            } else {
              // this.httpClient.put('https://ofanimo.com:3000/ratings?productid='+element.ProductID+'&userid='+list.userid, {
              //   'headers': {
              //     'Content-Type': 'application/json'
              //   }
              // }).subscribe(res => {console.log(res)});
              // console.log("Put ")
            }
          }
        })

        // for(let i=0; i<3; i++){
        //   this.httpClient.post('https://ofanimo.com:3000/ratings', data, {'headers': {
        //     'Content-Type': 'application/json'
        //   }} ).subscribe(res => {
        //     console.log(res);
        //   })
        // }

      }
    });
  }

}
