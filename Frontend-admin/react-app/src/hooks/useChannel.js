//封装获取频道列表逻辑
import { useState, useEffect } from 'react';
import { getChannelAPI } from '@/apis/article';


function useChannel() {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const res = await getChannelAPI();
                if (isMounted) {
                    setChannelList(res.data);
                }
            } catch (error) {
                console.error('获取频道失败:', error);
            }
        })()

        return () => {
            isMounted = false; // 组件卸载时，阻止 state 更新
        };
    }, [])
    return {
        channelList
    }
}

export { useChannel }