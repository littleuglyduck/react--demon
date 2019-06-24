import React,{ Component } from 'react';
import {reqLogin} from '../../api';
import './index.less';
import { Form, Icon, Input, Button} from 'antd';

import logo from '../../assets/images/logo.png';

const Item = Form.Item;


/*在工厂函数中父组件传给子组件的数据都在函数形参props中*/
 function Login(props) {


    const login = (e) => {
         e.preventDefault();
         //用来检验表单并获取表单的值
         props.form.validateFields(async (error, values) => {
             /* error 代表表单检验结果
                  null校验通过
                  {}检验失败
              */

             if (!error) {
                 //检验通过
                 const {username, password} = values;

                 //发送请求，请求登录
                 // axios.post('./login',{username,password})
                 /*.then((res)=>{

                     const {data} =res;
                     console.log(data);

                     if(data.status ===0){
                         //请求成功，跳转到主页面Ad'min
                         {/!*<Redirect to ="/" 推荐使用在render方法中*!/}
                         {/!*this.props.history.push('/') 推荐使用在回调函数中*!/}

                         this.props.history.replace('/');
                     }else{

                         message.error(data.msg,2);

                         //重置密码为空
                         this.props.form.resetFields(['password']);
                     }
                 })*/
                 /*  .catch((error) =>{
                       //请求失败：网络错误，服务器内部错误等
                       message.error('网络出现异常，请刷新重试',2)
                       /!*重置密码为空*!/
                    this.props.form.resetFields(['password']);
                   })*/


                 const result = await reqLogin(username, password);

                 if (result) {
                     props.history.replace('/');

                 } else {
                     props.form.resetFields(['password']);
                 }


             } else {
                 console.log('登录表单校验失败：', error);

             }
         })
     };

    //校验规则函数有两种方式
    //一种是自定义校验规则函数
    const  validator = (rule,value,callback) =>{


        const name = rule.fullField === 'username'? '用户名':'密码';

        if(!value){
            callback(`必须输入${name}!`);
        }else if(value.length <4){
            callback(`${name}!必须大于四位`);
        }
        else if(value.length >15){
            callback(`${name}!必须小于15位`);
        } else if(!/[a-zA-Z_0-9]+$/.test(value)){
            callback(`${name}只能包含英文字母，数字和下划线`);
        }else{
            callback();
        }
     }//
    //    不传参代表校验通过，传参代表校验失败




        //get方法也是高阶组件
        const {getFieldDecorator } = props.form;

        return <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>React项目:后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form onSubmit={login} className="login-form">
                    <Item>
                        {
                            /*高阶函数的方式*/
                            getFieldDecorator(
                                'username',
                                {
                                    rules:[
                                        {required:true,message:'请输入用户名'},
                                        {min:4,message:'用户名必须大于4位'},
                                        {max:15,message:'用户名必须小于15位'},
                                        {pattern:/[a-zA-Z_0-9]+$/,message:'用户名只能包含英文字母，数字和下划线'}

                                    ]
                                }
                            )(
                            <Input className="login-input" prefix={<Icon type="user" />} placeholder='用户名'/>
                            )
                        }

                    </Item>
                    <Item>
                        {
                            getFieldDecorator(
                                'password',
                                {
                                    rules:[
                                        {
                                            validator:validator
                                        }
                                    ]
                                }
                            )(
                                <Input className="login-input" prefix={<Icon type="lock" />}  placeholeder='密码'/>
                            )
                        }

                    </Item>
                    <Item>
                        <Button className="login-btn" type="primary" htmlType="submit">登录</Button>
                    </Item>
                </Form>
            </section>
        </div>

}

//返回值是个包装组件 <Form(Login)><Login><Form(login)>
/*通过Form包装组件向login组件*/
export default Form.create()(Login);