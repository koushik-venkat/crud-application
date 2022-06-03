import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  uid:any;
  public data:any = [];
  constructor(private http: HttpClient) { }
 public ele1:string = '';
  public ele2:string = '';
  ngOnInit(): void {
    this.onGet();
  }

  onGet(){
    this.http.get(
        'http://127.0.0.1:8000/posts'
      ).subscribe(response => {
        console.log( typeof response);
        this.setvalue(response);
      });
  }
  setvalue(recipe:any){
    const resultarray = Object.keys(recipe).map((index) => {

      let person = recipe[index];

      return person;

    });
    this.data = resultarray;
  }
  onCreate(inputele:any,content:any){
    const sdata = {
      title: inputele.value,
      content: content.value
    }
    if(inputele.value=='' || content.value==''){
      alert("Please enter all the fields");
    }else{
      this.http.post(
        'http://127.0.0.1:8000/posts',sdata
      ).subscribe(response => {
        console.log(response);
      });
      this.ele1 = inputele.value;
      this.ele2 = content.value;
    inputele.value='';
    content.value='';
    let element: HTMLElement = document.getElementsByClassName('closemodalll')[0] as HTMLElement;
element.click();
    }
  }
  onDelete(id: any){
    
    this.http.delete(
      'http://127.0.0.1:8000/posts/'+id
    ).subscribe(response => {
      console.log(response);
    });
    this.ngOnInit();
    let element: HTMLElement = document.getElementsByClassName('closegetallposts')[0] as HTMLElement;
element.click();
  }
  storeid(id:any){
    this.uid = id;
  }
  onUpdate(ucontent:any,utitle:any){
    const sdata = {
      content: ucontent.value,
      title: utitle.value
    }
    if(ucontent.value=='' || utitle.value==''){
      alert("Please enter all the fields");
    }else{
      this.http.put(
        'http://127.0.0.1:8000/posts/'+this.uid,sdata
      ).subscribe(response => {
        console.log(response);
      });
      ucontent.value='';
      utitle.value='';
      let elment: HTMLElement = document.getElementsByClassName('closeupdatemodal')[0] as HTMLElement;
      elment.click();
      this.ngOnInit();
    }
  }




  




  
}

