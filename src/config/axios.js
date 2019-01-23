import axios from 'axios';
import Vue from 'vue';
const { PREFIX } = process.env
import { operateStorage } from '../config/util';

export default class http {
    static handleSuccess(respond) {
        const { data, status } = respond
        if (status >= 200 && status < 400) {
            if (data.code === 25) {
                // operateStorage('token', 25)
                window.open('http://0010.94lang.com/client/login/index', '_self');
            } else if (data.code !== 0) {
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
        url = PREFIX + url;
        return axios.get(url, {params: data}).then(this.handleSuccess).catch(this.handleError)
    }
    static post(url, data, header) {
        url = PREFIX + url;
        return axios.post(url, data).then(this.handleSuccess).catch(this.handleError)
    }
    static getBlob(link, data = {}) {
        return axios.get(link, { params: data, responseType: 'blob' })
            .then(res => URL.createObjectURL(res.data))
    }
}

