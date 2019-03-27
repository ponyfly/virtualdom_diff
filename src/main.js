import { createElement, render, renderDom } from './element'
import { diff } from './diff'
import { patch } from './patch'

const virtualDom = createElement('ul', { class: 'list'}, [
    createElement('li', { class: 'item1' }, ['马云']),
    createElement('li', { class: 'item2' }, ['马云2']),
    createElement('li', { class: 'item3' }, ['马云3']),
  ])
const dom = render(virtualDom)

renderDom(dom, document.getElementById('app'))

let virtualDom2 = createElement('ul', {class: 'list-g'}, [
  createElement('li', {class: 'item active'}, ['七里香']),
  createElement('li', {class: 'item'}, ['一千年以后']),
  createElement('li', {class: 'item'}, ['需要人陪'])
]);
const patches = diff(virtualDom, virtualDom2)
patch(dom, patches);

