<template>
    <div class="bg" :style="{'min-height': height + 'px'}" >
        <div class="mask"></div>
        <div class="wrap">
        <i slot="icon" class="iconfont icon-icon-test" @click.stop="close"></i>
            <img :src="img" alt="" class="img">
            <div class="download">
                <img :src="img" alt="" class="cover">
                <span>长按该按钮保存到相册</span>
            </div>
            <!-- <a :href="img" download class="download" @click.prevent.stop="save">点击保存到相册</a> -->
        </div>
    </div>
</template>

<script>
    import QRCodeImpl from 'qr.js/lib/QRCode';
    import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel';
    const AVATAR = { width: 65, height: 65}
    const QR = { width: 180, height: 180}
    const CANVAS = {width: 320, height: 380}
    const AVATAT_OFFSET_LEFT = 20;
    const AVATAT_OFFSET_TOP = 20;
    import {
        getUserinfo, getBlob
    } from '../api'
    export default {
        mounted() {
            console.log('this.value: ', this.value)
        },
        props: {
            value: {
                type: String
            },
            size: {
                type: Number,
                default: 160
            },
            level: {
                type: String,
                default: 'L'
            },
            bgColor: {
                type: String,
                default: '#FFFFFF'
            },
            fgColor: {
                type: String,
                default: '#000000'
            },
            type: {
                type: String,
                default: 'img'
            }
        },
        data() {
            return {
                img: '',
                height: ''
            }
        },
        created() {
            this.$loading.show()
            this.height = document.documentElement.clientHeight;
            this.qrRender().then(qr => {
                if (!qr) return
                return this._getUserInfo(qr)
            }).then(_ => this.$loading.hide()).catch(_ => this.$loading.hide())
        },
        methods: {
            save() {
                console.log('save')
                location.href = this.img
                // location.replace(this.img, '_self')
            },
            close() {
                this.$emit('close')
            },
            qrRender() {
                const getBackingStorePixelRatio = function (ctx) {
                    return (
                        ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio ||
                        1
                    )
                }
                const utf16to8 = function (str) {
                    var out, i, len, c
                    out = ''
                    len = str.length
                    for (i = 0; i < len; i++) {
                        c = str.charCodeAt(i)
                        if ((c >= 0x0001) && (c <= 0x007F)) {
                            out += str.charAt(i)
                        } else if (c > 0x07FF) {
                            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
                            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
                            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
                        } else {
                            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
                            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
                        }
                    }
                    return out
                }
                const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level])
                qrcode.addData(utf16to8(this.value))
                qrcode.make()

                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const cells = qrcode.modules
                const tileW = this.size / cells.length
                const tileH = this.size / cells.length
                const scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)
                canvas.height = canvas.width = this.size * scale
                ctx.scale(scale, scale)
                cells.forEach((row, rdx) => {
                    row.forEach((cell, cdx) => {
                        ctx.fillStyle = cell ? this.fgColor : this.bgColor
                        const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
                        const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
                        ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
                    })
                })
                let img = document.createElement('img');
                img.src = canvas.toDataURL('image/png');
                img.width = QR.width;
                return new Promise((reslove, reject) => {
                    img.onload = _ => reslove(img)
                    img.onerror = e => reject()
                })
            },
            _getUserInfo(qr) {
                return getUserinfo().then(res => {
                    if (res.code === 0) {
                        let headImg = res.data.headimguri;
                        // headImg = headImg.replace('https://ss1.bdstatic.com', '/api');
                        let nickName = res.data.nickname;
                        return { headImg, nickName }
                    }
                }).then(o => {
                    if (!o) return
                    return getBlob(o.headImg).then(res => {
                        let img = document.createElement('img');
                        img.src = res;
                        img.width = AVATAR.width;
                        return new Promise((reslove, reject) => {
                            img.onload = _ => reslove({img, nickName: o.nickName})
                            img.onerror = e => reject()
                        })
                    })
                }).then(avatarObj => {
                    if (!avatarObj) return
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                    canvas.width = CANVAS.width;
                    canvas.height = CANVAS.height;
                    context.clearRect(0, 0, CANVAS.width, CANVAS.height);
                    context.fillStyle = '#fff';
                    context.fillRect(0,0,CANVAS.width,CANVAS.height)
                    context.font = "16px '微软雅黑' ";
                    context.fillStyle = '#000';
                    context.fillText(avatarObj.nickName, AVATAR.width + AVATAT_OFFSET_LEFT + 20 ,AVATAT_OFFSET_TOP + AVATAR.height / 2 + 8);
                    context.textAlign = 'center';
                    context.fillText('扫描上方二维码,购买中食旅游年卡', CANVAS.width / 2 , CANVAS.height - 20 );
                    context.drawImage(avatarObj.img, AVATAT_OFFSET_LEFT, AVATAT_OFFSET_TOP, AVATAR.width, AVATAR.height);
                    context.drawImage(qr, (CANVAS.width - QR.width) / 2, 135, QR.width, QR.height);
                    this.img = canvas.toDataURL('image/png');

                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        &::after {
            display: inline-block;
            height: 100%;
            content: ' ';
            width: 0;
            vertical-align: middle;
        }
        .wrap {
            display: inline-block;
            background: #fff;
            width: 80%;
            vertical-align: middle;
            border-radius: 5px;
            position: relative;
            margin-top: -50px;
            i {
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 20px;
            }
        }
        .img {
            width: 100%;
        }
        .tip {
            font-size: 14px;
            text-align: center;
            color: #888;
        }
        .download {
            position: relative;
            margin: 20px;
            display: inline-block;
            color: #fff;
            font-size: 14px;
            padding: 10px 20px;
            background: #6a8ff6;
            border-radius: 5px;
            border: 1px solid #fff;
            overflow: hidden;
            .cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                opacity: 0;
            }
        }
    }

</style>
