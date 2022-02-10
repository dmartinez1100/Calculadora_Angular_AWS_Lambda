import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient){}
  operA = '';
  operB = '';
  operador = '';
  pantalla = '';
  error = '';

  async Boton(str1:string){
    if (this.error != ""){this.Reset_calc()}
    if (str1 === "="){
      if (this.operador != '' &&  this.operB != ''){
        await this.Send_To_Server()
      }
      return
    }
    else if (str1 === "+" || str1 === "-" || str1 === "*" || str1 === "/"){
      if (this.operA === "") {return}
      if(this.operador != ''){
        if (this.operB != ''){
          await this.Send_To_Server()
        }
        else{
          this.pantalla = this.pantalla.slice(0, -1)
        }
      }
      this.operador = str1;
    }
    else if (this.operador === ""){
      this.operA = this.operA + str1;
    }
    else{
      this.operB = this.operB + str1;
    }
    this.pantalla = (this.error==="") ? this.pantalla + str1 : "";

  }
  Reset_calc(){
    this.operA = '';
    this.operB = '';
    this.operador = '';
    this.pantalla = ''
    this.error = ''
  }


  async Send_To_Server(){
    let url = 'https://hxqcu1nes7.execute-api.us-east-1.amazonaws.com/produccion/calcular'
    let data = {"num1":this.operA,"num2":this.operB,"operation":this.operador}
    await this.http.post(url, data).toPromise().then((response: any) => {
      this.Reset_calc();
      let result = response.result
      this.operA = result;
      this.pantalla = result;

    },(error) => {
      this.Reset_calc();
      this.error = error.error.result
    })
  }
  botones = ["1","2","3","+","4","5","6","-","7","8","9","*",".","0","=","/"];
  index = [0, 1, 2, 3]
}