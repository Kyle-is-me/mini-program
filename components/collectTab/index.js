// components/collectTab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList:{
      type:Array,
      value:[]
    },
    currentIndex:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSendMsg(e){
      const {index}=e.target.dataset
      console.log(1)
      this.triggerEvent('getIndex',{index})
    }
  }
})
