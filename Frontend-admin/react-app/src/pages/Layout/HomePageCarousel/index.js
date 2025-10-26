import './index.scss'
import React from 'react';
import {DeleteTwoTone, EyeOutlined, InboxOutlined, HolderOutlined} from '@ant-design/icons';
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Dragger from "antd/es/upload/Dragger";
import {Carousel, Divider, Image, message} from "antd";
import {deleteFileAPI, uploadFileAPI} from "@/apis/file";
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

    // 封装一个统一的“从服务器获取文件列表”方法
    const {fileList, setFileList, refreshFileList} = useHomePageCarouselList();

    const sensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}});

    const onDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
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
                <Divider variant="dashed" className="dashed-divider" dashed>
                    请上传图片/视频
                </Divider>
            ) : (
                <>
                    <Divider variant="dashed" className="dashed-divider" dashed>
                        以下是上传的文件，可拖拽排序
                    </Divider>

                    <Carousel
                        arrows
                        autoplay
                        autoplaySpeed={2000}
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
                                                            <span style={{
                                                                color: '#fff',
                                                                fontSize: '16px',
                                                                letterSpacing: '0.1em',
                                                            }}>点击预览</span>
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
                </>
            )}
        </div>
    );
};

export default HomePageCarousel;
