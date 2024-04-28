# Vue3

## 创建 Vue 实例对象

```js
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");
```

## setup(组合式 api)

以前需要分开配置的各种属性和方法都在该函数内进行书写,返回一个对象,包含需要做响应式的数据,模板中可以直接访问该对象内的数据.

1. setup 执行逻辑
   一个 vue 文件定义之后，通过 jsx 的语法进行书写后，编译语法会帮我们调用与 vue 对应的
2. setup 的返回值

- 一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
- 返回对象中的属性会与 data 函数返回对象的属性合并成为组件对象的属性
- 返回对象中的方法会与 methods 中的方法合并成功组件对象的方法
- 如果有重名, setup 优先
- 一般不要混合使用: methods 中可以访问 setup 提供的属性和方法, 但在 setup 方法中不能访问 data 和 methods

3. setup 的参数

- setup(props, context) / setup(props, {attrs, slots, emit})
- props: 包含 props 配置声明且传入了的所有属性的对象
- attrs: 包含没有在 props 配置中声明的属性的对象, 相当于 this.$attrs
- slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
- emit: 用来分发自定义事件的函数, 相当于 this.$emit

## 第二种写法

```html
<script setup>
  import { ref, onMounted } from "vue";
  // 响应式状态
  const count = ref(0);
  // 用来修改状态、触发更新的函数
  function increment() {
    count.value++;
  }
  // 生命周期钩子
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`);
  });
</script>
```

## ref

- 作用: 定义一个数据的响应式
- 语法: const xxx = ref(initValue):
  创建一个包含响应式数据的引用(reference)对象
  js 中操作数据: xxx.value
  模板中操作数据: 不需要.value
- 一般用来定义一个原始数据类型(boolan,string,number)的响应式数据,内部使用 getter 和 setter 进行检测。

```js
import { ref } from 'vue';
setup(){
  // 返回一个对象，对象的value值为传入的参数
  const data = ref(3)
  // 如果传入是对象，会调用reactive把对象变成proxy实例后做为ref对象的value值
  const data = ref({a:2})
  data.value = reactive({a:2})
  return {
    data
  }
}
```

## reactive

- 作用: 定义多个数据的响应式
- const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
- 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

```js
setup () {
    /*
    定义响应式数据对象
    */
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }
    return {
      state,
      update,
    }
  }
```

## 与 vue2 的响应式比较

vue2 使用 defineProperty 实现代理。缺点有两个

- 对象直接新添加的属性或删除已有属性, 界面不会自动更新
- 直接通过下标替换元素或更新 length, 界面不会自动更新 arr[1] = {}
  vue3 通过 proxy 建立代理对象进行代理
- 通过 Proxy(代理): 拦截对 data 任意属性的任意(13 种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
- 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作

```js
new Proxy(data, {
  // 拦截读取属性值
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  // 拦截设置属性值或添加新属性
  set(target, prop, value) {
    return Reflect.set(target, prop, value);
  },
  // 拦截删除属性
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop);
  },
});
```

## computed 函数

写法通过 computed 函数来实现

```js
// 只有getter的计算属性
const fullName1 = computed(() => {
  return user.firstName + "-" + user.lastName;
});
// 有getter与setter的计算属性
const fullName2 = computed({
  get() {
    return user.firstName + "-" + user.lastName;
  },
  set(value: string) {
    const names = value.split("-");
    user.firstName = names[0];
    user.lastName = names[1];
  },
});
```

## watch 函数

使用 watch 函数进行监视，参数依次为：监视的数据，执行的回调，配置项

```js
// 直接传入对象，会默认开启深度监视
watch(
  user,
  (newValue, oldValue) => {
    fullName3.value = user.firstName + "-" + user.lastName;
  },
  {
    immediate: true, // 是否初始化立即执行一次, 默认是false
    deep: true, // 是否是深度监视
    flush: "post", // 将回调该值组件更新后执行。
  }
);
// 如果需要监视对象内的属性，第一个参数需要设置成一个函数。当传入函数返回的是对象时，不会默认开启深度监视
watch(
  () => user.name,
  () => {
    console.log(user.name);
  }
);
// 可以同时监视多个变量，此时需要将第一个参数设置为数组。
watch([fullName, () => user.name], () => {
  console.log(user.name);
});
//
```

## watchEffect 函数

传入的回调函数中使用了哪些响应式数据就会监测哪些数据，当这些数据发生改变时就会调用传入的回调函数。并且该回调会比 watch 先执行。

```js
watchEffect(() => {
  consolo.log(user.name);
});
```

## unwatch

如果异步绑定侦听器，那么组件卸载的时候不会将侦听器销毁，为了避免内存泄漏我们需要手动销毁，通过 watch 和 watchEffect 返回的函数进行销毁

```js
const unwatch = watchEffect(() => {
  consolo.log(user.name);
});
// 销毁侦听器、
onwatch();
```

## watchPostEffect 函数

和 watchEffect 一样，只是执行时间在组件更新之后。

## 生命周期函数

<!-- 由于setup函数本身执行的时机就是在 -->

- beforeCreate -> 使用 setup()
- created -> 使用 setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured

## Hook 函数(组合式函数)

以 use 开头，采用驼峰命名法，将可复用的代码抽离出来,和之前的混合一样的思想，用法和 React 的用法一样。

```js
// 定义
import { ref, watchEffect, toValue } from "vue";
export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const fetchData = () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    // toValue这个函数接收一个参数，如果参数是函数则返回该函数的返回值，如果参数是ref则返回ref的value，否则会返回原参数。
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };
  watchEffect(() => {
    fetchData();
  });
  return { data, error };
}
// 使用时，参数可以传递任何值
const { data, error } = useFetch(() => `/posts/${props.id}`);
```

## ref

需要我们手动设置一个变量来进行存储该 dom，如果给组件绑定 ref 得到的是组件实例对象

```js
const input = ref(null)
<input ref='input'></input>
// 如果子组件内部使用了<scipt setup>，那么父组件通过ref无法读写子组件实例对象的任何方法和属性，此时需要在子组件使用defineExpose函数进行数据暴露才能让父组件访问。
```

## 组件编写方式

脚手架构建的项目默认引入的 vue 不能使用对象来表示组件，但是如果使用 vue/dist/vue.esm-bundler.js 等包可以将组件使用对象来定义，对象包含组件定义的相关配置。

## props

如果通过 script setup 标签方式来创建组件，则需要通过 defineProps 方法来进行 props 属性声明.

```js
const props = defineProps(["title"]); // 返回值就是所有props属性集合对象。
```

### 校验

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true,
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100,
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: "hello" };
    },
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ["success", "warning", "danger"].includes(value);
    },
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return "Default function";
    },
  },
});
```

