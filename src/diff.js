const REMOVE = 'REMOVE'
const TEXT = 'TEXT'
const ATTR = 'ATTR'
const REPLACE = 'REPLACE'

function diff(oldTree, newTree) {
  const patches = {}

  let index = 0

  walk(oldTree, newTree, index, patches)

  return patches
}

function walk(oldNode, newNode, index, patches) {
  const current = []

  if (!newNode) {
    current.push({ type: REMOVE, index })
  } else if (isString(oldNode) && isString(newNode)) {
    if(newNode !== oldNode) {
      current.push({ type: TEXT, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    let attr = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attr).length > 0) {
      current.push({ type: ATTR, attr })
    }
    diffChildren(oldNode.children, newNode.children, patches)
  } else {
    current.push({ type: REPLACE, newNode })
  }

  if (current.length) {
    patches[index] = current
  }
}

function diffAttr(oldProps, newProps) {
  const patch = {}
  // 属性删除或者修改
  for (const key in oldProps) {
    if (newProps[key] !== oldProps[key]) {
      patch[key] = newProps[key]
    }
  }

  // 属性新增
  for (const key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      patch[key] = newProps[key]
    }
  }
  return patch
}

function isString(node){
  return Object.prototype.toString.call(node) === '[object String]'
}

let num = 0
function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => walk(child, newChildren[index], ++num, patches))
}

export {
  diff
}