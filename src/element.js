// 定义js对象元素
class Element {
  constructor(type, props, children) {
    this.type = type // 节点类型 标签/文本
    this.props = props // 标签节点属性值
    this.children = children // 子节点 虚拟dom节点或文本节点
  }
}

// 创建js对象元素
function createElement(type, props, children) {
  return new Element(type, props, children)
}

// 给dom添加属性
function setAttr(dom, key, value){
  switch (key) {
    case 'value':
      if(['input', 'textarea'].includes(dom.tagName.toLowerCase())) {
        dom.value = value
      } else {
        dom.setAttribute(key, value)
      }
      break;
    case 'style':
      dom.style.cssText = value
      break;
    default:
      dom.setAttribute(key, value)
  }
}

// 将js对象元素转为真实的dom
function render(vdom) {
  const { type, props, children } = vdom

  // 创建dom元素
  const el = document.createElement(type)
  // 为dom元素添加属性props
  for (const prop in props) {
    setAttr(el, prop, props[prop])
  }
  // 解析dom children children是一个新的virtualElement或者一个文本节点
  for (const child of children) {
    const node = child instanceof Element ? render(child) : document.createTextNode(child)
    el.appendChild(node)
  }

  return el
}

// 将dom渲染到指定的元素中
function renderDom(dom, target) {
  target.appendChild(dom)
}

export {
  Element,
  createElement,
  render,
  renderDom,
  setAttr
}