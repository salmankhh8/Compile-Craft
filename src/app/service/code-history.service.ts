import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { codeHistoryModel, trendQuestionModel } from '../models/codeHisstory.model';
import { map, Observable, of } from 'rxjs';
import { routes } from '../app.routes';
// const {json, chartJson,coding_sessions} = require("./samplData.js")


@Injectable({
  providedIn: 'root'
})
export class CodeHistoryService {

  constructor(private http:HttpClient) { 

  }

  codeList:codeHistoryModel[]=[]

  current_url=location.host
  
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

  getDummyTrendingQuestion():Observable<{ data: any }>{
      // Use the relative path for localhost
      if (this.current_url =="localhost:4200"){
        console.log("laoding file from local path",this.current_url)
        return this.http.get<trendQuestionModel>("../../assets/sampleData/trending.json").pipe(map((response) => ({ data: response }))
      )}
      else{
        console.log("laoding file from server",this.current_url)
        return this.http.get<any>('https://marbled-substantial-august.glitch.me/trendingCode');
      }
  }

  getDSATypeChartData(): Observable<{data:any}> {
    if (this.current_url =="localhost:4200"){
      console.log("laoding file from local path",this.current_url)
      return this.http.get<trendQuestionModel>("../../assets/sampleData/dsaQuestion_chart.json").pipe(map(res=>({data:res})))
    }
    else{
      return this.http.get<any>('https://marbled-substantial-august.glitch.me/dsaQuestion_chart');
    }
  }

  getDailyCodeLogs(): Observable<any> {
    // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (this.current_url =="localhost:4200"){
        console.log("laoding file from local path",this.current_url)
        return this.http.get<trendQuestionModel>("../../assets/sampleData/workingHourLogs.json").pipe(map(res=> ({data:res})))
      }
      else{
        return this.http.get<any>('/assets/sampleData/workingHourLogs.json');
      }
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
