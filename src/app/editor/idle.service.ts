import { Injectable } from '@angular/core';
import { debounceTime, interval, Observable, ReplaySubject, Subject, Subscription, switchMap, takeUntil, throttle, throttleTime, timer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Keepalive } from '@ng-idle/keepalive';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';




@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private readonly timeout = 5; // Time in seconds before user is considered inactive
  private readonly inactivityDuration = 20; // Time in seconds to send data after inactivity
  private lastActivity: Date = new Date(); // Tracks the last user activity time
  private isSendingTime = false; // Tracks if WebSocket messages are being sent
  private userActivity$ = new Subject<void>(); // Stream for user activity events
  private stopInactivityTimer$ = new Subject<void>(); // To stop inactivity timer
  private idleSubscription?: Subscription; // Tracks active subscription
  private socket!: Socket; // WebSocket connection
  private readonly serverUrl = 'http://127.0.0.1:5000/'; // Backend WebSocket URL
  private requestSubject = new ReplaySubject<void>();
  idleState = 'Not started.';
  timedOut = false;
  current_url=location.host
  lastPing: Date | undefined 

  constructor(private idle: Idle, private keepalive: Keepalive) {

    //throttle the user events 

    if (this.current_url =="localhost:4200"){
      this.socket = io(this.serverUrl,{
        query:{"email":"email@gmail.com"}
      })
    }
    else{
      console.log("running on hosting URL")
    }

    this.requestSubject.pipe(throttleTime(1000)).subscribe(() => {
      // console.log("sending API calls")
      this.sendTime()
      // callback();
      })
      this.requestSubject.next();
    idle.setIdle(1); // this will be 58*60

    idle.setTimeout(20); //counter time.

    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // there are various Interupts

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No Longer Idle';
      // console.log("user came nack after idle")
      this.requestSubject.next()
    }); // this is the palce to do somthing if user comes back after being idle.

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState)
    }); // this is place for redirect to login page.

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You have gone Idle';
      this.requestSubject.next()
      // console.log(this.idleState)

    });
     // this is place to do somthing when user goes Idle.
    idle.onTimeoutWarning.subscribe((countdown) => {
      // console.log("sening request in idle mode", countdown)
      this.sendRequest()

    });

    keepalive.interval(15);

    keepalive.onPing.subscribe(() => {
      // console.log("kkeeoing alive")
      this.lastPing = new Date();
    });

    this.reset(); // this function start the whole ng Idle

    this.socket.on('session_info', (data: any) => {
      console.log('Session Info:', data);
    });
  }

  reset() {
    this.idle.watch();
    this.idle.clearInterrupts
    this.idleState = 'Started';
    this.timedOut = false;
    this.requestSubject.next()
  }

  reset_subject(){
    this.requestSubject.pipe(throttleTime(1000)).subscribe(() => {
      // console.log("sending API calls")
      this.sendTime()
      // callback();
      })
      this.requestSubject.next();
  }

  connection_seesion(){
    this.socket.on("connecttion", (reason: any) => {
      console.log(`disconnected due to ${reason}`);
    });
  }


  private sendTime(): void {
    const now = new Date();
    this.socket.emit('send_time', {
      user_id: '12345', // Unique user ID
      current_time: now.toISOString(), // ISO timestamp
      user_email: 'salmankhh8@gmail.com',
      coding: true,
    });
  }  


  // stopWatching(){
  //   if (this.idleSubscription){
  //     this.idleSubscription.unsubscribe()
  //   }
  // }

  sendRequest(): void {
    // console.log("calling send requrest function")
    // this.requestSubject.next()
    this.sendTime()

  }

  
  
  // sendTime(): void {
  //   let now = new Date()
  //   this.socket.emit('send_time', {
  //     user_id: '12345',  // Unique user ID
  //     current_time: new Date(),
  //     user_email : "salmankhh8@gmail.com",
  //     coding: true
  //   });
  // }
  
  // check_inervalTime(){
  //   this.idleStateTimeStarted=true
  //   const interval$ = interval(1000)
  //   const stopInterval = timer(20000)

  //   interval$.pipe(takeUntil(this.checkItnervalMethod), takeUntil(stopInterval)).subscribe({
  //     next:(value)=>{
  //       // emmit the sending api requests
  //       this.sendRequest()
  //     },
  //     complete:()=>{
  //       console.log("cecking interval time")
  //     }
  //   })
  // }

  // startTimerOnIdle(){
  //   if (this.idleStateTimeStarted){
  //     console.log("Emmision is already runnnig.")
  //     return
  //   }
  //   if(this.idleStateTimerCompleted){
  //     console.log("emmstion completed once already")
  //     return 
  //   }

  //   this.idleStateTimeStarted=true
  //   const interval$ = interval(1000)
  //   const stopInterval = timer(20000)

  //   interval$.pipe(takeUntil(this.stopIdleTimeSendingSubject), takeUntil(stopInterval)).subscribe({
  //     next:(value)=>{
  //       // emmit the sending api requests
  //       this.sendRequest()
  //     },
  //     complete:()=>{
  //       console.log("Emmision completed")
  //       this.idleStateTimeStarted=false
  //       this.stopIdleTimeSendingSubject.next();
  //       this.stopIdleTimeSendingSubject.complete();
  //       this.idleStateTimerCompleted=true
  //     }
  //   })
  // }

  // stopEmmision(){
  //   if(!this.idleStateTimeStarted){
  //     console.log("no idle seding requests")
  //     return
  //   }
  //   this.stopIdleTimeSendingSubject.next();
  //   this.stopIdleTimeSendingSubject.complete()
  //   this.idleStateTimeStarted=false
  //   this.idleStateTimerCompleted=true
  //   console.log("emmision completed")
  // }

  // onDurationUpdate(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.socket.on('duration_update', (data) => {
  //       observer.next(data);
  //     });
  //   });
  // }
  // onConnectionStart(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.socket.on('connection_start', (data) => {
  //       observer.next(data);
  //     });
  //   });
  // }

  // onError(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.socket.on('error', (data) => {
  //       observer.next(data);
  //     });
  //   });
  // }
  // disconnect(): void {
  //   this.socket.disconnect();
  // }




}
