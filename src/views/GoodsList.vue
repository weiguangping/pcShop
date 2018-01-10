<template>
    <div>
      <my-header></my-header>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>Goods</span>
          </nav>
        </div>
      </div>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showPrice">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="filter?'filterby-show':''">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="priceChecked=='0'?'cur':''" @click='priceClick(0)'>All</a></dd>
                <dd v-for="item in price" :key="item.id">
                  <a href="javascript:void(0)" @click='priceClick(item.id)' :class="priceChecked==item.id?'cur':''">{{item.startprice}}={{item.endprice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodList" :key="item.id">
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer__wrap">
          <div class="footer__secondary">
            <div class="footer__inner">
              <div class="footer__region">
                <span>Region</span>
                <select class="footer__region__select">
                  <option value="en-US">USA</option>
                  <option value="zh-CN">China</option>
                  <option value="in">India</option>
                </select>
              </div>
              <div class="footer__secondary__nav">
                <span>Copyright © 2017 IMooc All Rights Reserved.</span>
                <a href="http://us.lemall.com/us/aboutUs.html">
                  About Us
                </a>
                <a href="http://us.lemall.com/us/termsofUse.html">
                  Terms &amp; Conditions
                </a>
                <a href="http://us.lemall.com/us/privacyPolicy.html">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
          }, {
            id: 2,
            startprice: 100,
            endprice: 500
          }, {
            id: 3,
            startprice: 500,
            endprice: 1000
          }, {
            id: 4,
            startprice: 1000,
            endprice: 2000
          }],
          filter: false
        }
  },
      created () {
        this.$ajax
                .get('/static/mock/goods.json')
                .then(res => {
                  this.goodList = res.data.result
                })
                .catch(error => {
                    // console.log(error);
                })
  },
      methods: {
        priceClick (id) {
          this.priceChecked = id
          this.filter = false
        },
        showPrice () {
          this.filter = true
        }
      }
    }
</script>