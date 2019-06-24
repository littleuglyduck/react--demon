import React from 'react';
import "./index.less"

export default function MyButton(props) {
    /*这里看起来没有传标签内容，但是组件内包含的内容会挂载到组件的props.children上（标签内容也被当成子元素）*/
    /*这里*/
    return <button className='my-button' {...props} />
}
