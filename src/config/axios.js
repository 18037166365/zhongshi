import axios from 'axios';
import Vue from 'vue';

export default class http {
    static handleSuccess(respond) {
        const { data, status } = respond
            if (status >= 200 && status < 400) {
                if (!data.success) {
                    // alert(data.message);
                    console.log('data', data)
                    if(data.code !==0) {
                      this.handleError()
                      return data
                    }
                }
                return data
            } else {
              this.handleError()
            }
    }
    static handleError() {
        alert('网络错误');
        Vue.$vux.toast.text(data)
        return new Error()
    }
    static get(url, data, header) {
        return axios.get(url, {params: data}).then(this.handleSuccess).catch(this.handleError)
    }
    static post(url, data, header) {
        return axios.post(url, data).then(this.handleSuccess).catch(this.handleError)
    }
}

