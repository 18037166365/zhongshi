import axios from 'axios';
import Vue from 'vue';
const { PREFIX="" } = process.env
import { removeToken } from '../util/token';

export default class http {
    static handleSuccess(respond) {
        const { data, status } = respond
        // if (status >= 200 && status < 400) {
            if (data.code === 25) {
                removeToken()
                location.replace(process.env.REDIRECT_URL)
            } else if(data.code != 0) {
                Vue.$vux.toast.text(data.info)
            }
            return data
        // }
    }
    static handleError() {
        console.log('网络错误')
        // Vue.$vux.toast.text('网络错误')
        return new Error()
    }
    static get(url, data, header) {
        url = PREFIX + url;
        return axios.get(url, {params: data}).then(this.handleSuccess).catch(err=>this.handleError)
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

