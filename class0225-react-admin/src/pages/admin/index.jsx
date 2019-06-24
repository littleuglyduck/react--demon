import React,{ Component } from 'react';
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';

const { Header, Content, Footer, Sider } = Layout;
//submenu是二级菜单，menu是一级菜单

export default class Admin extends Component {

        state = {
            collapsed: false,/*导航条展开的状态值*/
        };

        onCollapse = collapsed => {
            console.log(collapsed);
            this.setState({collapsed});/*这里collpased是表示true吗？*/
        };
    render() {
        const { collapsed } = this.state;

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>{/*传给left-nav状态值*/}
                    <LeftNav collapsed={collapsed}/>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0 ,minHeight:110}}>
                        <HeaderMain/>
                    </Header>
                    <Content style={{margin: '30px 16px'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>欢迎使用硅谷后台管理系统</div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>使用谷歌浏览器体验更佳</Footer>
                </Layout>
            </Layout>
        );
    }
}