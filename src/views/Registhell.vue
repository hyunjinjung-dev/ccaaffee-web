<template>
  <div id="app">
    <v-app id="inspire">
      <v-main>
        <v-btn @click="hell">hell</v-btn>
        <v-btn @click="instagramPhotos">instagramPhotos</v-btn>
        <v-btn @click="hellhell">hellhell</v-btn>
        <v-btn @click="hello">hello</v-btn>
        <v-btn @click="hellohello">hellohello</v-btn>
        <v-btn @click="hellohellohello">hellohellohello</v-btn>
        <v-btn @click="hellna">hellna</v-btn>
        <div id="instagram"></div>
      </v-main>
      <v-main>
        <v-container fluid>
          <v-layout align-start justify-center>
            <v-flex xs4 class="elevation-1 pa-3 ma-2">
              <v-list two-line>
                <v-subheader>
                  FIRST LIST
                </v-subheader>
                <draggable v-model="items" :options="{ group: 'people' }" style="min-height: 10px">
                  <template v-for="item in items">
                    <v-list-item :key="item.id">
                      <v-list-item-avatar>
                        <img :src="item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </draggable>
              </v-list>
            </v-flex>
            <v-flex xs4 class="elevation-1 pa-3 ma-2">
              <v-list two-line>
                <v-subheader>
                  SECOND LIST
                </v-subheader>
                <draggable v-model="items2" :options="{ group: 'people' }" style="min-height: 10px">
                  <template v-for="item in items2">
                    <v-list-item :key="item.id">
                      <v-list-item-avatar>
                        <img :src="item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </draggable>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios"

import draggable from "vuedraggable"

