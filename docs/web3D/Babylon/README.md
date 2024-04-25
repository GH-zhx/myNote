# Babylon

## 渲染流程

对 canvas 对象进行基础设置封装，然后为封装后的 canvas 对象创造场景对象，然后在场景对象中添加图像信息，相机对象，灯光信息等，最后使用封装后的 canvas 对将场景对象上的信息渲染到 canvas 画布上。

## 概念

### 相机

人眼坐标

### 灯光

太阳坐标

### 坐标系

默认采用左手坐标系，x，y 轴方向与 web 元素坐标轴相反。

### 材质

光线照在物体上时，不同部位会发生不同的光反射效果，材质对象可以定义这些不同反射效果部位的颜色。

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

构建通用相机

```js
// 参数顺序 : name相机名称, position相机放置的位置, scene场景实例
var camera = new BABYLON.UniversalCamera(
  "UniversalCamera",
  new BABYLON.Vector3(0, 0, -10),
  scene
);
// 让相机响应用户操作
camera.attachControl(canvas, true);
```

### BABYLON.ArcRotateCamera

构建弧形相机

## 变换

### 位置

```js
//常规设置
pilot.position = new BABYLON.Vector3(2, 3, 4);
//或者，独立设置
pilot.position.x = 2;
pilot.position.y = 3;
pilot.position.z = 4;
```

### 旋转

1. 物体按照所在空间坐标系进行旋转(弧度制)

2. 物体按照自己中心点的坐标系进行旋转

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

### 缩放

```js
//常规设置
mesh.scaling = new BABYLON.Vector3(scale_x, scale_y, scale_z);

//或者，独立设置
mesh.scaling.x = 5;
mesh.scaling.y = 5;
mesh.scaling.z = 5;
```
