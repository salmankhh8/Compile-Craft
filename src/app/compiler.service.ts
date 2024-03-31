import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }

  executeCodeAPI(code:any, language:any){
    let body={
      code,
      language
    }
    console.log(body, "api called");
    
    return this.http.post<any>("https://marbled-substantial-august.glitch.me/compileCode",body)
<<<<<<< HEAD

=======
>>>>>>> ad6062da04633f6d2b81e10fdb382c853722bf76
  }


}