export default {
  components: {
    draggable,
  },
  data() {
    return {
      dataList: [],
      items: [
        {
          id: 1,
          avatar: "https://s3.amazonaws.com/vuetify-docs/images/lists/1.jpg",
          title: "Brunch this life?",
          subtitle: "Subtitle 1",
        },
        {
          id: 2,
          avatar: "https://s3.amazonaws.com/vuetify-docs/images/lists/2.jpg",
          title: "Winter Lunch",
          subtitle: "Subtitle 2",
        },
        {
          id: 3,
          avatar: "https://s3.amazonaws.com/vuetify-docs/images/lists/3.jpg",
          title: "Oui oui",
          subtitle: "Subtitle 3",
        },
      ],
      items2: [
        {
          id: 4,
          avatar: "https://s3.amazonaws.com/vuetify-docs/images/lists/4.jpg",
          title: "Brunch this weekend?",
          subtitle: "Subtitle 4",
        },
        {
          id: 5,
          avatar: "https://s3.amazonaws.com/vuetify-docs/images/lists/5.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "Subtitle 5",
        },
      ],
    }
  },
  methods: {
    async hell() {
      console.log("hell")
      let URL = "https://www.instagram.com/explore/tags/공그로트"
      await axios
        .get(URL)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async instagramPhotos() {
      // It will contain our photos' links
      const res = []

      try {
        const userInfoSource = await axios.get("https://www.instagram.com/explore/tags/공그로트")

        // userInfoSource.data contains the HTML from Axios
        // const jsonObject = userInfoSource.data
        //   .match(/<scrip type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
        //   .slice(0, -1)
        const jsonObject = userInfoSource.data
          .match(/<scrip type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
          .slice(0, -1)

        const userInfo = JSON.parse(jsonObject)
        // Retrieve only the first 10 results
        const mediaArray =
          userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
        for (let media of mediaArray) {
          const node = media.node

          // Process only if is an image
          if (node.__typename && node.__typename !== "GraphImage") {
            continue
          }

          // Push the thumbnail src in the array
          res.push(node.thumbnail_src)
        }
        console.log(res)
      } catch (e) {
        console.error("Unable to retrieve photos. Reason: " + e.toString())
      }

      return res
    },
    async hellhell() {
      // let gallery = []
      const wrapper = document.getElementById("instagram")

      axios.get("https://www.instagram.com/twicetagram/").then((response) => {
        const a = response.data

        // const media = JSON.parse(a.slice(a.slice(a.indexOf("edge_owner_to_timeline_medi"))))
        const hell = a.slice(
          a.indexOf("edge_owner_to_timeline_media") + 30,
          a.indexOf("edge_saved_media") - 2
        )
        const hello = "'" + hell + "'"
        console.log(hello)

        const media = JSON.parse()

        media.edges.forEach((m) => {
          const node = m.node
          const a = document.createElement("a")
          const img = document.createElement("img")

          a.target = "_blank"
          a.href = `https://www.instagram.com/p/${node.shortcode}/`
          img.src = node.display_url
          a.append(img)
          wrapper.append(a)

          // wrapper.append(a)
          console.log(img.src)
        })
      })
    },

    async hello() {
      // https://medium.com/@marvinng_55348/how-to-scrape-public-instagram-pictures-and-posts-by-using-only-instagram-domain-in-reactjs-f7041c33926f
      // let data = []
      const url = "https://www.instagram.com/official.twice/channel/" // 이거 된다!!
      const instaSource = await axios.get(url)
      console.log("instaSource", instaSource)

      const instaObj = instaSource.data
        .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
        .slice(0, -1)

      const convertedJosnObj = JSON.parse(instaObj)
      console.log(convertedJosnObj, "JSON OBJECT")

      // const mediaArr =
      //   convertedJosnObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges

      // mediaArr.map((el) => {
      //   const node = el.node
      //   data.push(node)
      // })
    },

    // 거의 근접했는데 차단당한 듯..
    async hellohello() {
      // https://medium.com/@marvinng_55348/how-to-scrape-public-instagram-pictures-and-posts-by-using-only-instagram-domain-in-reactjs-f7041c33926f
      // let data = []
      const url = "https://www.instagram.com/explore/tags/공그로트/"
      // const url = "https://www.instagram.com/official.twice/?__a=1"
      // const url = "https://www.instagram.com/official.twice"
      const instaSource = await axios.get(url)
      console.log("instaSource", instaSource)

      const instaObj = instaSource.data
        .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
        .slice(0, -1)

      const convertedJsonObj = JSON.parse(instaObj)
      console.log(convertedJsonObj, "JSON OBJECT")

      const mediaArr =
        convertedJsonObj.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges
      console.log("mediaArr", mediaArr)
      // convertedJsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges

      // mediaArr.map((el) => {
      //   const node = el.node
      //   data.push(node)
      // })
    },

    async hellohellohello() {
      // https://medium.com/@marvinng_55348/how-to-scrape-public-instagram-pictures-and-posts-by-using-only-instagram-domain-in-reactjs-f7041c33926f
      // let data = []
      // const url = "https://www.instagram.com/explore/tags/공그로트/?__a=1"
      // const url = "https://www.instagram.com/official.twice/?__a=1"
      const url = "https://www.instagram.com/explore/tags/공그로트/?__a=1"
      await axios.get(url).then((response) => {
        const a = response.data
        console.log(a)
        // const media = JSON.parse(
        //   a.slice(a.indexOf("edge_owner_to_timeline_media") + 30, a.indexOf("edge_saved_media") - 2)
        // )
        // media.edges.forEach((m) => {
        //   const node = m.node
        //   console.log(node.display_url)

        // a.target = "_blank"
        // a.href = `https://www.instagram.com/p/${node.shortcode}/`
        // img.src = node.display_url
        // a.append(img)
        // wrapper.append(a)
        // })
      })

      // const instaObj = instaSource.data
      //   .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
      //   .slice(0, -1)

      // const convertedJsonObj = JSON.parse(instaObj)
      // console.log(convertedJsonObj, "JSON OBJECT")

      // const media = JSON.parse(
      //   instaSource.slice(
      //     instaSource.indexOf("edge_owner_to_timeline_media") + 30,
      //     instaSource.index("edge_saved_media") - 2
      //   )
      // )
      // console.log()

      // const mediaArr =
      //   convertedJsonObj.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges
      // console.log("mediaArr", mediaArr)
      // convertedJsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges

      // mediaArr.map((el) => {
      //   const node = el.node
      //   data.push(node)
      // })
    },

    async hellna() {
      // const wrapper = document.getElementById("instagram")
      fetch(
        "https://www.google.co.kr/maps/place/%EA%B3%B5%EA%B7%B8%EB%A1%9C%ED%8A%B8/@37.5662415,126.9199971,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMX6Umm15QZEX8TUv-_fiHRn0_sij7ksp1jGxCU!2e10!3e12!6s%2F%2Flh3.googleusercontent.com%2F-oYAi6gSJ8Wg%2FXVDy3Q-3lNI%2FAAAAAAAEKZc%2FhwlLwK-UkUwPUJwizOCZQ21aHKvxCrt0QCJUFGAYYCw%2Fw397-h298-k-no%2F!7i4032!8i3024!4m7!3m6!1s0x357c98e5a521c63d:0x4413fb390aa87fbe!8m2!3d37.5662415!4d126.9199971!14m1!1BCgIgAQ?hl=ko"
      )
        .then((a) => {
          return a
        })
        .catch(console.log("error"))
      // .then((a) => {
      //   const media = JSON.parse(
      //     a.slice(
      //       a.indexOf("edge_owner_to_timeline_media") + 30,
      //       a.indexOf("edge_saved_media") - 2
      //     )
      //   )
      //   media.edges.forEach((m) => {
      //     const node = m.node
      //     console.log(node)

      //   a = document.createElement("a")
      // const img = document.createElement("img")

      // a.target = "_blank"
      // a.href = `https://www.instagram.com/p/${node.shortcode}/`
      // img.src = node.display_url
      // a.append(img),
      // wrapper.append(a)
      //   })
      // })
    },
  },
}
</script>

<style></style>
