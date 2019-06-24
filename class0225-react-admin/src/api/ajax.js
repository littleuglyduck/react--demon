//统一地处理请求出错，之前的方式把路径跟请求方式写死了，不利于复用；（因为路径可能不是login，请求方式也可能不是get）;

import axios from 'axios';
import { message } from "antd";

export default function ajax(url,data = {}, method = 'GET') {  /*这里表示参数的赋值表示默认值*/

    let reqParams = data;

    method = method.toLowerCase();

    if(method === 'GET'){
        reqParams = {
            params:data
        }
    }

   return axios[method](url,reqParams)
        .then((res)=>{

            const {data} =res;

            if(data.status ===0){
                return data.data;
            }else{
                message.error(data.msg,2);
            }
        })
        .catch((error) =>{
            //请求失败：网络错误，服务器内部错误等
            message.error('网络出现异常，请刷新重试',2)
            /*重置密码为空*/
        })
}


