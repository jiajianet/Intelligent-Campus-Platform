import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

const CreateUser = () => {
    return <div>
        <Card title={<Breadcrumb
            items={[{title: <Link to={'/user'}><UserOutlined/>用户中心</Link>}, {title: '创建用户'},]}/>}
              style={{marginBottom: 20}}>
            <h1>Create User</h1>
        </Card>
    </div>;
};

export default CreateUser;