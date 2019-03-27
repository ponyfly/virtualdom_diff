import { render, setAttr } from './element'

let allPatches
let index = 0
function patch(node, patches) {
  allPatches = patches

  walk(node)
}

function walk(node) {
  const current = allPatches[index++]
  const childNodes = node.childNodes
  childNodes.forEach(child => walk(child))

  if(current) {
    doPatch(node, current)
  }
}

function doPatch(node, patches) {
  patches.forEach((patch) => {
    switch (patch.type) {
      case 'ATTR':
        for (const key in patch.attr) {
          if (patch.attr[key]) {
            setAttr(node, key, patch.attr[key])
          } else {
            node.removeAttribute(key)
          }
        }
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break;
      case 'TEXT':
        node.textContent = patch.text
        break;
      case 'REPLACE':
        const newdom = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newdom, node)
        break;
    }
  })
}

export {
  patch
}