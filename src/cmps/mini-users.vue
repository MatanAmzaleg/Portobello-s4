<template lang="">
  <div class="main-task-members-container"> 
    <div class="main-task-members-header">Members</div> 
    <div class="main-task-members"> 
         <!-- <ul v-for="user in users">  -->
             <!-- <li>  -->
             <!-- <img class="main-task-member-img" :src="user.imgUrl" alt="member"/>  -->
             <!-- </li>  -->
         <!-- </ul>  -->
    </div>
    </div>
</template>
<script>
export default {
    props:{
        user:Object
    },
    created(){
        console.log(this.user);
    }
};
</script>
<style lang="scss">
.main-task-members-container {
          flex-direction: column;
          padding-top: 3px;
          margin-left: 20px;

          .main-task-members-header {
            margin-top: 0.8rem;
            font-size: 12px;
            font-weight: 500;
            // color: $clr12;
          }
          .main-task-members {
            display: flex;
            margin-top: -0.8rem;
            margin-left: -0.1rem;
            margin-bottom: 20px;
            .main-task-member-img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }
        }
    }
</style>
