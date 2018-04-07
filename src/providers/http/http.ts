import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }
  
  getJsonData(){
  //return this.http.get('https://opentdb.com/api.php?amount=1&type=boolean').map((res: Response) => res.json());
  return this.http.get('https://opentdb.com/api.php?amount=1&type=boolean').map(res => res );
  
}


}
