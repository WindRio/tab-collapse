<template>
  <a-tabs v-model:activeKey="activeKey" centered type="card" @change="handleChangeTab">
    <a-tab-pane :key="props.data[0].key" :tab="props.data[0].name" :forceRender="true">
      <Collapse :isBtnStatus="collapseStatus" @collapse-status="onGetCollapseStatus" :collapseKey="collapseKey"
        @collapse-key="onCollapseKey" />
    </a-tab-pane>
    <a-tab-pane :key="props.data[1].key" :tab="props.data[1].name" :forceRender="true">
      <Collapse :isBtnStatus="collapseStatus" @collapse-status="onGetCollapseStatus" :collapseKey="collapseKey"
        @collapse-key="onCollapseKey" />
    </a-tab-pane>
    <a-tab-pane :key="props.data[2].key" :tab="props.data[2].name" :forceRender="true">
      <Collapse :isBtnStatus="collapseStatus" @collapse-status="onGetCollapseStatus" :collapseKey="collapseKey"
        @collapse-key="onCollapseKey" />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import { tabData, CollapseType } from '../data'

import Collapse from './Collapse.vue'

type IProps = {
  data: {
    key: string,
    name: string,
    statusBtn: string,
    isActive: boolean,
  }[],
  parentKey: string,
}
const emits = defineEmits(['douBtnStatus', 'childActive'])
const props = defineProps<IProps>()
const activeKey = ref(props.data[0].key);
const collapseStatus = ref<CollapseType>(CollapseType.closeAll)
const collapseKey = ref<string[]>([])

const handleTabValue = () => {
  const indexParent = tabData.findIndex((item) => item.key === props.parentKey)
  const indexChildTab = tabData[indexParent].child.findIndex((item) => item.isActive)
  const handleChangeBtnStatus = (val: CollapseType) => {
    tabData[indexParent].child[indexChildTab].statusBtn = val
  }
  const handleChangeCollapseKey = (val: string[]) => {
    tabData[indexParent].child[indexChildTab].activeKey = val
  }
  const handleGetCollapseStatus = () => {
    collapseStatus.value = tabData[indexParent].child[indexChildTab].statusBtn
    collapseKey.value = tabData[indexParent].child[indexChildTab].activeKey
  }
  return {
    handleChangeBtnStatus, handleGetCollapseStatus, handleChangeCollapseKey
  }
}

const onGetCollapseStatus = (val: CollapseType) => {
  const { handleChangeBtnStatus } = handleTabValue()
  handleChangeBtnStatus(val)
}

const onCollapseKey = (val: string[]) => {
  const { handleChangeCollapseKey } = handleTabValue()
  handleChangeCollapseKey(val)
}

const handleChangeTab = (key: string) => {
  const indexParent = tabData.findIndex((item) => item.key === props.parentKey)
  tabData[indexParent].child.forEach((item, index) => {
    if (item.key === key) {
      tabData[indexParent].child[index].isActive = true
    } else {
      tabData[indexParent].child[index].isActive = false
    }
  })
  emits('childActive', key)
}
watchEffect(() => {
  if (activeKey.value) {
    const { handleGetCollapseStatus } = handleTabValue()
    handleGetCollapseStatus()
  }
})
onMounted(() => {
  emits('childActive', activeKey.value)
})
</script>
  
  