## 自定义事件

如果通过 script setup 标签方式来创建组件，可以通过 defineEmits 方法来获取 emit 函数以触发自定义事件.

```js
// 这样写可以避免vue将其变成根元素的事件并得到事件触发函数。
const emit = defineEmits(["enlarge-text"]);
emit("enlarge-text", value);
// 同时可以利用设置事件校验
const emit = defineEmits({
  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      console.warn("Invalid submit event payload!");
      return false;
    }
  },
});
function submitForm(email, password) {
  emit("submit", { email, password });
}
```

## v-model

用在原生 dom 上时没有变化，用在组件上会默认绑定 modal-value 属性并且自动绑定 update:modelValue 事件，与 vue2 的 sync 修饰符一样的目的。

```js
<CustomInput v-model=serchText></CustomInput>
// 等价于如下代码
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
></CustomInput>
// 在组件上使用v-model可以传递修饰符，该修饰符会通过modelModifiers这个props属性传递到组件内部
<MyComponent v-model.capitalize="myText" />
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})
// modelModifiers上有capitalize属性，判断该属性是否存在即可
// 如果为v-model指令指定属性，则接受到的props为
<MyComponent v-model:title.capitalize="myText" />
const props = defineProps({
  titlemodelValue: String,
 titlemodelModifiers: { default: () => ({}) }
})
```

## attributes 透传

vue 默认会将组件的非 props 全部传递到组件的根元素，如果有多个根元素，我们可以指定传递给某个

```js
// 指定透传
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">
    click me
  </button>
</div>;
// <script setup>禁用透传
defineOptions({
  inheritAttrs: false,
});
// <script setup>使用透传
import { useAttrs } from "vue";
const attrs = useAttrs();
```

## 插槽

如果同时使用默认插槽、具名插槽、作用域插槽,不同插槽之间的数据不能共享

```js
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message 属于默认插槽，此处不可用 -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
```

## 依赖注入

采用`<script setup>`方式编写的组件，使用 provide 和 inject 函数进行依赖注入

```js
// 在父组件注册依赖
provide(/* 注入名 */ "message", /* 值 */ "hello!");
// 在子组件使用依赖
const message = inject("message");
// inject接收第二个参数做为默认值，第三个参数设置为true，可以将默认值设置成一个函数的返回值
const value = inject("key", () => new ExpensiveClass(), true);
```

## 异步组件

使用 defineAsyncComponent 定义一个异步组件，参数是一个返回 promise 对象的函数。该方法返回的是一个新的组件，组件内部的 setup 函数内帮我们调用了传入的函数实现异步。

