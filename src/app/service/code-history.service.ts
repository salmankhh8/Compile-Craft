import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { codeHistoryModel, trendQuestionModel } from '../models/codeHisstory.model';
import { Observable, of } from 'rxjs';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class CodeHistoryService {

  constructor(private http:HttpClient) { 

  }

  codeList:codeHistoryModel[]=[]

  getDummyDataCode():Observable<codeHistoryModel>{

    // return this.http.get<codeHistoryModel>('../../assets/sampleData/sample.json')
    let data:any = (localStorage.getItem('codeList'))
    // return data
    if( typeof data == 'string'){
      data= JSON.parse(data)
    }
    return of(data)
  }

  saveCodeHistory(data:any){
    let savedData= localStorage.getItem('codeList')
    if(savedData==null){
      this.codeList.push(data)
      localStorage.setItem('codeList', JSON.stringify(this.codeList))
    }
    if( typeof savedData == 'string'){
      savedData = JSON.parse(savedData)
      this.checkDataExist(savedData, data)
    }

    return true
  }

  getDummyTrendingQuestion():Observable<trendQuestionModel>{
      // Use the relative path for localhost
      return this.http.get<trendQuestionModel>('https://marbled-substantial-august.glitch.me/trendingCode');
  }

  getDSATypeChartData(): Observable<any> {
      return this.http.get<any>('https://marbled-substantial-august.glitch.me/dsaQuestion_chart');
  }

  getDailyCodeLogs(): Observable<any> {
    // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.http.get<any>('/assets/sampleData/workingHourLogs.json');
    // }
    //  else {
    //   return this.http.get<any>('https://salmankhh8.github.io/Compile-Craft/assets/sampleData/workingHourLogs.json');
    // }
  }

  checkDataExist(savedData:any, data:any){

    let index = savedData.findIndex((item:any)=> item.id == data.id)

    if(index!== -1){ // if data exist
      savedData[index]=data
      return true
    }
    else { // if data not exist 
      savedData.push(data)
      localStorage.setItem('codeList', JSON.stringify(savedData, null, 2))
      return true
    }

  }
}
