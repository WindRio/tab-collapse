<template>
    <a-collapse v-model:activeKey="activeKey" expand-icon-position="end">
        <a-collapse-panel key="1" header="This is panel header 1">
            <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="This is panel header 2">
            <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="This is panel header 3">
            <p>{{ text }}</p>
        </a-collapse-panel>
    </a-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { CollapseType } from '../data/index';

const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const initActiveKey = ['1', '2', '3']
const activeKey = ref(initActiveKey);
type IProps = {
    isBtnStatus: CollapseType,
    collapseKey: string[]
}
const emits = defineEmits(['collapseStatus', 'collapseKey'])
const props = defineProps<IProps>();

const handleSetKey = () => {
    if (props.isBtnStatus === CollapseType.closeAll) {
        activeKey.value = []
    } else if (props.isBtnStatus === CollapseType.openAll) {
        activeKey.value = initActiveKey
    }
};

watch(() => props.isBtnStatus, () => {
    handleSetKey()
})

watch(() => props.collapseKey, (curr) => {
    activeKey.value = curr
})

watch(activeKey, val => {
    if (val.length === 0) {
        emits('collapseStatus', CollapseType.closeAll)
    } else if (val.length === initActiveKey.length) {
        emits('collapseStatus', CollapseType.openAll)
    } else {
        emits('collapseStatus', CollapseType.none)
    }
    emits('collapseKey', val)
});

</script>
  
  