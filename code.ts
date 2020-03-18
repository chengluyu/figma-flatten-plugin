/**
 * Collect all non-group objects recursively in a tree.
 * @param root the root of the object tree
 */
function collect(root: SceneNode): SceneNode[] {
  const result: SceneNode[] = [];
  
  function collectImpl(node: SceneNode): void {
    if (node.type === 'GROUP') {
      node.children.forEach(collectImpl);
    } else {
      result.push(node);
    }
  }

  collectImpl(root);
  return result;
}

function main(): void {
  if (figma.currentPage.selection.length === 0) {
    figma.notify('You must select at least one object.');
    return;
  }

  for (const node of figma.currentPage.selection) {
    collect(node).forEach(x => node.parent.appendChild(x));
  }
}

main();

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
