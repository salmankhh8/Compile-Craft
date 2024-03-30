import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInputModule } from "@angular/material/input"
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CodeHistoryService } from '../service/code-history.service';
import { HttpClientModule } from '@angular/common/http';
import { DSATypeChart, codeHistoryModel, trendQuestionModel } from '../models/codeHisstory.model';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { IconDefinition, faCodepen, faJava, faJs, faPython } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const matArray = [MatFormFieldModule, MatTableModule, MatSortModule, FontAwesomeModule, MatPaginatorModule, MatInputModule, CommonModule, HttpClientModule, MatListModule, MatIconModule, NgApexchartsModule, CommonModule]
export interface LanguageData {
  icon: string,
  color: string
}
export interface LanguageIcons {
  [key: string]: LanguageData
  // This specifies that the keys are strings and the values are strings (icon filenames)
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-code-history',
  standalone: true,
  imports: [matArray],
  templateUrl: './code-history.component.html',
  styleUrl: './code-history.component.scss',
  providers: [CodeHistoryService]
})



export class CodeHistoryComponent implements AfterViewInit, OnInit {
[x: string]: any;
  displayedColumns2: string[] = ['title','question', 'language', 'action'];

  dataSource2!: MatTableDataSource<codeHistoryModel>;
  trendingQuestions: trendQuestionModel[] = []
  showTable: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tableContainer') tableContainer!: ElementRef
  @ViewChild('chart') chart!: ChartComponent
  // languages
  faCodepen = faCodepen
  faJs = faJs
  faPython = faPython
  faJava = faJava
  public chartOptions!: Partial<ApexOptions> | any;
  public lineChartOptions!:Partial<ApexOptions> | any;
  isChartLoaded: boolean = false
  chartData:any[]=[]
  languageIcons: LanguageIcons = {
    "java": {
      icon: "fa-brands fa-java",
      color: "#FFA500"
    },
    "javascript": {
      icon: "fa-brands fa-js",
      color: "#EFD81D"
    },
    "python": {
      icon: "fa-brands fa-python",
      color: "#3776AB"
    }
  }
  // chartIcons:DSATypeChart={
  //   "js":{
  //     icon:""
  //   }
  // }
  iconsArr:DSATypeChart[]=[]
  lineChartSeries:any[]=[]
  constructor(private codeHistoryService: CodeHistoryService, private router: Router) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut",
        width:300,
        height:200,
        animations: {
          enabled: true, // Enable animations
          easing: 'linear', // Specify easing type
          speed: 1000 // Specify animation speed in milliseconds
        }
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {

            legend: {
              position: "bottom"
            }
          }
        }
      ],
      stroke: {
        colors: ['#000']
      },
      legend:{
        show:false
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries:[]
      },
      plotOptions: {
        'donut': {
          dataLabels: {
            enabled: false // Hide labels
          }
        }
      }
    };

    this.lineChartOptions={
      chart: {
        type: "line",
        width:550,
        height:200,
        toolbar:{
          show:false
        }
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 1
      },
      xaxis: {
        type:'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy'
        }
      }
      },
      yaxis:{
        min:0,
        labels: {
          style: {
            colors: '#acabab' // Specify the color here
          }
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },
        x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
        },
        marker: {
            show: true,
        },
        fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0, 
    },
      grid: {
        show: false,      // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false  //or just here to disable only x axis grids
           }
         },  
        yaxis: {
          lines: { 
            show: false  //or just here to disable only y axis
           }
         },   
      },
      fill: {
        type: "solid",
        colors: ['#1A73E8', '#B32824']
      }
    }


    this.codeHistoryService.getDummyDataCode().subscribe((res: any) => {
      res.map((element:codeHistoryModel)=>{
        element.iconObj= this.mapIconswithLanguage(element.language)
      })

      this.dataSource2 = new MatTableDataSource(res)
      this.showTable = true

      setTimeout(() => {
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      }, 10)
    })

    this.codeHistoryService.getDummyTrendingQuestion().subscribe((res: any) => {
      res.data.map((element: trendQuestionModel) => {
        element.iconObj = this.mapIconswithLanguage(element.language)
      })
      console.log(res)
      this.trendingQuestions = res.data
    })

    this.codeHistoryService.getDSATypeChartData().subscribe((res:any)=>{
      let count=0
      res.data.forEach((element:any) => {
        element.id=count++
        element.iconObj=this.mapIconswithLanguage(element.language)
        element.active=false
        this.chartData.push(element)
        // this.chartOptions.series=element["questions"].map(((item:any)=>item.askedPercentage)) 
        // this.chartOptions.labels=element["questions"].map(((item:any)=>item.type)) 
        this.iconsArr.push(element)
    });
    this.upateChartData()
    })

    this.codeHistoryService.getDailyCodeLogs().subscribe((res:any)=>{
      console.log(res);
      // this.lineChartOptions.series= res["coding_sessions"].map((item:any)=>item.date)
      // this.lineChartOptions.series= res["coding_sessions"].map((item:any)=>item.date)

      this.lineChartSeries=[
        {
          name:"workingHours",
          data:this.transformData(res["coding_sessions"])
        }
      ]
      console.log(this.lineChartSeries)
    })
  }

  transformData(coding_sessions:any[]){
    return coding_sessions.map((item:any)=>{
      return {
        x: item.date,
        y:item.total_hours
      }
    })
  }

  mapIconswithLanguage(language: any) {
    if(language=='js'){
      language='javascript'
    }
    return this.languageIcons[language]
  }

  upateChartData(index?:any) {
  //  index= Math.floor(Math.random()*3)
  index =index?index:0
    this.chartOptions.series=this.chartData[index]["questions"].map(((item:any)=>item.askedPercentage))
    // setTimeout(()=>{
       this.chartOptions.labels=this.chartData[index]["questions"].map(((item:any)=>item.type))
    // },2000)
  //  this.iconsArr[index]['active']=true
   this.iconsArr.map((i,j)=>{
    if(i.id==index){
      i.active=true
    }
    else{
      i.active=false
    }
   })
   this.isChartLoaded=true
  //  this.chartOptions.plotOptions.donut.dataLabels.enabled = false

    // this.chartOptions.series=element["questions"].map(((item:any)=>item.askedPercentage)) 
            // this.chartOptions.labels=element["questions"].map(((item:any)=>item.type)) 
  }    

  updateChart() {
    this.chartOptions.chart.animations = {
      enabled: true, // Enable animations
      easing: 'easeinout', // Specify easing type
      speed: 1500 // Specify animation speed in milliseconds
    }
    this.chartOptions.series = [44, 55, 13, 43, 40]
    this.chartOptions.plotOptions.donut.dataLabels.enabled = false
    // this.chartOptions.labels=["Team A", "Team B", "Team C", "Team D", "Team E"]//
    this.chartOptions.series=[67, 25,43, 33, 56]
  }


  ngOnInit(): void {

    // if (this.chartData && this.chartData.length > 0) {
    //   this.chartOptions.series = this.chartData.map(item => item.value);
    //   this.chartOptions.labels = this.chartData.map(item => item.label);
    //   this.isChartLoaded=true
    // }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tableContainer.nativeElement
    }, 10)
  }

  linkClicked(data: any, action: any) {
    if (action == 'code') {
      this.openInNewTab('trendingCode', data?.id)
    }
    else if(action =='savedCode'){
      this.openInNewTab('savedCode', data?.id)
    }
    else if (action == 'redirect') {
      console.log(data);
      window.open(data.link)
    }
  }

  openInNewTab(router:string,id:string){
    console.log(window.location, router,"Window Location");
    let currentHref = window.location.origin+ `/${router}/${id}`
    window.open(currentHref, "_blank")
  }

  applyFilter(event: Event) {
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
}