<template>
  <section class="home-page">
    <div class="home-page-info">
      <div class="info">
        <h1>Portobello brings all your tasks, teammates, and tools together</h1>
        <h3>Keep everything in the same place—even if your team isn’t.</h3>
        <div class="home-page-sign">
          <input type="email" placeholder="Email">
          <router-link to="/board"><button>Sign up - it`s free!</button></router-link>
        </div>
        <!-- <router-link to="/board" class="btn-start"><button>Start Demo</button></router-link> -->
      </div>
    </div>
    <img
      src="https://translate.google.com/website?sl=en&tl=iw&hl=iw&prev=search&u=https://images.ctfassets.net/rz1oowkt5gyp/4BOU9h5tEyu4KMlcohLQ8B/53535ddf408664bb7de6367cafed3584/HeroBoard__BoardView_4x.png?w%3D1140%26fm%3Dwebp" />
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
.home-page {
  input {
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  img {
    margin-top: 50px;
    max-height: 400px;
    margin-bottom: 100px;
  }

  margin-left: auto;
  margin-right: auto;
  text-align: center;

  &-info {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  .product {
    p {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>