import './index.scss'
import React from 'react';
import {DeleteTwoTone, EyeOutlined, InboxOutlined, HolderOutlined, HomeOutlined, FileTextOutlined} from '@ant-design/icons';
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Dragger from "antd/es/upload/Dragger";
import {Breadcrumb, Carousel, Divider, Image, message} from "antd";
import {Link} from "react-router-dom";
import {deleteFileAPI, reorderFilesAPI, uploadFileAPI} from "@/apis/file";
import {useHomePageCarouselList} from "@/hooks/useHomePageCarouselList";

const isVideo = (file) => {
    return file.type?.startsWith('video/') ||
        file.name?.endsWith('.mp4') ||
        file.name?.endsWith('.webm') ||
        file.name?.endsWith('.mov');
};

const DraggableUploadListItem = ({originNode, file}) => {
    const {setNodeRef, transform, transition, isDragging, attributes, listeners} = useSortable({
        id: file.uid,
    });
    const style = {
        transform: CSS.Translate.toString(transform), transition,
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`draggable-upload-list-item ${isDragging ? 'is-dragging' : ''}`}
        >

            <div className="draggable-item-content">
                <HolderOutlined
                    className="drag-handle"
                    {...attributes}
                    {...listeners}
                />
                <div style={{flexGrow: 1, minWidth: 0}}>
                    {file.status === 'error' && isDragging ? originNode.props.children : originNode}
                </div>
            </div>
        </div>
    );
};

const HomePageCarousel = () => {

    // 封装一个统一的"从服务器获取文件列表"方法
    const {fileList, setFileList, refreshFileList} = useHomePageCarouselList();

    const sensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}});

    const onDragEnd = async ({active, over}) => {
        if (active.id !== over?.id) {
            const newFileList = arrayMove(
                fileList,
                fileList.findIndex((item) => item.uid === active.id),
                fileList.findIndex((item) => item.uid === over?.id)
            );

            setFileList(newFileList);

            //新的UID顺序列表
            const newUidsOrder = newFileList.map(file => file.uid);

            try{
                await reorderFilesAPI(newUidsOrder);
                message.success('文件顺序更新成功!');

            } catch (error) {
                console.error('文件顺序更新失败:', error);
                message.error('文件顺序更新失败');
                //避免数据不一致
                await reorderFilesAPI();
            }

        }
    };

    const onChange = ({fileList: newFileList}) => setFileList(newFileList);

    const customRequest = async ({file, onSuccess, onError}) => {
        try {
            await uploadFileAPI(file);
            message.success(`${file.name} 上传成功`);
            onSuccess({}, file);
            // 上传成功后重新从数据库获取最新列表
            await refreshFileList();
        } catch (err) {
            console.error("上传失败:", err);
            message.error(`${file.name} 上传失败`);
            onError(err);
        }
    };

    const props = {
        name: 'file',
        multiple: true,
        customRequest,
        listType: 'picture',
        fileList,
        onChange,
        onRemove: async (file) => {
            try {
                await deleteFileAPI(file.uid);
                setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
                message.success(`删除成功: ${file.name}`);
                // 删除后也刷新数据库
                await refreshFileList();
            } catch (err) {
                console.error('删除失败:', err);
                message.error('删除失败');
            }
        },
        itemRender: (originNode, file) => (<DraggableUploadListItem originNode={originNode} file={file}/>),
        showUploadList: {
            extra: ({size = 0}) => (
                <span style={{color: '#cccccc'}}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
            ),
            showPreviewIcon: true,
            previewIcon: <EyeOutlined/>,
            showRemoveIcon: true,
            removeIcon: <DeleteTwoTone/>,
        },
    };

    const uploadedFiles = fileList.filter(file => file.status === 'done');

    return (
        <div className="homepage-carousel-wrapper">
            {/* Breadcrumb */}
            <div className="page-header">
                <Breadcrumb
                    items={[
                        { title: <Link to="/homePageCarousel"><HomeOutlined /> 首页</Link> },
                        { title: <><FileTextOutlined /> 系统管理</> },
                        { title: '首页轮播管理' }
                    ]}
                />
            </div>

            {/* 页面标题 */}
            <div className="page-title-section">
                <h1>首页轮播管理</h1>
                <p>上传和管理首页轮播图片及视频</p>
            </div>

            {/* 上传区域卡片 */}
            <div className="content-card">
                <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                    <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
                            <p className="ant-upload-hint">
                                支持单次或批量上传图片和视频文件，系统将自动优化展示效果
                            </p>
                        </Dragger>
                    </SortableContext>
                </DndContext>
            </div>

            {/* 轮播预览区域 */}
            {fileList.length === 0 ? (
                <div className="content-card">
                    <div className="empty-state">
                        <div className="empty-icon">
                            <InboxOutlined />
                        </div>
                        <div className="empty-title">暂无轮播内容</div>
                        <div className="empty-desc">请上传图片或视频文件以创建轮播展示</div>
                    </div>
                </div>
            ) : (
                <div className="content-card">
                    <Divider variant="dashed" className="dashed-divider" data-content="轮播预览" dashed />

                    <Carousel
                        arrows
                        autoplay
                        autoplaySpeed={3000}
                        infinite
                        className="home-carousel-container"
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
                                                    preview={{
                                                        mask: (
                                                            <span>点击预览</span>
                                                        ),
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
};

export default HomePageCarousel;
