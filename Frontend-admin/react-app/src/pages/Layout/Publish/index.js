import {
    Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message, Divider
} from 'antd'
import ReactQuill from 'react-quill'
import {PlusOutlined, ArrowLeftOutlined, SaveOutlined, EyeOutlined} from '@ant-design/icons'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import {useEffect, useState} from 'react'
import {createArticleAPI, getArticleDetailAPI, updateArticleAPI, uploadImageAPI} from '@/apis/article'
import {useChannel} from '@/hooks/useChannel'

const {Option} = Select

const Publish = () => {
    const {channelList} = useChannel()
    const navigate = useNavigate()

    //提交表单
    const onFinish = (formValue) => {
        console.log(formValue)
        if (imageType === 1 && image.length !== 1) return message.warning('请上传正确数量的图片')

        const {title, content, channelId} = formValue
        //组装数据
        const reqData = {
            title, content, cover: {
                type: imageType,//当前封面模式
                image: image.length > 0 ? image[0].response ? image[0].response.data.url : image[0].url : null
            }, channelId
        };
        //调用接口
        if (articleId) {
            updateArticleAPI({...reqData, id: articleId})
                .then(res => {
                    console.log(res)
                    message.success('文章更新成功！')
                    navigate('/article')
                })
                .catch(error => {
                    console.error('更新文章失败:', error)
                    message.error('更新文章失败，请重试')
                })

        } else {
            createArticleAPI(reqData)
                .then(res => {
                    console.log(res)
                    message.success('文章发布成功！')
                    navigate('/article')

                })
                .catch(error => {
                    console.error('发布文章失败:', error);
                    message.error('发布文章失败，请重试')

                })
        }


    }

    //上传图片
    const [image, setImage] = useState([])
    const onChange = (value) => {
        setImage(value.fileList)
    }

    //自定义上传
    const customUpload = async (options) => {
        const {file, onProgress, onError, onSuccess} = options;
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await uploadImageAPI(formData, (progressEvent) => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress({percent});
            })

            onSuccess({
                data: {
                    url: res.data.data.url,
                }
            });
        } catch (error) {
            onError(error);
        }

    }

    //选择封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }

    //回填数据
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('id');
    const [form] = Form.useForm()//获取实例
    useEffect(() => {
        if (articleId) {
            async function getArticleDetail() {
                try {
                    const res = await getArticleDetailAPI(articleId);
                    const articleData = res.data.data;
                    const {cover} = articleData;
                    form.setFieldsValue({
                        ...articleData, type: cover.type,
                    });

                    setImageType(cover.type)

                    let imageData = cover.image;

                    if (!imageData) {
                        imageData = null; // 没有图片时，设为 null
                    } else if (Array.isArray(imageData) && imageData.length > 0) {
                        imageData = imageData[0]; // 取第一张图片
                    }

                    setImage(imageData ? [{url: imageData}] : []);
                } catch (error) {
                    console.error('获取文章详情失败:', error);
                }
            }

            getArticleDetail();
        } else {
            console.log("无文章id，为新建文章");
        }
    }, [articleId, form]);
    
    const handleCancel = () => {
        navigate('/article');
    };
    
    return (
        <div className="publish">
            <div className="publish-header">
                <Breadcrumb
                    items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: <Link to={'/article'}>文章管理</Link>},
                        {title: `${articleId ? '编辑' : '发布'}文章`},
                    ]}
                />
            </div>
            
            <Card className="publish-card">
                <div className="publish-card-header">
                    <h2 className="publish-title">{articleId ? '编辑文章' : '发布文章'}</h2>
                    <p className="publish-subtitle">{articleId ? '修改现有文章内容' : '创建新的文章'}</p>
                </div>
                
                <Divider className="publish-divider" />
                
                <Form
                    layout="vertical"
                    initialValues={{type: 0}}
                    onFinish={onFinish}
                    form={form}
                    className="publish-form"
                >
                    <div className="form-row">
                        <Form.Item
                            label="文章标题"
                            name="title"
                            rules={[{required: true, message: '请输入文章标题'}]}
                            className="form-item"
                        >
                            <Input placeholder="请输入文章标题" className="form-input" />
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item
                            label="文章频道"
                            name="channelId"
                            rules={[{required: true, message: '请选择文章频道'}]}
                            className="form-item"
                        >
                            <Select placeholder="请选择文章频道" className="form-select">
                                {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item label="封面设置" className="form-item">
                            <div className="cover-section">
                                <Form.Item name="type" className="cover-type">
                                    <Radio.Group onChange={onTypeChange} className="radio-group">
                                        <Radio value={0}>无图</Radio>
                                        <Radio value={1}>单图</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                
                                {imageType > 0 && (
                                    <div className="upload-section">
                                        <Upload
                                            listType="picture-card"
                                            showUploadList
                                            name='image'
                                            onChange={onChange}
                                            maxCount={imageType}
                                            fileList={image}
                                            customRequest={customUpload}
                                            className="upload-component"
                                        >
                                            <div className="upload-button">
                                                <PlusOutlined className="upload-icon" />
                                                <div className="upload-text">上传图片</div>
                                            </div>
                                        </Upload>
                                        <p className="upload-hint">建议上传尺寸适中的图片，以获得最佳显示效果</p>
                                    </div>
                                )}
                            </div>
                        </Form.Item>
                    </div>
                    
                    <div className="form-row">
                        <Form.Item
                            label="文章内容"
                            name="content"
                            rules={[{required: true, message: '请输入文章内容'}]}
                            className="form-item"
                        >
                            {/* 这里使用ReactQuill编辑器 */}
                            <ReactQuill
                                className="publish-quill"
                                theme="snow"
                                placeholder="请输入文章内容"
                            />
                        </Form.Item>
                    </div>

                    <div className="form-actions">
                        <Space className="action-buttons">
                            <Button 
                                size="large" 
                                onClick={handleCancel}
                                icon={<ArrowLeftOutlined />}
                                className="cancel-button"
                            >
                                返回列表
                            </Button>
                            <Button 
                                size="large" 
                                type="primary" 
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                className="submit-button"
                            >
                                {articleId ? '更新文章' : '发布文章'}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default Publish