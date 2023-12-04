import { reactive } from "vue";

enum CollapseType {
  openAll = "openAll",
  closeAll = "closeAll",
  none = "none",
}

const initTabData = [
  {
    key: "1",
    name: "Tab 1",
    child: [
      {
        key: "1.1",
        name: "Tab 1.1",
        statusBtn: CollapseType.openAll,
        isActive: true,
        activeKey: ['1', '2', '3']
      },
      {
        key: "1.2",
        name: "Tab 1.2",
        statusBtn: CollapseType.openAll,
        isActive: false,
        activeKey: ['1', '2', '3']
      },
      {
        key: "1.3",
        name: "Tab 1.3",
        statusBtn: CollapseType.openAll,
        isActive: false,
        activeKey: ['1', '2', '3']
      },
    ],
  }, {
    key: "2",
    name: "Tab 2",
    child: [
      {
        key: "2.1",
        name: "Tab 2.1",
        statusBtn: CollapseType.openAll,
        isActive: true,
        activeKey: ['1', '2', '3']
      },
      {
        key: "2.2",
        name: "Tab 2.2",
        statusBtn: CollapseType.openAll,
        isActive: false,
        activeKey: ['1', '2', '3']
      },
      {
        key: "2.3",
        name: "Tab 2.3",
        statusBtn: CollapseType.openAll,
        isActive: false,
        activeKey: ['1', '2', '3']
      },
    ],
  }, {
    key: "3",
    name: "Tab 3",
    child: [
      {
        key: "3.1",
        name: "Tab 3.1",
        statusBtn: CollapseType.openAll,
        isActive: true,
        activeKey: ['1', '2', '3']
      },
      {
        key: "3.2",
        name: "Tab 3.2",
        statusBtn: CollapseType.openAll,
        isActive: false,
        activeKey: ['1', '2', '3']
      },
      {
        key: "3.3",
        name: "Tab 3.3",
        statusBtn: CollapseType.openAll,
        isActive: false,
        activeKey: ['1', '2', '3']
      },
    ],
  },
];

const tabData = reactive(initTabData)

export { CollapseType, tabData }
