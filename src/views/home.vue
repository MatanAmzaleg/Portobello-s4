<template>
  <section class="home-page">
    <section class="home-page-intro">
      <div class="home-page-info">
        <div class="info">
          <h1>Portobello brings all your tasks, teammates, and tools together</h1>
          <h3>Keep everything in the same place — even if your team isn’t.</h3>
          <div class="home-page-sign">
            <router-link to="/board" class="btn-sign"><button>Start demo</button></router-link>
          </div>
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
              <button-data :title="card.title" :content="card.content" @setSelectedGuide="setSelectedGuide"
                :selectedGuide="getSelectedGuide" />
            </div>
          </div>
          <carousel class="guide-carousel" :imgs="guide.imgs" :carouselActiveItem="getCarouselActiveItem"
            @updateSelectedCarousel="updateSelectedCarousel"></carousel>
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
          "https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-02_kzfibw.jpg",
          "https://res.cloudinary.com/ca-cloud/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669886243/Trello/guide-03_aqoqhq.jpg",
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
        selectedGuide: 'Boards',
        carouselActiveItem: 0
      },
    }
  },
  computed: {
    getSelectedGuide() {
      return this.guide.selectedGuide
    },
    getCarouselActiveItem() {
      return this.guide.carouselActiveItem
    }
  },
  methods: {
    setSelectedGuide(guide) {
      this.guide.selectedGuide = guide
      switch (guide) {
        case 'Boards': {
          this.guide.carouselActiveItem = 0
          break;
        }
        case 'Lists': {
          this.guide.carouselActiveItem = 1
          break;
        }
        case 'Cards': {
          this.guide.carouselActiveItem = 2
          break;
        }
      }
    },
    updateSelectedCarousel(idx) {
      this.guide.carouselActiveItem = idx
      switch (idx) {
        case 0: {
          this.guide.selectedGuide = 'Boards'
          break;
        }
        case 1: {
          this.guide.selectedGuide = 'Lists'
          break;
        }
        case 2: {
          this.guide.selectedGuide = 'Cards'
          break;
        }
      }
    }
  },
  components: {
    carousel,
    buttonData,
  }
}
</script>