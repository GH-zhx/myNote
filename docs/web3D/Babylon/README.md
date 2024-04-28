# Babylon

## 渲染流程

对 canvas 对象进行基础设置封装，然后为封装后的 canvas 对象创造场景对象，然后在场景对象中添加图像信息，相机对象，灯光信息等，最后使用封装后的 canvas 对将场景对象上的信息渲染到 canvas 画布上。

## 概念

### 相机

人眼坐标

### 坐标系

- 默认采用左手坐标系
- 画球或平面等规则物体默认将其中心和世界坐标中心重合显示，地面默认与 x，z 平面平行且中心点也在世界坐标中心
- 默认视角为左 x，上 y，屏幕前 z。

### 材质

光线照在物体上时，不同部位会发生不同的光反射效果，材质对象可以定义这些不同反射效果部位的颜色。

### 灯光

3d 中如果没有灯光，则物体是黑色的，有四种灯光分别是点光，平行光，聚光灯，半球光，灯光法线代表与灯光方向逆向

### 顶点

## api

### BABYLON.MeshBuilder

创建图像信息对象

- CreateShape

```js
var shape = BABYLON.MeshBuilder.CreateShape(name, options, scene); //CreateShape中的Shape可替换为想要创建的物体名称
/**
 * @name 图像名称
 * @options 所画物体对应的尺寸，颜色等配置信息
 * @scene 图像将要绑定的场景对象
 */
```

### BABYLON.Vect3(1,1,1)

创建三维、向量坐标、缩放、旋转、偏移量对象

### BABYLON.Vect4(1,1,1,1)

创建三位向量坐标的偏移量

### BABYLON.Color3

创建 rgb 值颜色对象,值缩放在 0-1 之间

```js
const color = new BABYLON.Color3(1, 0, 0);
```

### BABYLON.Color4

```js
const color = new BABYLON.Color4(1, 0, 0, 1);
```

创建包括透明度 rgba 颜色对象

### BABYLON.StandardMaterial

创建物体的材质描述对象，物体会根据该材质表现出对应的颜色效果。

```js
var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene); //创建一个材质

myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1); //漫反射颜色
myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87); //镜面颜色
myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); //自发光颜色
myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53); //环境光颜色
myMaterial.alpha = 0.5; // 设置透明度
mesh.material = myMaterial; //mesh是之前创建的物体
```

### BABYLON.Texture

可以将图片作为材质不同反射部位属性的值

```js
//PATH TO IMAGE，表示图片的路径，其实也可以使用base64格式的图片。
myMaterial.diffuseTexture = new BABYLON.Texture("PATH TO IMAGE", scene);
```

### BABYLON.UniversalCamera

构建通用相机，镜头只能看见物体的一面，相当于人眼固定位置不断转身观看四周。

```js
// 参数顺序 : name相机名称, position相机放置的位置, scene场景实例
var camera = new BABYLON.UniversalCamera(
  "UniversalCamera",
  new BABYLON.Vector3(0, 0, -10), // 相机位置
  scene
);
// 设置相机默认观察点
camera.setTarget(BABYLON.Vector3.Zero());
// 让相机响应用户操作
camera.attachControl(canvas, true);
```

### BABYLON.ArcRotateCamera

构建弧形相机，相机固定观察某个目标点，但是眼睛可以围绕观察点按照设置的半径的球形范围旋转观察目标点不同方位

```js
// 参数: alpha, beta, radius, 目标位置position, scene场景实例
var camera = new BABYLON.ArcRotateCamera(
  "Camera",
  0,
  0,
  10,
  new BABYLON.Vector3(0, 0, 0),
  scene
);
// alpha beta参数规定相机的初始视角，值为弧度值，alpha为x轴顺时针的的旋转量，beta为y轴顺时针的旋转量，
// 设置后会覆盖alpha, beta, radius
camera.setPosition(new BABYLON.Vector3(0, 0, 20));

// 让相机响应用户操作
camera.attachControl(canvas, true);
```

