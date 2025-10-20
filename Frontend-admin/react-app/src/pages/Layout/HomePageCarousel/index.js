import './index.scss'
import React, {useState} from 'react';
import {DeleteTwoTone, EyeOutlined, InboxOutlined} from '@ant-design/icons';
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Dragger from "antd/es/upload/Dragger";
import {Carousel, Divider, Image} from "antd";

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

const initialFileList = [
    {
        uid: '0', name: 'xxx.png', status: 'uploading', percent: 33,
    },
    {
        uid: '1',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '3',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },

    {
        uid: '-2', name: 'zzz.png', status: 'error',
    },];

// 判断文件类型
const isVideo = (file) => {
    return file.type?.startsWith('video/') ||
        file.name?.endsWith('.mp4') ||
        file.name?.endsWith('.webm') ||
        file.name?.endsWith('.mov');
};

// // 判断文件大小
// const isTooLarge = (file) => {
//     return file.size > 10 * 1024 * 1024; // 10MB
// };

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
        action: 'http://localhost:8081/user/files/upload',
        listType: 'picture',
        fileList,
        onChange,
        itemRender: (originNode, file) => (<DraggableUploadListItem originNode={originNode} file={file}/>),
        showUploadList: {
            extra: ({size = 0}) => (<span style={{color: '#cccccc'}}>
          ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>),
            showPreviewIcon: true,
            previewIcon: <EyeOutlined />,
            showRemoveIcon: true,
            removeIcon: <DeleteTwoTone onClick={(e) => console.log(e, '删除成功')}/>,
        },
    };

    // 过滤出已上传的文件`
    const uploadedFiles = fileList.filter(file => file.status === 'done');

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
                <Divider variant="dashed" style={{borderColor: '#6d7aea'}} dashed>
                    请上传图片/视频
                </Divider>
            ) : (
                <>
                    <Divider variant="dashed" style={{borderColor: '#6d7aea'}} dashed>
                        以上是上传的文件列表，可支持拖拽排序
                    </Divider>

                    <Carousel
                        arrows
                        autoplay
                        autoplaySpeed={1500}
                        infinite
                        style={{
                            maxWidth: '1200px',
                            margin: '0 auto',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}
                    >
                        {uploadedFiles.map((file) => (
                            <div key={file.uid}>
                                <div className="carousel-item">
                                    <div className="media-container">
                                        {isVideo(file) ? (
                                            <>
                                                <span className="type-badge">视频</span>
                                                <video
                                                    controls
                                                    style={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        filter: 'brightness(0.95)'
                                                    }}
                                                    poster={file.poster}
                                                >
                                                    <source src={file.url} type={file.type || 'video/mp4'}/>
                                                    <div className="error-placeholder">无法播放视频</div>
                                                </video>
                                            </>

                                        ) : (
                                            <>
                                                <span className="type-badge">图片</span>
                                                <Image
                                                    src={file.url || file.thumbUrl}
                                                    alt={file.name}
                                                    style={{
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        objectFit: 'contain'
                                                    }}
                                                    preview={{
                                                        mask: <span style={{
                                                            color: '#fff',
                                                            fontSize: '16px',
                                                            letterSpacing: '0.1em'
                                                        }}>点击预览</span>
                                                    }}
                                                />
                                            </>

                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </>

            )}
        </div>
    );
};

export default HomePageCarousel;