```js
const AdminPage = defineAsyncComponent(() =>
  import("./components/AdminPageComponent.vue")
);
// 同样可以直接传递异步函数的相关配置
defineAsyncComponent({
  // 加载函数
  loader: () => import("./Foo.vue"),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
});
```

## 自定义指令

自定义指令钩子较 vue2 有更新，自定义指令默认会透传给组件的根元素。

```js
// 指令配置对象
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};
```

## transition 组件

### 同时使用 transition&animation

有时在执行某个动画时，同时触发了其它的过渡，此时需要显示传递 type 的 prop 属告诉 transition 需要执行那个

```js
<Transition type="animation">...</Transition>
```

### css 属性

当我们只使用 js 钩子函数实现动画效果时，通过这个属性可以避免自动探测一些 css 过度。

```js
<Transition :css='false'>...</Transition>
```

## keepAlive

该组件可以缓存组件状态，可以指定最大缓存组件数和缓存组件名

## Teleport

该组件可以是组件内的模板挂载到指定 dom 下，同时对一个 dom 元素使用 Teleport 组件会不断的向指定 dom 元素追加元素

```js
// to接收一个css选择器或dom元素对象
<Teleport to="body">
  <div v-if="open" class="modal"></div>
</Teleport>
```

## Suspense

可以监测组件下的所有异步依赖，当所有异步依赖加载完成后才会显示目标内容，目前处于实验阶段

```js
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />
  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

## 状态管理

由于可以直接定义一个具有数据监测的数据对象，所以状态管理可以直接外部创建一个监测对象后赋值给组件，组件再为这个对象的更新绑定对应的组件更新代码即可

```js
// store.js
import { reactive } from 'vue'
export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
// 使用
<template>
  <button @click="store.increment()">
    From B: {{ store.count }}
  </button>
</template>
```

## 响应式实现

使用 watcheffect、computed、模板语法等函数时，这些函数会将我们传入的函数执行一遍，执行过程中访问到的数据就会触发其 getter 方法，在 getter 方法中绑定更新函数。当修改这些数据时，在 setter 中执行这些更新函数。

## 组件调试

新增了两个生命周期钩子

- onRenderTracked 判断组件目前依赖了哪些数据
- onRenderTriggered 判断组件目前由哪个依赖数据导致的更新

```html
<script setup>
  import { onRenderTracked, onRenderTriggered } from "vue";
  onRenderTracked((event) => {
    debugger;
  });
  onRenderTriggered((event) => {
    debugger;
  });
</script>
```

也可以给 computed、watcheffect 等函数传递调试配置函数来调试

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // 当 count.value 被追踪为依赖时触发
    debugger;
  },
  onTrigger(e) {
    // 当 count.value 被更改时触发
    debugger;
  },
});
watch(source, callback, {
  onTrack(e) {
    debugger;
  },
  onTrigger(e) {
    debugger;
  },
});
watchEffect(callback, {
  onTrack(e) {
    debugger;
  },
  onTrigger(e) {
    debugger;
  },
});
```

## 渲染机制

我们写的组件代码再编译时会生成渲染函数，然后调用最顶层的渲染函数，逐层执行渲染函数就会返回一颗虚拟 dom 树，最后遍历这棵虚拟 dom 树生成一颗真实的 dom 树，并将这棵真实 dom 树挂载到提供的容器中。当虚拟 dom 对象中对应的哪些依赖数据变更时，会重新调用对应节点的渲染函数，生成一个新的虚拟 dom 子树后遍历这颗树修改有变化的节点对应的真实 dom。

- 虚拟 dom，包含响应式数据依赖，具有真实 dom 信息的一个对象
- 真实 dom，调用浏览器 js 引擎原生 api 生成的一个 dom 对象
- 挂载，调用浏览器 js 引擎原生 api 将一个 dom 插入另一个 dom 下的操作

## 渲染函数&jsx

渲染函数相当于单文件组件中的模板，用于创建虚拟 dom 树。选项式 api 中可以使用 render 配置项设置，setup 函数中如果返回值是函数则会以此函数作为渲染函数。
jsx 语法相当于调用 h 函数，是 h 函数的一种简写形式。而渲染函数的返回值是 h 函数的返回值，h 函数用于生成虚拟 dom。

## 响应式 api

### readonly

接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理

### isReadonly

判断是否为只读对象

### isRef

判断是否是一个 ref 对象

### unref

如果是 ref 对象返回其 value，如果不是则返回原参数

```js
val = isRef(val) ? val.value : val;
```

### toRef

返回一个 ref 对象，value 值根据参数动态获取。

```js
const fooRef = toRef(state, "foo");
toRef(() => props.foo);
```

### toValue

和 unref 一样，不同在与可以接收 getter 参数

```js
toValue(1); //       --> 1
toValue(ref(1)); //  --> 1
toValue(() => 1); // --> 1
```

