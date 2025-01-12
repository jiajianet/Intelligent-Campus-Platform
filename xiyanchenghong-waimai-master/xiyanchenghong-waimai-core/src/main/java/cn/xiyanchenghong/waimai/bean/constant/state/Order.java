package cn.xiyanchenghong.waimai.bean.constant.state;

/**
 * 数据库排序
 *
 * @Author xiyanchenghong
 */
public enum Order {

    ASC("asc"), DESC("desc");

    private String des;

    Order(String des) {
        this.des = des;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }
}
