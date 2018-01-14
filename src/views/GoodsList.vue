<template>
  <div>
    <my-header></my-header>
    <my-bread>
      <span>GoodList</span>
    </my-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click='sortGoods'>Price
            <span>{{sortFlag?'↑':'↓'}}</span>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showPrice">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="filter?'filterby-show':''">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" :class="priceChecked=='0'?'cur':''" @click='setPriceFilter(0)'>All</a>
              </dd>
              <dd v-for="item in price" :key="item.id">
                <a href="javascript:void(0)" @click='setPriceFilter(item.id)' :class="priceChecked==item.id?'cur':''">{{item.startprice}}-{{item.endprice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodList" :key="item.id">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'static/'+item.productImage" alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show='loadIng'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录，否则无法加入购物车
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <my-footer></my-footer>
  </div>
</template>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  export default {
    data () {
      return {
        goodList: [],
        priceChecked: 0,
        price: [{
          id: 1,
          startprice: 0,
          endprice: 100
        },
        {
          id: 2,
          startprice: 100,
          endprice: 500
        },
        {
          id: 3,
          startprice: 500,
          endprice: 1000
        },
        {
          id: 4,
          startprice: 1000,
          endprice: 5000
        }
        ],
        filter: false,
        sortFlag: true,
        page: 1,
        pageSize: 8,
        busy: true,
        loadIng: true,
        mdShow: false,
        mdShowCart: false
      }
    },
    created () {
      this.getGoodsList()
    },
    methods: {
      closeModal () {
        this.mdShow = false
        this.mdShowCart = false
      },
      showPrice () {
        this.filter = true
      },
      getGoodsList (flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        this.loadIng = true
        this.$ajax
          .get('/api/goods/list', {params: param})
          .then(response => {
            let res = response.data
            this.loadIng = false
            if (res.status === '0') {
              if (flag) {
                this.goodList = this.goodList.concat(res.result.list)
                if (res.result.count === 0) {
                  this.busy = true
                } else {
                  this.busy = false
                }
              } else {
                this.goodList = res.result.list
                this.busy = false
              }
            } else {
              this.goodsList = []
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      sortGoods () {
        this.sortFlag = !this.sortFlag
        this.page = 1
        this.getGoodsList()
      },
      setPriceFilter (index) {
        this.priceChecked = index
        this.filter = false
        this.page = 1
        this.getGoodsList()
      },
      loadMore () {
        this.busy = true
        setTimeout(() => {
          this.page++
          this.getGoodsList(true)
        }, 500)
      },
      addCart (productId) {
        this.$ajax.post('api/goods/addCart', {
          productId: productId
        }).then(res => {
          if (res.data.status === '0') {
            // window.alert('加入成功')
            this.mdShowCart = true
          } else {
            // window.alert('msg:' + res.data.msg)
            this.mdShow = true
          }
        })
      }
    }
  }
</script>
