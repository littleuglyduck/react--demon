import React,{Component } from 'react';
import {Icon,Menu} from 'antd';
import {Link,withRouter} from 'react-router-dom';
import './index.less';
import logo from '../../assets/images/logo.png';

import menuList from '../../config/menu-config';

import PropTypes from 'prop-types';


const {SubMenu,Item} = Menu;    /*这里从里面拿出来是什么意思？*/



class LeftNav extends Component {
    static  propTypes = {
        collapsed:PropTypes.bool.isRequired
    }

    createMenu = (menu) => {
       return <Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type ="menu.icon" />
                <span>{menu.title}</span>
            </Link>
        </Item>

    }

    componentWillMount() {

        const {pathname} = this.props.location;

       this.menus =  menuList.map((menu,index)=>{        /*这里传入的为什么是menu而不是item*/
            //判断是否发是一级还是二级菜单
            const children = menu.children;
            if(children){
                //二级菜单
              return  <SubMenu
                    key={menu.key}
                    title={
                        <span>
                  <Icon type="menu.icon" />
                  <span>{menu.title}</span>
                </span>
                    }
                >
                  {
                      children.map((item)=> {

                          if(item.key === pathname){

                              /*根据路径决定要展开哪个菜单*/
                              this.openkey= menu.key;

                          }

                        return this.createMenu(item)
                      })
                  }
                </SubMenu>;
            }else {
                return this.createMenu(menu);
            }
        })
        /*初始化选中的菜单（刷新页面后选中的主菜单）*/
        this.selectedKey = pathname;
    }



    render(){
        const {collapsed} = this.props;


        return <div>
            <Link className="left-nav-logo" to="/home">
                <img src={logo} alt="logo"/>
                <h1 style={{display:collapsed ? "none":'block'}}>硅谷后台</h1>{/*让logo部分内容随着左边导航栏展开状态而变化（收缩）*/}
            </Link>
            <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openkey]} mode="inline">{/*这里defauxxx表示刷新后默认选中的选项*/}
               {/* <Item key="/home">
                    <Link to="/home">
                        <Icon type="home" />
                        <span>首页</span>
                    </Link>
                </Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
                    }
                >
                    <Item key="/category">
                        <Link to='/category'>
                            <Icon type="bars" />
                            <span>品类管理</span>
                        </Link>
                    </Item>
                    <Item key="4">
                        <Icon type="tool" />
                        <span>商品管理</span>
                    </Item>
                </SubMenu>
                <Item key="5">
                    <Icon type="user" />
                    <span>用户管理</span>
                </Item>
                <Item key="6">
                    <Icon type="user" />
                    <span>权限管理</span>
                </Item>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                  <Icon type="team"/>
                  <span>图形图表</span>
                </span>
                    }
                >
                    <Item key="7">
                        <Icon type="line-chart" />
                        <span>线型图</span>
                    </Item>
                    <Item key="8">
                        <Icon type="bar-chart" />
                        <span>柱形图</span>
                    </Item>
                    <Item key="9">
                        <Icon type="pie-chart" />
                        <span>饼图</span>
                    </Item>
                </SubMenu>
                <Item key="9">
                    <Icon type="file"/>
                    <span>File</span>
                </Item>*/}
                {
                    this.menus
                }
            </Menu>
        </div>
    }
}

//withRouter是一个高阶组件，向非路由组件传递三大属性：history,location,match
export default withRouter(LeftNav);

