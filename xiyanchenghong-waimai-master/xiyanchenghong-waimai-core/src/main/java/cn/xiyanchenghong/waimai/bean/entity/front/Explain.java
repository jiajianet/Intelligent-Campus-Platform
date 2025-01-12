package cn.xiyanchenghong.waimai.bean.entity.front;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection = "explains")
public class Explain extends BaseMongoEntity{
    @Id
    private String _id;
    private Map<String,String> data;
    
}