<template>
  <section class="home-page">
    <section class="home-page-intro">
      <div class="home-page-info">
        <div class="info">
          <h1>Portobello brings all your tasks, teammates, and tools together</h1>
          <h3>Keep everything in the same place—even if your team isn’t.</h3>
          <div class="home-page-sign">
            <input type="email" placeholder="Email">
            <router-link to="/board" class="btn-sign"><button>Sign up - it`s free!</button></router-link>
          </div>
          <!-- <router-link to="/board" class="btn-start"><button>Start Demo</button></router-link> -->
        </div>
      </div>
      <img class="trello-example"
        src="https://translate.google.com/website?sl=en&tl=iw&hl=iw&prev=search&u=https://images.ctfassets.net/rz1oowkt5gyp/4BOU9h5tEyu4KMlcohLQ8B/53535ddf408664bb7de6367cafed3584/HeroBoard__BoardView_4x.png?w%3D1140%26fm%3Dwebp" />
    </section>
    <div class="product">
      <div class="product-info">
        <h4>TRELLO 101</h4>
        <h2>A productivity powerhouse</h2>
        <p>
          Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's
          doing what and what needs to get done. Learn more in our <a>guide for getting started</a>.
        </p>
      </div>
      <section class="product-guide">
        <div class="product-guide-preview">
          <div class="guide-cards">
            <div class="guide-card" v-for="card in guide.cards">
              <button-data :title="card.title" :content="card.content" @setSelectedGuide="setSelectedGuide" :selectedGuide="getSelectedGuide"/>
            </div>
          </div>
          <carousel class="guide-carousel" :imgs="guide.imgs"></carousel>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import carousel from '../cmps/carousel.vue';
import buttonData from '../cmps/button-data.vue';

export default {
  name: "home-page",
  data() {
    return {
      guide: {
        imgs: [
          "https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-01_reaa50.jpg",
          "https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-03_aqoqhq.jpg",
          "https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-02_kzfibw.jpg",
        ],
        cards: [
          {
            title: 'Boards', content: 'Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”'
          },
          {
            title: 'Lists', content: 'The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.'
          },
          {
            title: 'Cards', content: 'Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.'
          },
        ],
        selectedGuide: 'Boards'
      },
    }
  },
  computed: {
    getSelectedGuide() {
      return this.guide.selectedGuide
    }
  },
  methods: {
    setSelectedGuide(guide){
      this.guide.selectedGuide = guide
    }
  },
  components: {
    carousel,
    buttonData,
  }
}
</script>