import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface codeHistoryModel{
    id:string,
    title:string,
    question:string,
    time:string,
    code:string,
    language:string,
    description:string,
    iconObj:{
        icon:string,
        color:string
    }
}

export interface trendQuestionModel{
    element: { java: { icon: IconDefinition; color: string }; javascript: { icon: IconDefinition; color: string }; python: { icon: IconDefinition; color: string } }
    id:string,
    question:string,
    description:string,
    link:string,
    language:string,
    code:string
    iconObj:{
        icon:string,
        color:string
    }
}

export interface DSATypeChart{
    id:string,
    active:boolean,
    iconObj:{
        icon:string,
        color:string
    }
}