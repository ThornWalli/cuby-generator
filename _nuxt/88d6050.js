(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{156:function(t,e,o){var content=o(241);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(59).default)("52e8f885",content,!0,{sourceMap:!1})},157:function(t,e,o){var content=o(243);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(59).default)("11e2a1e9",content,!0,{sourceMap:!1})},159:function(t,e,o){t.exports=o.p+"fonts/BitFont.f265480.woff2"},160:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-300.b871ad6.woff2"},161:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-300italic.b45d999.woff2"},162:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-regular.f57a62e.woff2"},163:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-italic.bb91531.woff2"},164:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-600.9526470.woff2"},165:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-600italic.cc4bf5b.woff2"},166:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-700.92425c6.woff2"},167:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-700italic.2a0783b.woff2"},168:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-800.1666787.woff2"},169:function(t,e,o){t.exports=o.p+"fonts/open-sans-v18-latin-800italic.b5bc266.woff2"},188:function(t,e,o){"use strict";var n={props:{src:{type:String,required:!0},size:{type:Object,required:!0}}},r=(o(240),o(40)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"atoms-preview"},[o("transition",{attrs:{name:"fade"}},[o("img",{key:t.src,style:t.size.toCSSVars("size"),attrs:{src:t.src}})])],1)}),[],!1,null,"7035c393",null);e.a=component.exports},204:function(t,e,o){"use strict";var n={components:{AtomPreview:o(188).a},computed:{previewData:function(){return this.$store.getters["layout/previewData"]}}},r=(o(242),o(40)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"font",rawName:"v-font",value:[t.$getFont("Open Sans",400,"normal"),t.$getFont("BitFont",400,"normal",{selector:".atom-base-button"})],expression:"[\n    $getFont('Open Sans', 400, 'normal'),\n    $getFont('BitFont', 400, 'normal', {selector:'.atom-base-button'})]"}]},[o("atom-preview",t._b({staticClass:"preview"},"atom-preview",t.previewData,!1)),t._v(" "),o("Nuxt")],1)}),[],!1,null,null,null);e.a=component.exports},208:function(t,e,o){t.exports=o(209)},240:function(t,e,o){"use strict";o(156)},241:function(t,e,o){var n=o(58)(!1);n.push([t.i,".atoms-preview[data-v-7035c393]{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%}.atoms-preview img[data-v-7035c393]{display:block;width:calc(var(--size-x)*1px);max-width:100%;height:calc(var(--size-y)*1px);max-height:100%;-o-object-fit:cover;object-fit:cover;box-shadow:0 0 .625rem rgba(0,0,0,.6)}.fade-enter-active[data-v-7035c393],.fade-leave-active[data-v-7035c393]{position:absolute;top:50%;left:50%;width:100%;height:100%;transition:opacity .3s;transform:translate(-50%,-50%)}.fade-enter[data-v-7035c393],.fade-leave-to[data-v-7035c393]{opacity:0}",""]),t.exports=n},242:function(t,e,o){"use strict";o(157)},243:function(t,e,o){var n=o(58),r=o(158),c=o(244),f=n(!1),l=r(c);f.push([t.i,'.page-enter-active,.page-leave-active{transition:opacity .5s}.page-enter,.page-leave-to{opacity:0}.preview{position:fixed!important;top:0;right:0;bottom:0;left:0;overflow:hidden}html{box-sizing:border-box;font-family:"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:16px;background:url('+l+");word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}*,:after,:before{box-sizing:border-box;margin:0}.button--green{display:inline-block;padding:10px 30px;color:#3b8070;text-decoration:none;border:1px solid #3b8070;border-radius:4px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;padding:10px 30px;margin-left:15px;color:#35495e;text-decoration:none;border:1px solid #35495e;border-radius:4px}.button--grey:hover{color:#fff;background-color:#35495e}",""]),t.exports=f},244:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpi/P//PwM6OHv2HIYgEwORYAAVsmBzuLGxEeNQ9AxAgAEAG1wKejjL7dsAAAAASUVORK5CYII="},245:function(t,e,o){"use strict";o.r(e),o.d(e,"state",(function(){return r})),o.d(e,"mutations",(function(){return c})),o.d(e,"getters",(function(){return f})),o.d(e,"actions",(function(){return l}));var n=o(189),r=function(){return{globalPreview:!0,previewData:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",size:Object(n.a)(0,0)}}},c={previewData:function(t,e){t.previewData=e}},f={previewData:function(t){return t.previewData},globalPreview:function(t){return t.globalPreview}},l={setPreviewData:function(t,e){t.commit("previewData",e)}}}},[[208,5,2,6]]]);