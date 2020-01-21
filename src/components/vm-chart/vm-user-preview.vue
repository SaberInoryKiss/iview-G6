<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-07 11:31:33
 * @LastEditTime: 2019-11-07 14:52:11
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
  <Row class="vm-user-preview vm-panel">
    <div class="panel-heading">
      <img :src="brief.photo" height="90" alt="photo">
      <span class="title">
        <span class="name">{{ brief.name }}</span>
        <p class="role">{{ brief.role }}</p>
      </span>
    </div>
    <ul class="content">
      <li v-for="item in property" :key="item.id">
        <span>
          <i :class="item.icon"></i>
        </span>
        <span>
          {{ item.key }}
        </span>
        <span>
          {{ item.value }}
        </span>
      </li>
    </ul>
  </Row>
</template>
<script>
  export default {
    name: 'VmUserPreview',
    props: {
      brief: {
        type: Object,
        default: function () {
          return {
            photo: require('@/assets/img/photo.jpg'),
            name: '夏夏',
            role: '普通用户'
          }
        }
      },
      property: {
        type: Array,
        default: function () {
          return [
            {
              icon: 'fa fa-user',
              key: '性别',
              value: '女'
            }
          ]
        }
      }
    }
  }
</script>
