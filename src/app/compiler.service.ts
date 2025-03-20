import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  private baseUrl = "http://127.0.0.1:8000"
  current_url=location.host
  constructor(private http: HttpClient) { }

  executeCodeAPI(code:any, language:any){
    let body={
      code,
      language
    }
    if (this.current_url =="localhost:4200"){
      return this.http.post<any>(this.baseUrl+"/compileCode",body)
    }
    else{
      return this.http.post<any>("https://marbled-substantial-august.glitch.me/compileCode",body)
    }
  }


}
