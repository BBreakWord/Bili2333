<template>
    <el-row :gutter="20" class="el-title-row">
        <el-col :span="10" class="el-title-col">
            <el-card shadow="hover" class="text">{{title}}</el-card>
        </el-col>
    </el-row>

    <el-row :gutter="100" class="el-infolists">
        <div class="el-cover">
          <el-image :src="cover_img" style="height: 720px; width: 1080px;" ></el-image>
        </div>
        
    <div class="info-card">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="UP" name="1">
        <div><el-avatar :size="50" :src="face_url"></el-avatar></div>
        <div class="text">
          {{up_name}}
        </div>
      </el-collapse-item>
      <el-collapse-item title="视频简介" name="2">
        <div class="text">
          {{description}}
        </div>
      </el-collapse-item>
      <el-collapse-item title="播放量" name="3">
        <div class="text">
          {{play_volume}}
        </div>
      </el-collapse-item>
      <el-collapse-item title="弹幕数" name="4">
        <div class="text">
          {{num_danmu}}
        </div>
      </el-collapse-item>
      <el-collapse-item title="投稿时间" name="5">
        <div class="text">
          {{time}}
        </div>
      </el-collapse-item>
      <el-collapse-item title="一键三连" name="6">
        <div>
          <el-image :src=fcl_img style="height: 150px; width: 300px;"></el-image>
        </div>
          <el-col class="el-col">{{like}}</el-col>
          <el-col class="el-col">{{coin}}</el-col>
          <el-col class="el-col">{{favorite}}</el-col>
      </el-collapse-item>
    </el-collapse>
  </div>
    </el-row>
</template>

<style scoped>
.el-infolists {
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
}

.info-card {
  width: 480px;
  margin-left: 200px;
}

.el-title-row {
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
}

.el-title-col {
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
}

.el-cover {
  margin-left: 100px;
  display: flex;
  flex-wrap: wrap;
}

.text {
  font-size: 18px;
}

.el-col {
  margin-left: 11px;
}

</style>


<script lang="ts">
import { ref } from "vue"
import axios from '../network'
export default {
    name: "VideoList",
    setup() {
        const activeNames = ref(['1'])
        const handleChange = (val) => {
            console.log(val)
        }
        return {
          activeNames,
          handleChange,
        }
    },

    mounted() {
        this.get_videoinfos()
    },

    data() {
        return {
            keyword: '',
            title: "bilibili干杯~",
            face_url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            up_name: "蒙古上单",
            description: "这个UP很懒，什么都没有写呢~",
            play_volume: 0,
            num_danmu: 0,
            time: "1970/01/01 上午0:00",
            cover_img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            favorite: 0,
            coin: 0,
            like: 0,
            fcl_img: 'https://img1.baidu.com/it/u=1544353566,2990526187&fm=26&fmt=auto'
        }
    },

    methods: {
        get_videoinfos() {
            axios.get('/api/video_info', {
                params: {
                    keyword: this.keyword, 
                }
            }).then(videoinfos => {
                console.log(videoinfos)
                this.title = videoinfos.data['title'],
                this.face_url = videoinfos.data['owner_face'],
                this.up_name = videoinfos.data['owner_name'],
                this.description = videoinfos.data['desc'],
                this.play_volume = videoinfos.data['view'],
                this.cover_img = videoinfos.data['pic'],
                this.time = new Date(parseInt(videoinfos.data['pubdate'])*1000).toLocaleString().replace(/:\d{1,2}$/,' ')
                this.like = videoinfos.data['like'],
                this.favorite = videoinfos.data['favorite'],
                this.coin = videoinfos.data['coin'],
                this.num_danmu = videoinfos.data['danmaku']
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>
