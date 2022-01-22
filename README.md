# zhihu
 基于TypeScript+Vue3 的企业级仿知乎专栏项目

# ref 和 reactive
reactive 函数：
参数：对象
返回值：对象的响应式副本
注意事项：内部无需使用 .value 的形式，内部的 属性 必须通过对象引用才能有响应式效果

toRefs 函数：
参数：响应式对象？√ 传入普通对象时，vue 提示“toRefs() expects a reactive object but received a plain one.”reactive object
功能：把对象的每一项变成 ref 对象

# 响应式
Vue2使用Object. defineProperty()实现响应式原理，而vue3使用Proxy()实现

# 生命周期函数的变化
beforeCreated 和 created => setup
setup只执行一次


# 侦测变化watch

watch((xxxxx,newValue,oldValue) =>{
监控数据中的数据要用箭头函数,如 data.count要写成()=>data.count
})