import React,{ Component } from 'react';

import './index.less';
import { Form, Icon, Input, Button,  } from 'antd';

import logo from './logo.png';

const Item = Form.Item;



 class Login extends Component{

    login = (e) => {
        e.preventDefault();
        //用来检验表单并获取表单的值
        this.props.form.validateFields((error,value)=>{
           /* error 代表表单检验结果
                null校验通过
                {}检验失败
            */

            if(!error){
                //检验通过
                const {username,password} = value;

                //发送请求，请求登录
                console.log(username,password);

            }else{
                console.log('登录表单校验失败：',error);

            }
        })
    }

    //自定义校验规则函数
     validator = (rule,value,callback) =>{


        const name = rule.fullField === 'username'? '用户名':'密码';

        if(!value){
            callback(`必须输入${name}!`);
        }else if(value.length <4){
            callback(`${name}!必须大于四位`);
        }
        else if(value.length >15){
            callback(`${name}!必须小于15位`);
        } else if(/[a-zA-Z_0-9]+$/.test(value)){
            callback(`${name}只能包含英文字母，数字和下划线`);
        }else{
            callback();
        }
     }//
    //    不传参代表校验通过，传参嗲表校验失败



    render(){
        //get方法也是告诫组件
        const {getFieldDecorator } = this.props.form;

        return <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>React项目:后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form onSubmit={this.login} className="login-form">
                    <Item>
                        {
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
                                            validator:this.validator
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
}

//返回值是个包装组件 <Form(Login)><Login><Form(login)>
/*通过Form包装组件向login组件*/
export default Form.create()(Login);