import{d as l,r as i,o as h,c as m,a as _,u as d}from"./index.0a5aa438.js";const V=l({__name:"Vue3View",props:{id:String,path:String},setup(o){const e=o,s=d(),n=!1,r=!0,u="vue3"+(e.id||""),a=i(`http://localhost:8001/${e.path||""}`),c=t=>{s.push(t)};return(t,f)=>{const p=_("WujieVue");return h(),m(p,{width:"100%",height:"100%",name:u,url:a.value,sync:n,alive:r,props:{jump:c}},null,8,["url","props"])}}});export{V as default};