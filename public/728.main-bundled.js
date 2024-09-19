"use strict";(self.webpackChunkmakear_haier_poc=self.webpackChunkmakear_haier_poc||[]).push([[728],{728:(e,t,r)=>{r.r(t),r.d(t,{DRACOLoader:()=>n});var o=r(437);const s=new WeakMap;class n extends o.aHM{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,r,s){const n=new o.Y9S(this.manager);n.setPath(this.path),n.setResponseType("arraybuffer"),n.setRequestHeader(this.requestHeader),n.setWithCredentials(this.withCredentials),n.load(e,(e=>{this.parse(e,t,s)}),r,s)}parse(e,t,r=()=>{}){this.decodeDracoFile(e,t,null,null,o.er$,r).catch(r)}decodeDracoFile(e,t,r,s,n=o.Zr2,a=()=>{}){const i={attributeIDs:r||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!r,vertexColorSpace:n};return this.decodeGeometry(e,i).then(t).catch(a)}decodeGeometry(e,t){const r=JSON.stringify(t);if(s.has(e)){const t=s.get(e);if(t.key===r)return t.promise;if(0===e.byteLength)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let o;const n=this.workerNextTaskID++,a=e.byteLength,i=this._getWorker(n,a).then((r=>(o=r,new Promise(((r,s)=>{o._callbacks[n]={resolve:r,reject:s},o.postMessage({type:"decode",id:n,taskConfig:t,buffer:e},[e])}))))).then((e=>this._createGeometry(e.geometry)));return i.catch((()=>!0)).then((()=>{o&&n&&this._releaseTask(o,n)})),s.set(e,{key:r,promise:i}),i}_createGeometry(e){const t=new o.LoY;e.index&&t.setIndex(new o.THS(e.index.array,1));for(let r=0;r<e.attributes.length;r++){const s=e.attributes[r],n=s.name,a=s.array,i=s.itemSize,c=new o.THS(a,i);"color"===n&&(this._assignVertexColorSpace(c,s.vertexColorSpace),c.normalized=a instanceof Float32Array==0),t.setAttribute(n,c)}return t}_assignVertexColorSpace(e,t){if(t!==o.er$)return;const r=new o.Q1f;for(let t=0,o=e.count;t<o;t++)r.fromBufferAttribute(e,t).convertSRGBToLinear(),e.setXYZ(t,r.r,r.g,r.b)}_loadLibrary(e,t){const r=new o.Y9S(this.manager);return r.setPath(this.decoderPath),r.setResponseType(t),r.setWithCredentials(this.withCredentials),new Promise(((t,o)=>{r.load(e,t,void 0,o)}))}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e="object"!=typeof WebAssembly||"js"===this.decoderConfig.type,t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then((t=>{const r=t[0];e||(this.decoderConfig.wasmBinary=t[1]);const o=a.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join("\n");this.workerSourceURL=URL.createObjectURL(new Blob([s]))})),this.decoderPending}_getWorker(e,t){return this._initDecoder().then((()=>{if(this.workerPool.length<this.workerLimit){const e=new Worker(this.workerSourceURL);e._callbacks={},e._taskCosts={},e._taskLoad=0,e.postMessage({type:"init",decoderConfig:this.decoderConfig}),e.onmessage=function(t){const r=t.data;switch(r.type){case"decode":e._callbacks[r.id].resolve(r);break;case"error":e._callbacks[r.id].reject(r);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+r.type+'"')}},this.workerPool.push(e)}else this.workerPool.sort((function(e,t){return e._taskLoad>t._taskLoad?-1:1}));const r=this.workerPool[this.workerPool.length-1];return r._taskCosts[e]=t,r._taskLoad+=t,r}))}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map((e=>e._taskLoad)))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,""!==this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),this}}function a(){let e,t;function r(e,t,r,o,s,n){const a=n.num_components(),i=r.num_points()*a,c=i*s.BYTES_PER_ELEMENT,d=function(e,t){switch(t){case Float32Array:return e.DT_FLOAT32;case Int8Array:return e.DT_INT8;case Int16Array:return e.DT_INT16;case Int32Array:return e.DT_INT32;case Uint8Array:return e.DT_UINT8;case Uint16Array:return e.DT_UINT16;case Uint32Array:return e.DT_UINT32}}(e,s),l=e._malloc(c);t.GetAttributeDataArrayForAllPoints(r,n,d,c,l);const h=new s(e.HEAPF32.buffer,l,i).slice();return e._free(l),{name:o,array:h,itemSize:a}}onmessage=function(o){const s=o.data;switch(s.type){case"init":e=s.decoderConfig,t=new Promise((function(t){e.onModuleLoaded=function(e){t({draco:e})},DracoDecoderModule(e)}));break;case"decode":const o=s.buffer,n=s.taskConfig;t.then((e=>{const t=e.draco,a=new t.Decoder;try{const e=function(e,t,o,s){const n=s.attributeIDs,a=s.attributeTypes;let i,c;const d=t.GetEncodedGeometryType(o);if(d===e.TRIANGULAR_MESH)i=new e.Mesh,c=t.DecodeArrayToMesh(o,o.byteLength,i);else{if(d!==e.POINT_CLOUD)throw new Error("THREE.DRACOLoader: Unexpected geometry type.");i=new e.PointCloud,c=t.DecodeArrayToPointCloud(o,o.byteLength,i)}if(!c.ok()||0===i.ptr)throw new Error("THREE.DRACOLoader: Decoding failed: "+c.error_msg());const l={index:null,attributes:[]};for(const o in n){const c=self[a[o]];let d,h;if(s.useUniqueIDs)h=n[o],d=t.GetAttributeByUniqueId(i,h);else{if(h=t.GetAttributeId(i,e[n[o]]),-1===h)continue;d=t.GetAttribute(i,h)}const u=r(e,t,i,o,c,d);"color"===o&&(u.vertexColorSpace=s.vertexColorSpace),l.attributes.push(u)}return d===e.TRIANGULAR_MESH&&(l.index=function(e,t,r){const o=3*r.num_faces(),s=4*o,n=e._malloc(s);t.GetTrianglesUInt32Array(r,s,n);const a=new Uint32Array(e.HEAPF32.buffer,n,o).slice();return e._free(n),{array:a,itemSize:1}}(e,t,i)),e.destroy(i),l}(t,a,new Int8Array(o),n),i=e.attributes.map((e=>e.array.buffer));e.index&&i.push(e.index.array.buffer),self.postMessage({type:"decode",id:s.id,geometry:e},i)}catch(e){console.error(e),self.postMessage({type:"error",id:s.id,error:e.message})}finally{t.destroy(a)}}))}}}}}]);