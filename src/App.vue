

<script>
import { getRequest } from './utils/tool'  //eslint-disable-line
import config from './utils/config' //eslint-disable-line
export default {
  async created () {

  },
  onLaunch (opt) {

  },
  data () {
    return {
      showModal: true
    }
  },
  methods: {
  },
  mpType: 'app'
}
</script>

<style >
  .text-primary{
    color:#EA5A49;
  }
  .footer{
    text-align: center;
    color: #959595;
    font-size: 12px;
    margin: 6px 0;
  }
  .page-title{
    padding-left:20px;
    background-color: #eee; 
    font-size: 14px;
    line-height: 40px;
  }
  .right{
    float: right;
  }
  .btn{
    color: white;
    background-color: #EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px; 
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    width: 100%;
  }
  .btn:active{
    background-color: #fa5a49;
  }
</style>

