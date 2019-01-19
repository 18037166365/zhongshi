import axios from 'axios';
import Vue from 'vue';

export default class http {
    static handleSuccess(respond) {
        const { data, status } = respond
        if (status >= 200 && status < 400) {
            if (data.code !== 0) {
                Vue.$vux.toast.text(data.info)
            }
            return data
        } else {
            this.handleError()
        }
    }
    static handleError() {
        Vue.$vux.toast.text('网络错误')
        return new Error()
    }
    static get(url, data, header) {
        return axios.get(url, {params: data}).then(this.handleSuccess).catch(this.handleError)
    }
    static post(url, data, header) {
        return axios.post(url, data).then(this.handleSuccess).catch(this.handleError)
    }
}

