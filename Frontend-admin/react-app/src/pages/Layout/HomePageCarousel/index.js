import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";

const HomePageCarousel = () => {
    return (
        <div>
            <Card
                title={<Breadcrumb items={[{ title: <Link to={'/'}><HomeOutlined />首页</Link> }, { title: '主页轮播图' },]} />}
                style={{ marginBottom: 20 }}
            ><h1>主页轮播图</h1>
            </Card>

        </div>
    );
};

export default HomePageCarousel;