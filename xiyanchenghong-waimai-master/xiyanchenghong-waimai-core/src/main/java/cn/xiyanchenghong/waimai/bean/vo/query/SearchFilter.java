package cn.xiyanchenghong.waimai.bean.vo.query;

import cn.xiyanchenghong.waimai.utils.Maps;
import cn.xiyanchenghong.waimai.utils.StringUtils;

import java.util.Map;

/**
 * descript
 *
 */
public class SearchFilter {
    public enum Operator {
        EQ, LIKE, GT, LT, GTE, LTE,IN,ISNULL,ISNOTNULL
    }

    public String fieldName;
    public Object value;
    public Operator operator;
    public  static SearchFilter build(String fieldName, Operator operator, Object value){
        return  new SearchFilter(fieldName,operator,value);
    }
    public  static SearchFilter build(String fieldName, Operator operator){
        return  new SearchFilter(fieldName,operator);
    }
    public SearchFilter(String fieldName, Operator operator) {
        this.fieldName = fieldName;
        this.operator = operator;
    }
    public SearchFilter(String fieldName, Operator operator, Object value) {
        if(!StringUtils.isNullOrEmpty(value)) {
            this.fieldName = fieldName;
            this.value = value;
            this.operator = operator;
        }
    }

    /**
     * searchParams中key的格式为OPERATOR_FIELDNAME
     */
    public static Map<String, SearchFilter> parse(Map<String, Object> searchParams) {
        Map<String, SearchFilter> filters = Maps.newHashMap();

        for (Map.Entry<String, Object> entry : searchParams.entrySet()) {
            // 过滤掉空值
            String key = entry.getKey();
            Object value = entry.getValue();
			/*if (StringUtils.isBlank((String) value)) {
				continue;
			}*/

            // 拆分operator与filedAttribute
            String[] names = StringUtils.split(key, "_");
            if (names.length != 2) {
                throw new IllegalArgumentException(key + " is not a valid search filter name");
            }
            String filedName = names[1];
            Operator operator = Operator.valueOf(names[0]);

            // 创建searchFilter
            SearchFilter filter = new SearchFilter(filedName, operator, value);
            filters.put(key, filter);
        }

        return filters;
    }
}
