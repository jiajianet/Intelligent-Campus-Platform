import { request } from '@/utils';

export function chatWithAssistantAPI(data) {
    return request({
        url: '/user/ai/chat',
        method: 'POST',
        data
    });
}

export function getAssistantHistoryAPI(sessionId) {
    return request({
        url: `/user/ai/session/${sessionId}/history`,
        method: 'GET'
    });
}
