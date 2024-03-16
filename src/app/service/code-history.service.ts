import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { codeHistoryModel, trendQuestionModel } from '../models/codeHisstory.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeHistoryService {

  constructor(private http:HttpClient) { }

  getDummyDataCode():Observable<codeHistoryModel>{
    // return dummyData
    return this.http.get<codeHistoryModel>('../../assets/sampleData/sample.json')
    // D:\practise\Javascript_compile_project\jsCompilerFrontend\src\assets\sampleData\sample.json
  }

  getDummyTrendingQuestion():Observable<trendQuestionModel>{
    return this.http.get<trendQuestionModel>("../../assets/sampleData/trending.json")
  }

  getDSATypeChartData(){
    return this.http.get<any>("../../assets/sampleData/dsaQuestion_chart.json")
  }
  
  getDailyCodeLogs(){
    return this.http.get("../../assets/sampleData/workingHourLogs.json")
  }
}
