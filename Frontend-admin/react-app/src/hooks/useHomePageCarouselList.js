import {useCallback, useEffect, useState} from "react";
import {getFilesAPI} from "@/apis/file";

/**
 * 封装文件列表状态管理和从服务器获取数据的逻辑
 * @returns {{
 * fileList: Array,
 * setFileList: Function,
 *
 * refreshFileList: Function
 * }} 包含文件列表，设置函数和刷新函数的对象
 */

function useHomePageCarouselList() {
    const [fileList, setFileList] = useState([]);

    //封装统一的刷新文件列表的函数，并作为Hook返回值的一部分
    const refreshFileList = useCallback(async () => {
        try {
            const res = await getFilesAPI();

            if (res.data?.data) {
                const formatted = res.data.data.map((file) => ({
                    uid: file.uid || file.id || file.name,
                    name: file.name,
                    url: file.url,
                    status: 'done',
                    type: file.type,
                    thumbUrl: file.thumbUrl,
                    size: file.size,
                }));
                setFileList(formatted);
            }

        } catch (error) {
            console.error("获取文件失败：", error);
        }
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            await refreshFileList();
        };
        fetchData().catch(error =>{
            console.error("孤立的 Promise 错误：", error);
        });

    }, [refreshFileList]);

    return {fileList, setFileList, refreshFileList};

}

export {useHomePageCarouselList};