<template>
  <div>
      <img :src="img" alt="" class="img">
  </div>
</template>

<script>
  import QRCodeImpl from 'qr.js/lib/QRCode';
  import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'

  export default {
    props: {
      value: {
        type: String,
        default: 'http://www.baidu.com'
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
        img: ''
      }
    },
    created() {
      this.qrRender()
    },
    methods: {
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
        if (this.type === 'img') {
          this.img = canvas.toDataURL('image/png')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .img {
        width: 200px;
    }
</style>
