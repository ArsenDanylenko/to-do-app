"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[530],{8530:(u,r,s)=>{s.r(r),s.d(r,{LocalNotificationsWeb:()=>c});var n=s(5861),a=s(5236);class c extends a.Uw{constructor(){super(...arguments),this.pending=[],this.hasNotificationSupport=()=>{if(!("Notification"in window)||!Notification.requestPermission)return!1;if("granted"!==Notification.permission)try{new Notification("")}catch(i){if("TypeError"==i.name)return!1}return!0}}createChannel(){var i=this;return(0,n.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}deleteChannel(){var i=this;return(0,n.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}listChannels(){var i=this;return(0,n.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}schedule(i){var t=this;return(0,n.Z)(function*(){if(!t.hasNotificationSupport())throw t.unavailable("Notifications not supported in this browser.");for(const e of i.notifications)t.sendNotification(e);return{notifications:i.notifications.map(e=>({id:e.id}))}})()}getPending(){var i=this;return(0,n.Z)(function*(){return{notifications:i.pending}})()}registerActionTypes(){var i=this;return(0,n.Z)(function*(){throw i.unimplemented("Not implemented on web.")})()}cancel(i){var t=this;return(0,n.Z)(function*(){t.pending=t.pending.filter(e=>!i.notifications.find(o=>o.id===e.id))})()}areEnabled(){var i=this;return(0,n.Z)(function*(){const{display:t}=yield i.checkPermissions();return{value:"granted"===t}})()}requestPermissions(){var i=this;return(0,n.Z)(function*(){if(!i.hasNotificationSupport())throw i.unavailable("Notifications not supported in this browser.");return{display:i.transformNotificationPermission(yield Notification.requestPermission())}})()}checkPermissions(){var i=this;return(0,n.Z)(function*(){if(!i.hasNotificationSupport())throw i.unavailable("Notifications not supported in this browser.");return{display:i.transformNotificationPermission(Notification.permission)}})()}transformNotificationPermission(i){switch(i){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}sendPending(){var i;const t=[],e=(new Date).getTime();for(const o of this.pending)(null===(i=o.schedule)||void 0===i?void 0:i.at)&&o.schedule.at.getTime()<=e&&(this.buildNotification(o),t.push(o));this.pending=this.pending.filter(o=>!t.find(d=>d===o))}sendNotification(i){var t;if(null===(t=i.schedule)||void 0===t?void 0:t.at){const e=i.schedule.at.getTime()-(new Date).getTime();return this.pending.push(i),void setTimeout(()=>{this.sendPending()},e)}this.buildNotification(i)}buildNotification(i){const t=new Notification(i.title,{body:i.body});return t.addEventListener("click",this.onClick.bind(this,i),!1),t.addEventListener("show",this.onShow.bind(this,i),!1),t}onClick(i){this.notifyListeners("localNotificationActionPerformed",{actionId:"tap",notification:i})}onShow(i){this.notifyListeners("localNotificationReceived",i)}}}}]);