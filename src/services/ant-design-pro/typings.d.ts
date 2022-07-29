/** @format */

declare namespace API {
    type CurrentUser = {
        id?: string;
        msg?: string;
        gid?: string;
        name?: string;
        cname?: string;
        email?: string;
        access?: string;
        status?: string;
        avatar?: string;
        ipaddress?: string;
        last_login?: string;
        unreadCount?: number;
        create_time?: string;
        info?: Record<string, any>;
    };

    type LoginResult = {
        msg?: string;
        type?: string;
        status?: number;
        success?: boolean;
        data?: {
            info?: {
                uid: string;
                gid: string;
                name: string;
                avatar?: string;
                authorization: string;
            };
        };
    };

    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type RuleListItem = {
        id?: number;
        key?: number;
        msg?: string;
        href?: string;
        name?: string;
        desc?: string;
        cname?: string;
        owner?: string;
        avatar?: string;
        callNo?: number;
        status?: number;
        progress?: number;
        updatedAt?: string;
        createdAt?: string;
        disabled?: boolean;
    };

    type RuleListResult = {
        total?: number;
        list?: any[];
    };

    type RuleList = {
        msg: string;
        path: string;
        status: number;
        method: string;
        success: boolean;
        data: RuleListResult;
    };

    type FakeCaptcha = {
        code?: number;
        status?: string;
    };

    type LoginParams = {
        name: string;
        password: string;
        autoLogin?: boolean;
        type?: string;
    };

    type ErrorResponse = {
        /** 业务约定的错误码 */
        errorCode: string;
        /** 业务上的错误信息 */
        errorMessage?: string;
        /** 业务上的请求是否成功 */
        success?: boolean;
    };

    type NoticeIconList = {
        data?: NoticeIconItem[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };

    type NoticeIconItemType = 'notification' | 'message' | 'event';

    type NoticeIconItem = {
        id?: string;
        extra?: string;
        key?: string;
        read?: boolean;
        avatar?: string;
        title?: string;
        status?: string;
        datetime?: string;
        description?: string;
        type?: NoticeIconItemType;
    };

    type setStatus = {
        id: number;
        status: number;
    };

    type uploadComponents = {
        formName: string;
        formTitle: string;
        fileSize?: number;
        maxUpload?: number;
        formLabel?: string;
        className?: string;
        multiple?: boolean;
        uploadUrl?: string;
        imageWidth?: number;
        acceptFile?: string;
        fileType?: string[];
        formTooltip?: string;
        imageHeight?: number;
        listType?: UploadListType;
        validateRules?: Record<string, any>[];
        extraData: { field: string; path: string };
        useTransForm?: (value: string | UploadFile[]) => Record<string, any>;
    };
}
