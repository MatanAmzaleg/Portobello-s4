<template>
  <section class="home-page">
      <div class="home-page-info">
        <h1>Portobello brings all your tasks, teammates, and tools together</h1>
        <h3>Keep everything in the same place—even if your team isn't.</h3>
        <div class="home-page-sign">
        <input type="email" placeholder="Email">
        <router-link to="/board"><button>Sign up - it`s free!</button></router-link>
        </div>
        <router-link to="/board"><button>Start Demo</button></router-link>
      </div>
      <img src="https://translate.google.com/website?sl=en&tl=iw&hl=iw&prev=search&u=https://images.ctfassets.net/rz1oowkt5gyp/4BOU9h5tEyu4KMlcohLQ8B/53535ddf408664bb7de6367cafed3584/HeroBoard__BoardView_4x.png?w%3D1140%26fm%3Dwebp"/>
    <div class="product">
      <div class="product-info">
        <h2>A productivity powerhouse</h2>
        <p>
            Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's 
            doing what and what needs to get done. Learn more in our guide for getting started.
        </p>
      </div>
      <div class="product-preview">
        <h1>Img our Portobello</h1>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "home-page",
}
</script>
<style lang="scss">
.home-page{
  background: url("//images.ctfassets.net/rz1oowkt5gyp/6kBmKYevSE6afQVs3k7f85/4f9555020a455585ac16cdbc90064dc3/hero-1-left.svg") 0px 124px / auto no-repeat scroll padding-box border-box, url("//images.ctfassets.net/rz1oowkt5gyp/6QeCRDk331YxhjdhUY5ZfR/0f0c9cc5c6f29c493e65c4aa88b9eafd/wave--big-swing-hero.svg") left bottom -0.5px / 100% 29% no-repeat scroll padding-box border-box, url("//images.ctfassets.net/rz1oowkt5gyp/2iTmnZoDWa5z5r1XQd1FCw/385920f4c0810c358bb58bd72a2571fd/hero-1-right-top-padding.svg") right top / auto no-repeat scroll padding-box border-box, url("//images.ctfassets.net/rz1oowkt5gyp/5NNPHxU4uE3URY8gHqBqsH/aac2280249309f6ebfcc16db45a795ad/white_moire.png") center center / 90% no-repeat scroll padding-box border-box, linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180)) 0% 0% / auto repeat scroll padding-box border-box rgb(82, 67, 170);
  h1{
    font-size: 40px;
    max-width: 20ch;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
  }
  input{
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  img{
    margin-top: 50px;
    max-height: 400px;
    margin-bottom: 100px;
  }
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  &-info{
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
.product{
  p{
      margin-left: auto;
      margin-right: auto;
    }
}
}
</style>