### toRefs

将一个对象的每个原始值属性变成一个 ref 对象，内部循环调用了 toRef

```js
const state = reactive({
  foo: 1,
  bar: 2,
});
const stateAsRefs = toRefs(state);
stateAsRefs.foo.value; // 1
```

### isProxy()​

检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。

### isReactive()​

检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。

### shallowRef()

如果传入对象，则不会调用 reactive 将该对象转化成 proxy 代理

### triggerRef()

触发一个由 shallowRef 定义的 ref 对象对应的监听

```js
const shallow = shallowRef({
  greet: "Hello, world",
});
watchEffect(() => {
  console.log(shallow.value.greet);
});
// 这行代码可以触发watchEffect
triggerRef(shallow);
```

### customRef()

自定义一个具有 getter，setter 的 ref 对象

```js
import { customRef } from 'vue'
export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
const text = useDebouncedRef('hello')
<template>
  <input v-model="text" />
</template>
```

### shallowReactive()

浅层 Reactive

### shallowReadonly()

浅层 Readonly

### toRaw()

返回 reactive 函数代理的原始对象

```js
const foo = {};
const reactiveFoo = reactive(foo);
console.log(toRaw(reactiveFoo) === foo); // true
```

### markRaw()

将对象转换成可不被 reactive 转换为响应式的对象。

```js
const foo = markRaw({});
console.log(isReactive(reactive(foo))); // false
// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo });
console.log(isReactive(bar.foo)); // false
```

## 手写响应式 api

### shallowReactive 与 reactive

```js
const reactiveHandler = {
  get(target, key) {
    if (key === "_is_reactive") return true;

    return Reflect.get(target, key);
  },

  set(target, key, value) {
    const result = Reflect.set(target, key, value);
    console.log("数据已更新, 去更新界面");
    return result;
  },

  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key);
    console.log("数据已删除, 去更新界面");
    return result;
  },
};
/* 
自定义shallowReactive
*/
function shallowReactive(obj) {
  return new Proxy(obj, reactiveHandler);
}

/* 
自定义reactive
*/
function reactive(target) {
  if (target && typeof target === "object") {
    if (target instanceof Array) {
      // 数组
      target.forEach((item, index) => {
        target[index] = reactive(item);
      });
    } else {
      // 对象
      Object.keys(target).forEach((key) => {
        target[key] = reactive(target[key]);
      });
    }

    const proxy = new Proxy(target, reactiveHandler);
    return proxy;
  }

  return target;
}
```

### shallowRef 与 ref

```js
/*
自定义shallowRef
*/
function shallowRef(target) {
  const result = {
    _value: target, // 用来保存数据的内部属性
    _is_ref: true, // 用来标识是ref对象
    get value() {
      return this._value;
    },
    set value(val) {
      this._value = val;
      console.log("set value 数据已更新, 去更新界面");
    },
  };

  return result;
}

/* 
自定义ref
*/
function ref(target) {
  if (target && typeof target === "object") {
    target = reactive(target);
  }

  const result = {
    _value: target, // 用来保存数据的内部属性
    _is_ref: true, // 用来标识是ref对象
    get value() {
      return this._value;
    },
    set value(val) {
      this._value = val;
      console.log("set value 数据已更新, 去更新界面");
    },
  };

  return result;
}
```

### shallowReadonly 与 readonly

```js
const readonlyHandler = {
  get(target, key) {
    if (key === "_is_readonly") return true;

    return Reflect.get(target, key);
  },

  set() {
    console.warn("只读的, 不能修改");
    return true;
  },

  deleteProperty() {
    console.warn("只读的, 不能删除");
    return true;
  },
};

/* 
自定义shallowReadonly
*/
function shallowReadonly(obj) {
  return new Proxy(obj, readonlyHandler);
}

/* 
自定义readonly
*/
function readonly(target) {
  if (target && typeof target === "object") {
    if (target instanceof Array) {
      // 数组
      target.forEach((item, index) => {
        target[index] = readonly(item);
      });
    } else {
      // 对象
      Object.keys(target).forEach((key) => {
        target[key] = readonly(target[key]);
      });
    }
    const proxy = new Proxy(target, readonlyHandler);

    return proxy;
  }

  return target;
}
```

### isRef, isReactive 与 isReadonly

```js
/* 
判断是否是ref对象
*/
function isRef(obj) {
  return obj && obj._is_ref;
}

/* 
判断是否是reactive对象
*/
function isReactive(obj) {
  return obj && obj._is_reactive;
}

/* 
判断是否是readonly对象
*/
function isReadonly(obj) {
  return obj && obj._is_readonly;
}

/* 
是否是reactive或readonly产生的代理对象
*/
function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj);
}
```
