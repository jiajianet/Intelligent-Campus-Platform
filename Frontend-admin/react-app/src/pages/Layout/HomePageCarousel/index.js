import './index.scss'
import React, {useState} from 'react';
import {DeleteTwoTone, InboxOutlined} from '@ant-design/icons';
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Dragger from "antd/es/upload/Dragger";
import {Divider} from "antd";

/**
 * @typedef {Object} FileItem
 * @property {string} uid - 文件的唯一标识
 * @property {string} name - 文件名
 * @property {string} status - 文件的上传状态（如 'uploading', 'done', 'error'）
 * @property {number} [percent] - 文件上传进度百分比（仅当 status 为 'uploading' 时存在）
 * @property {string} [url] - 文件上传成功后的访问 URL（仅当 status 为 'done' 时存在）
 * @property {string} [thumbUrl] - 文件的缩略图 URL（仅当 status 为 'done' 时存在）
 */

/**
 * @type {FileItem[]}
 */
const initialFileList = [{
    uid: '0', name: 'xxx.png', status: 'uploading', percent: 33,
}, {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}, {
    uid: '-2', name: 'zzz.png', status: 'error',
},];

/**
 * 可拖拽的上传列表项组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.originNode - 原始的上传列表项
 * @param {FileItem} props.file - 文件对象
 */
const DraggableUploadListItem = ({originNode, file}) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id: file.uid,
    });
    const style = {
        transform: CSS.Translate.toString(transform), transition, cursor: 'move',
    };
    return (<div
        ref={setNodeRef}
        style={style}
        // 防止拖拽结束时触发预览事件
        className={isDragging ? 'is-dragging' : ''}
        {...attributes}
        {...listeners}
    >
        {/* 拖拽时隐藏错误提示 */}
        {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>);
};

const HomePageCarousel = () => {
    const [fileList, setFileList] = useState(initialFileList);

    // 初始化拖拽传感器
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10, // 拖拽触发的最小距离
        },
    });

    // 拖拽结束时的回调
    const onDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex); // 重新排序文件列表
            });
        }
    };

    // 文件列表变化的回调
    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    // 上传组件的配置
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        listType: 'picture',
        fileList,
        onChange,
        itemRender: (originNode, file) => (<DraggableUploadListItem originNode={originNode} file={file}/>),
        showUploadList: {
            extra: ({size = 0}) => (<span style={{color: '#cccccc'}}>
          ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>),
            showPreviewIcon: true,
            previewIcon: 'eye-o',
            // showDownloadIcon: true,
            // downloadIcon: 'Download',
            showRemoveIcon: true,
            removeIcon: <DeleteTwoTone onClick={(e) => console.log(e, '删除成功')}/>,
        },
    };

    return (
        <div>
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
                        <p className="ant-upload-hint">
                            支持单次或批量上传。严禁上传公司数据或其他禁止的文件。
                        </p>
                    </Dragger>
                </SortableContext>
            </DndContext>
            {fileList.length === 0 ? (
                <Divider variant="dashed" style={{ borderColor: '#6d7aea' }} dashed>
                    请上传图片/视频
                </Divider>
            ) : (
                <Divider variant="dashed" style={{ borderColor: '#6d7aea' }} dashed>
                    以上是上传的文件列表，可支持拖拽排序
                </Divider>
            )}
        </div>
    );
};

export default HomePageCarousel;