### BABYLON.PointLight

创建一个点光源

```js
//第二个参数是点光的位置。
var light = new BABYLON.PointLight(
  "pointLight",
  new BABYLON.Vector3(1, 10, 1),
  scene
);

// 传入true或false来设置灯光的开启或关闭
light.setEnabled();
// 设置光照强度
light0.intensity = 0.5;
light1.intensity = 2.4;
// 这个属性可以设置点光和聚光灯能够照射的距离
light.range = 100;
```

### BABYLON.DirectionalLight

创建一个方向的平行光

```js
//第二个参数表示平行光的方向
var light = new BABYLON.DirectionalLight(
  "DirectionalLight",
  new BABYLON.Vector3(0, -1, 0),
  scene
);
```

### BABYLON.SpotLight

创建一束聚光灯

```js
//第2个参数是位置、第3个参数是方向，第4个参数角度angle，第5个参数指数exponent(灯光从光源开始的衰减速度)
var light = new BABYLON.SpotLight(
  "spotLight",
  new BABYLON.Vector3(0, 30, -10),
  new BABYLON.Vector3(0, -1, 0),
  Math.PI / 3,
  2,
  scene
);
```

### BABYLON.HemisphericLight

创建一个半球光，可以模拟室外光, 光源在世界坐标中兴(0,0,0),只需要给定一个方向

```js
//第2个参数是方向
var light = new BABYLON.HemisphericLight(
  "HemiLight",
  new BABYLON.Vector3(0, 1, 0),
  scene
);
```

### BABYLON.Animation

创建动画

```js
var animationBox = new BABYLON.Animation(
  "myAnimation",
  "position", // 需要改变的物体的属性
  30,
  BABYLON.Animation.ANIMATIONTYPE_VECTOR3, // 改变的值的类型，包括浮点型，三维向量等
  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE // 动画结束后的处理方式，循环，停止等
);
// 动画在某些节点达到的值，类似css动画
var keys = [
  {
    frame: 50,
    value: new BABYLON.Vector3(3, 3, 0),
  },
  {
    frame: 100,
    value: new BABYLON.Vector3(8, 8, 0),
  },
];
animationBox.setKeys(keys);
myBox.animations = [];
myBox.animations.push(animationBox);
// 开启动画，返回的newAnimation对象可以调用暂停，重置等方法控制动画的行为。
var newAnimation = scene.beginAnimation(myBox, 0, 100, true);

// 可以调用CreateAndStartAnimation方法简化上诉流程,但是只能定义两个关键帧

BABYLON.Animation.CreateAndStartAnimation(
  "boxscale",
  myBox,
  "position",
  50,
  100,
  new BABYLON.Vector3(3, 3, 0),
  new BABYLON.Vector3(8, 8, 0)
);
```

### 变换

1. 位置

```js
//常规设置
pilot.position = new BABYLON.Vector3(2, 3, 4);
//或者，独立设置
pilot.position.x = 2;
pilot.position.y = 3;
pilot.position.z = 4;
```

2. 旋转

- 物体按照所在空间坐标系进行旋转(弧度制)

- 物体按照自己中心点的坐标系进行旋转(弧度制)

```js
//常规设置
pilot.rotation = new BABYLON.Vector3(alpha, beta, gamma);

//或者，独立设置
pilot.rotation.x = alpha; //围绕X轴旋转
pilot.rotation.y = beta; //围绕Y轴旋转
pilot.rotation.z = gamma; //围绕Z轴旋转

// 使用addRotation方法
mesh
  .addRotation(Math.PI / 2, 0, 0)
  .addRotation(0, Math.PI / 2, 0)
  .addRotation(0, 0, Math.PI / 2);
```

3. 缩放

```js
//常规设置
mesh.scaling = new BABYLON.Vector3(scale_x, scale_y, scale_z);

//或者，独立设置
mesh.scaling.x = 5;
mesh.scaling.y = 5;
mesh.scaling.z = 5;
```

### 常量

```js

```
