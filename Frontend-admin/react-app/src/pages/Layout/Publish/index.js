import {
    Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message
} from 'antd'
import ReactQuill from 'react-quill'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleDetailAPI, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    const { channelList } = useChannel()
    const navigate = useNavigate()

    //提交表单
    const onFinish = (formValue) => {
        console.log(formValue)
        if (imageType === 1 && image.length !== 1) return message.warning('请上传正确数量的图片')

        const { title, content, channelId } = formValue
        //组装数据
        const reqData = {
            title, content, cover: {
                type: imageType,//当前封面模式
                image: image.length > 0 ? image[0].response ? image[0].response.data.url : image[0].url : null
            }, channelId
        };
        //调用接口
        if (articleId) {
            updateArticleAPI({ ...reqData, id: articleId })
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
                    const { cover } = articleData;
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

                    setImage(imageData ? [{ url: imageData }] : []);
                } catch (error) {
                    console.error('获取文章详情失败:', error);
                }
            }

            getArticleDetail();
        } else {
            console.log("无文章id，为新建文章");
        }
    }, [articleId, form]);
    return (<div className="publish">
        <Card
            title={<Breadcrumb
                items={[{ title: <Link to={'/'}>首页</Link> }, { title: `${articleId ? '编辑' : '发布'}文章` },]}
            />}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ type: 0 }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入文章标题' }]}
                >
                    <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                </Form.Item>

                <Form.Item
                    label="频道"
                    name="channelId"
                    rules={[{ required: true, message: '请选择文章频道' }]}
                >
                    <Select placeholder="请选择文章频道" style={{ width: 400 }}>

                        {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="封面">
                    <Form.Item name="type">
                        <Radio.Group onChange={onTypeChange}>
                            <Radio value={1}>单图</Radio>
                            <Radio value={0}>无图</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* 决定选择文件框 显示控制上传列表 */}
                    {imageType > 0 && <Upload
                        listType="picture-card"
                        showUploadList
                        action={'http://111.230.253.94:8081/user/upload'}
                        name='image'
                        onChange={onChange}
                        maxCount={imageType}
                        fileList={image}
                    >
                        <div style={{ marginTop: 8 }}>
                            <PlusOutlined />
                        </div>
                    </Upload>}

                </Form.Item>
                <Form.Item
                    label="内容"
                    name="content"
                    rules={[{ required: true, message: '请输入文章内容' }]}
                >
                    {/* 这里使用ReactQuill编辑器 */}
                    <ReactQuill
                        className="publish-quill"
                        theme="snow"
                        placeholder="请输入文章内容"
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button size="large" type="primary" htmlType="submit">
                            发布文章
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    </div>)
}

export default Publish