import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            goodName: state => state.detail.detailInfo.name,
            goodBrief: state => state.detail.detailInfo.goods_brief,
            goodPhotothumb: state => state.detail.detailInfo.thumb,
            shareUrl: state => state.detail.detailInfo.share_url
        }),
        brief() {
            return '换换商城 ' + (this.goodBrief || this.goodName)
        }
    },
    methods:{
        share() {
            this.hhApp.share(
                this.brief,
                this.goodPhotothumb,
                'all',
                'hh-productDetal-share',
                this.goodName,
                encodeURIComponent(this.shareUrl),
                '商品分享'
            )
        }
    }
}