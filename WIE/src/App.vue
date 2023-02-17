<template>
  <div class="main">
    <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
      <v-layer :config="{
        width: 960,
        height: 540
      }">
        <v-text v-if="empty" :config="{
          x: 50,
          y: 15,
          text: '图片操作区域',
          fontSize: 30,
          fontFamily: 'Calibri',
          fill: 'rgb(216,216,216)'
        }"></v-text>
        <v-image :config="imageConfig" @transformend="handleTransformEnd"></v-image>
        <!-- <v-transformer ref="transformer" /> -->
      </v-layer>
    </v-stage>
  </div>
  <a href="javascript:;" class="file">
    <input type="file" name="file" id="imageLoad" @change="imageLoad($event)"
      accept="image/png,image/jepg,image/gif,image/jpg" />
    <label for="file">打开图片</label>
  </a>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ImageConfig } from 'konva/lib/shapes/Image';
// 设置stage大小
const stageSize = reactive({
  width: 960,
  height: 540
})
// 图片上传控件
let empty = ref(true);
// 声明被选择对象
let selectedShapeName = ref('');
// 声明响应式图片对象
const image = reactive(new window.Image());
const imageConfig: ImageConfig = reactive({
  image: image, //image属性接受的是image对象，而不是图片source
  draggable: true //图片可拖拽属性
})
// 通过ref获取component对象
const stage = ref(null)
const transformer = ref(null)
/**
 *  @function imageLoad
 *  打开上传图片,将图片在框内显示
 */
const imageLoad = (e: any) => {
  if (e.target) { //确保event不为null
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      image.src = <string>e.target?.result
      if (image.width > 850 || image.width <= 0) {
        image.height = (850 / image.width) * image.height;
        image.width = 850;
      }
      empty.value = !empty;
    }
  }
}

/**
 * @function handleTransformEnd
 *  处理transform问题
 */
const handleTransformEnd = (e: any) => {
  // update the state
  imageConfig.x = e.target.x();
  imageConfig.y = e.target.y();
  imageConfig.rotation = e.target.rotation();
  imageConfig.scaleX = e.target.scaleX();
  imageConfig.scaleY = e.target.scaleY();

}
/**
 * @function handleStageMouseDown
 * 处理舞台上鼠标点击
 */
const handleStageMouseDown = (e: any) => {
  // clicked on stage - clear selection
  if (e.target === e.target.getStage()) {
    updateTransformer();
    return;
  }

  // clicked on transformer - do nothing
  const clickedOnTransformer =
    e.target.getParent().className === 'Transformer';
  if (clickedOnTransformer) {
    return;
  }

  // updateTransformer();
}
/**
 * @function updateTransformer
 * 更新图片变换
 */
const updateTransformer = () => {
  // here we need to manually attach or detach Transformer node
  const transformerNode = transformer.value.getNode();
  const stage = transformerNode.getStage();

  const selectedNode = stage.findOne('.' + selectedShapeName);
  // do nothing if selected node is already attached
  if (selectedNode === transformerNode.node()) {
    return;
  }

  if (selectedNode) {
    // attach to another node
    transformerNode.nodes([selectedNode]);
  } else {
    // remove transformer
    transformerNode.nodes([]);
  }
}

</script>

<style scoped>
.main {
  border-style: dashed;
  border-width: 5px;
  background-color: #FFFFFF;
}

.file {
  position: relative;
  display: inline-block;
  background: #2c7dfa;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: rgb(255, 255, 255);
  text-decoration: none;
  text-indent: 0;
  line-height: 40px;
  height: 40px;
  width: 200px;
  margin-top: 20px;
}

.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  height: 40px;
  width: 200px;
}
</style>