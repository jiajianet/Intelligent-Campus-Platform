import {request} from "@/utils";

export const uploadFileAPI = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return request({
        url: '/user/files/upload',
        method: 'POST',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
    });

};

export const deleteFileAPI = (uid) => {
    return request({
        url: `/user/files/delete/${uid}`,
        method: 'DELETE',
    })
}

export const getFilesAPI = () => {
    return request({
        url: "/user/files/getFiles",
        method: "GET",
    });
};
