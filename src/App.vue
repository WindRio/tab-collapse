<template>
  <a-config-provider>
    <a-tabs v-model:activeKey="activeKey" type="card" @change="handleChangeTab">
      <a-tab-pane :key="tabData[0].key" :tab="tabData[0].name" :forceRender="true">
        <ChildTab :data="tabData[0].child" :parent-key="activeKey" :collapseStatus="collapseStatus"
          @child-active="handleGetBtnStatus" />
      </a-tab-pane>
      <a-tab-pane :key="tabData[1].key" :tab="tabData[1].name" :forceRender="true">
        <ChildTab :data="tabData[1].child" :parent-key="activeKey" :collapseStatus="collapseStatus"
          @child-active="handleGetBtnStatus" />
      </a-tab-pane>
      <a-tab-pane :key="tabData[2].key" :tab="tabData[2].name" :forceRender="true">
        <ChildTab :data="tabData[2].child" :parent-key="activeKey" :collapseStatus="collapseStatus"
          @child-active="handleGetBtnStatus" />
      </a-tab-pane>
      <template #rightExtra>
        <a-button shape="circle" :icon="h(CaretUpOutlined)" @click="onCloseAll"
          :disabled="collapseStatus === CollapseType.closeAll" />
        <a-button shape="circle" :icon="h(CaretDownOutlined)" @click="onOpenAll"
          :disabled="collapseStatus === CollapseType.openAll" />
      </template>
    </a-tabs>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { ref, h, onMounted, watchEffect } from 'vue';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import ChildTab from './components/ChildTab.vue'
import { CollapseType, tabData } from './data'

const activeKey = ref('1');
const childTabData = ref<any[]>()
const childKey = ref<string>('1.1')
const collapseStatus = ref<CollapseType>(CollapseType.openAll)

const getTabParentData = (key: string) => {
  const thisTab = tabData.find((item) => item.key === key)
  return thisTab?.child
}

const handleChangeTab = (key: string) => {
  childTabData.value = getTabParentData(key)
}

const handleTabData = () => {
  const indexParent = tabData.findIndex((item) => item.key === activeKey.value)
  const indexChildTab = tabData[indexParent].child.findIndex((item) => item.isActive)
  return {
    indexParent, indexChildTab
  }
}

const handleGetBtnStatus = (key: string) => {
  childKey.value = key
}

onMounted(() => {
  childTabData.value = getTabParentData(tabData[0].key)
})

const onCloseAll = () => {
  const { indexParent, indexChildTab } = handleTabData()
  tabData[indexParent].child[indexChildTab].statusBtn = CollapseType.closeAll
}
const onOpenAll = () => {
  const { indexParent, indexChildTab } = handleTabData()
  tabData[indexParent].child[indexChildTab].statusBtn = CollapseType.openAll
}
watchEffect(() => {
  const { indexParent, indexChildTab } = handleTabData()
  collapseStatus.value = tabData[indexParent].child[indexChildTab].statusBtn
})
</script>
