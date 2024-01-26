import React from "react";

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};
export interface IModalServiceCallback{
    id:string,
    component:((modalProps: any)=>JSX.Element)|React.ReactNode|string,
    config:{
        width?:string|number,
        height?:string|number,
        closeIcon?:boolean,
        disableOutsideClick?:boolean
        [index:string]: any
    }
}
export const ModalService = {
    on(event:string, callback:(d:IModalServiceCallback)=>void) {
        document.addEventListener(event, (e:CustomEventInit) => callback(e.detail));
    },
    off(event:string,callback:(d:IModalServiceCallback)=>void){
        document.removeEventListener(event, (e:CustomEventInit) => callback(e.detail));
    },
    open(component:IModalServiceCallback['component'], config?:IModalServiceCallback['config']) {
        const randomId = uniqueId()
        document.dispatchEvent(new CustomEvent('open', { detail: {id:randomId,component,config:{ width:'fit-content', height:'fit-content', closeIcon:true,disableOutsideClick:false, ...config}  } }));
        return randomId;
    },
    close(id?:string){
        document.dispatchEvent(new CustomEvent('close',{detail:{id}}));
    }
};