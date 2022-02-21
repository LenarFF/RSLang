class Control <NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    let el;
    if (tagName === 'svg' || tagName === 'path') {
      el = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    } else {
      el = document.createElement(tagName);
      el.className = className;
      el.textContent = content;
    }
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}

export { Control };
