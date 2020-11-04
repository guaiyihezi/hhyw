<template>
  <div class="container-pic">
    <div class="box-images">
      <div class="box-coupon-text"><span>*</span>请添加图片</div>
      <div class="box-images-t">
        <div class="images-box" v-for="(item, index) in files" :key="index">
          <img :src="item.src" alt="" />
          <span class="file-remove" @click="remove(index)"></span>
        </div>
        <div class="images-box-fi" v-if="files.length < 3" @click="add">
          <img src="../../../assets/image/workorder-icon/cam.png" alt="" />
          <p>{{ files.length }}/3</p>
          <input type="file" @change="fileChange" ref="file" accept="image/jpg,image/png,image/jpeg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const OSS = require('ali-oss')
export default {
  name: 'upData-image',
  data() {
    return {
      status: 'ready',
      files: [],
      point: {},
      uploading: false,
      percent: 0,
      ImgUrl: [],
      fileUpload: '',
      imgFile: ''
    }
  },
  methods: {
    add() {
      this.$refs.file.click()
    },
    remove(index) {
      this.files.splice(index, 1)
      // console.log(this.files)
      this.ImgUrl.splice(index, 1)
      // console.log(this.ImgUrl)
    },
    fileChange(e) {
      const list = this.$refs.file.files
      const item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      let reader = new FileReader() //异步读取计算机文件信息
      let file = e.target.files[0]
      this.fileUpload = e.target.files[0]
      let name = e.target.files[0].name
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that.$set(item, 'src', e.target.result)
        that.files.push(item)
        // console.log(that.files)
        that.imgFile = e.target.result
        that.getImgToBase64(that.imgFile, function(data) {
          let myFile = that.dataURLtoFile(data, '/ss')
          // console.log(myFile)
          that.submit(myFile)
        })
      }

      this.$refs.file.value = ''
    },
    // 使用canvas压缩图片并转换base64
    getImgToBase64(url, callback) {
      //将图片转换为Base64并压缩
      var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image()
      img.crossOrigin = 'Anonymous' //表示允许跨域
      img.onload = function() {
        var width = img.width // 图片原始宽度
        var height = img.height // 图片原始长度
        // 宽高比例
        var scale = width / height
        var widthResult = 500
        var heightResult = parseInt(widthResult / scale)
        canvas.height = heightResult // 转换图片像素大小
        canvas.width = widthResult
        // 将图片的（0, 0）坐标到(0 + width , 0+ height)坐标也就是整张图片 画到 canvas（0, 0）到（widthResult，heightResult）也就是整个canvas内
        //drawImage是canvas绘制图案的API
        ctx.drawImage(img, 0, 0, width, height, 0, 0, widthResult, heightResult) //drawImage是canvas绘制图案的API
        let dataURL = canvas.toDataURL('image/png', 0.7) //通过canvas获取图片的base64的URL
        callback(dataURL)
        canvas = null
      }
      img.src = url
    },
    // base64转换文件
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), //base64解码JS API(还有一个JS API做base64转码：btoa())
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      //   return new File([u8arr], filename, { type: 'image/jpeg' });
      return new Blob([u8arr], {
        type: 'image/jpeg'
      })
    },
    guid() {
      //获取uuid
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    submit(imgfile) {
      //日期格式化
      let that = this
      Date.prototype.Format = function(fmt) {
        //author: meizz
        let o = {
          'M+': this.getMonth() + 1, //月份
          'd+': this.getDate(), //日
          'h+': this.getHours(), //小时
          'm+': this.getMinutes(), //分
          's+': this.getSeconds(), //秒
          'q+': Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        return fmt
      }
      let name = this.$parent.name
      let basePath = new Date().Format('yyyy/MM/dd/')
      // console.log(that.fileUpload)
      const client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: name.a,
        accessKeySecret: name.b,
        bucket: name.c,
        secure: true //是否开启HTTPS
      })
      client.multipartUpload('/workorderUser/' + that.guid() + that.fileUpload.name, imgfile).then(function(result) {
        // console.log(result.res.requestUrls)
        let ll = result.res.requestUrls
        that.ImgUrl.push(ll)
        // console.log(that.ImgUrl)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-pic {
  margin-top: 20px;
}
.box-images {
  margin-bottom: 40px;
  .box-coupon-text {
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(64, 64, 64, 1);
    margin-bottom: 21px;
    span {
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(236, 28, 25, 1);
      margin-right: 2px;
    }
  }
  .box-images-t {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .images-box {
      width: 80px;
      height: 80px;
      background: rgba(249, 249, 249, 1);
      border-radius: 2px;
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      img {
        width: 80px;
        height: 80px;
      }
      .file-remove {
        position: absolute;
        right: -6px;
        display: inline;
        top: -6px;
        width: 20px;
        height: 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        background: url(../../../assets/image/workorder-icon/close.png);
        background-size: 100%;
      }
    }
    .images-box-fi {
      width: 80px;
      height: 80px;
      border: 1px dotted rgba(85, 46, 32, 0.3);
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 30px;
        height: 24px;
      }
      p {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(187, 187, 187, 1);
        margin-top: 10px;
      }
      input[type='file'] {
        display: none;
      }
    }
  }
}
</style>
