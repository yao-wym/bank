HOST = "http://120.27.6.10:8349/";
HOST_API = HOST+"bank/api/i/";
HOST_USER = HOST_API+"user/";
HOST_ORDER = HOST_API+"order/";

USER_INFO_API = HOST_USER+"info"

//ORDER_LIST_API = HOST_ORDER+"list"

COMMENTS_LIST_API = HOST_USER+"comment_list"

GOODS_SEARCH_API = HOST_API+'parts/search_parts'

GOODS_OUT_API = HOST_API+'parts/parts_out'

GOODS_IN_API = HOST_API+'parts/parts_in'

GOODS_MINE_API = HOST_API+'parts/my_parts'

CHECK_LIST_API = HOST_API+'linplan_list'

LOGIN_API = HOST_API+'login'

//ORDER_WAIT_LIST_API = HOST_ORDER+'waiting_list'

STAFF_STORT_LIST_API = HOST_API+'stort/stort_and_engineer_list'

COMPONENT_POST_API = HOST_API+'parts/parts_out_to'

COMPONENT_RECIVE_SURE_API = HOST_API+'parts/sure_in'

COMPONENT_POST_SURE_API = HOST_API+'parts/sure_in'

ORDER_LIST_API = "http://120.27.6.10:8349/bank/api/i/order/list?status=2&page=1&size=10&account=huh&sid=123&token=123"

ORDER_WAIT_LIST_API = ORDER_LIST_API

TASK_UPDATE_API = HOST_API+'linupdate_task'

TASK_COMPLETE_API = HOST_API+'linfinish_plan'

TASK_CREATE_API = HOST_API+'i/order/dispatch'

ORDER_DETAIL_API = HOST_API+'order/detail'

ORDER_DETAIL_PROGRESS_API = HOST_API+'order/process'

ATM_STATUS_API = HOST_API+'atm/info'

IMG_UPLOAD_API = HOST_API+'image/upload'