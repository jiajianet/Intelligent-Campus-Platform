import {Breadcrumb, Card} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

const UserList = () => {
  return (
    <div>
        <Card
            title={<Breadcrumb items={[{ title: <Link to={'/user'}><UserOutlined />用户中心</Link> }, { title: '用户列表' },]} />}
            style={{ marginBottom: 20 }}
        ><h1>User List</h1>
        </Card>

    </div>
  );
};

export default UserList;