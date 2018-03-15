/**
 * @author zgd
 * 20170503
 * 通用主控制函数，所有页面js入口引入
 * 统一配置vue
 * 统一配置请求拦截器、响应拦截器
 * 
 */

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api'

// 请求前拦截器（添加tokenkey）
axios.interceptors.request.use(
    config => {
        //console.log('[config before]',config);
        if(config.url.indexOf(api.API_HOST) === -1){
        	config.url = api.API_HOST + config.url;
        }

        // 请求携带token
        var tokenkey = localStorage.getItem("tokenkey");//sessionStorage
        console.log('[config tokenkey]',tokenkey);
        console.log("vueex =======",tokenkey)
        if(tokenkey == null){  //手动清除缓存跳页面
            tokenkey = localStorage.setItem("tokenkey","")
            window.location.href = "./index.html"
            return 
        };

        if(config.method === "get"){
        	if(config.url.indexOf('?')>-1){
        		config.url = config.url + "&tokenkey=" + tokenkey;
        	}else{
        		config.url = config.url + "?tokenkey=" + tokenkey;
        	}
        }else if(config.method === "post"){
        	//console.log('[config post]',config.headers['Content-Type']);
        	if(config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('multipart/form-data')>-1)
        	{
        		// 文件上传
        		console.log('[config file upload]');
        	}
        	else{
        		console.log('[config config.data]')
        		if(!config.data){
        			config.data = '{}'
        		}
                if(typeof(config.data) === "string"){
        			var para = JSON.parse(config.data);
		        	para.tokenkey = tokenkey;
		        	config.data = JSON.stringify(para);
        		}else if(typeof(config.data) === "object"){
        			config.data.tokenkey = tokenkey
        		}
        		
        	}
        	
        }
        console.log('[config after]',config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => {
    	console.log('[interceptor res]',response);
    	if(response.data.errorCode == 99){
    		// token失效，授权失败
    		// localStorage.setItem("tokenkey","");
            localStorage.setItem("isLogin",0);
            localStorage.setItem("clickShowType","0")  
            localStorage.setItem("account","")  //设置推出帐号的样式显示
            localStorage.setItem("unread","0")
            window.location.href = "./index.html"
    	}
    	else{
    		return response;
    	}
    },
    error => {
        if (error.response) {
        	// 处理错误
            switch (error.response.status) {
                case 401:
                	// 返回 401 清除token信息并跳转到登录页面
                    // localStorage.setItem("tokenkey","");
                    localStorage.setItem("isLogin",0);
                    localStorage.setItem("clickShowType","0")  
                    localStorage.setItem("account","")  //设置推出帐号的样式显示
                    window.location.href = "./index.html";
                    break;
                case 404:
                	// 未找到
                	window.alert("接口不存在");
                    break;
                case 405:
                    // 方法不被允许
                	window.alert("用来访问本页面的 HTTP方法不被允许");
                    break;
            }
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    }
);
Vue.use(VueAxios, axios);

module.exports=Vue;
// 使之支持默认模块名
module.exports.default = Vue;