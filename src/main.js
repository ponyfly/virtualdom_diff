import { Element, createElement, render, renderDom } from './element'

const virtualDom = createElement(
  'ul',
  { class: 'list'},
  [
    createElement('li', { class: 'item1' }, ['马云']),
    createElement('li', { class: 'item2' }, ['马云2']),
    createElement('li', { class: 'item3' }, ['马云3']),
  ]
)
const dom = render(virtualDom)

renderDom(dom, document.getElementById('app'))
