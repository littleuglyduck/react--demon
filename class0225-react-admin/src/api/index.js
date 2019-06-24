/*再进一步简化ajax处理，把login跟请求方式写死，这样ajax就只需要传请求参数了*/
import ajax from './ajax';
// export const reqLogin = (data) => ajax('login',data,'post');
/*请求参数有3-4个时使用*/
// export const reqLogin = ({username,password}) => ajax('login',data,'post');
//请求参数1-2个时使用
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');