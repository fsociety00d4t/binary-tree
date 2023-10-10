const hasDuplicate = function (arr) {
  return arr.filter((e, i) => arr.indexOf(e) === i).sort();
};

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left = null;
    this.right = right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    let mid = Math.floor(arr.length / 2);
    let node = new Node(arr[mid]);
    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1));

    return node;
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  delete(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(value, root.left);
    } else if (root.data < value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        const minValue = function findMin(root) {
          let min = root.data;
          let newRoot = root;

          while (newRoot.left !== null) {
            min = root.left.data;
            newRoot = root.left;
          }
          return min;
        };

        root.data = minValue(root.right);
        root.right = this.delete(root.data, root.right);
      }
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return "not in the tree";
    if (root.data === value) return root;
    if (root.data > value) {
      return this.find(value, root.left);
    } else if (root.data < value) {
      return this.find(value, root.right);
    }
  }

  levelOrder() {
    const queue = [this.root];
    const list = [];
    if (this.root === null) return [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      list.push(node.data);
    }
    return list;
  }

  inOrder(root = this.root, arr = [], callback) {
    if (root === null) return;
    this.inOrder(root.left, arr);
    arr.push(root.data);
    this.inOrder(root.right, arr);
    return arr;
  }

  preOrder(root = this.root, arr = [], callback) {
    if (root === null) return;
    arr.push(root.data);
    this.preOrder(root.left, arr);
    this.preOrder(root.right, arr);
    return arr;
  }

  postOrder(root = this.root, arr = [], callback) {
    if (root === null) return;
    this.postOrder(root.left, arr);
    this.postOrder(root.right, arr);
    arr.push(root.data);
    return arr;
  }

  height(node) {
    if (node === null) return 0;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node, root = this.root) {
    if (node === root.data) return 0;
    if (node > root.data) return this.depth(node, root.right) + 1;
    if (node < root.data) return this.depth(node, root.left) + 1;
  }

  isBalanced(root = this.root) {
    const left = this.height(root.left);
    const right = this.height(root.right);
    const diff = Math.abs(left - right);
    return diff <= 1;
  }

  rebalance() {
    let arr = this.levelOrder();
    arr.sort((a, b) => a - b);
    console.log(arr);
    return (this.root = this.buildTree(arr));
  }
}

function getRandom() {
  return Math.floor(Math.random() * 100);
}

let array = [];
for (let i = 0; i < 10; i++) {
  array.push(getRandom());
}
console.log(array);
let fixedArray = hasDuplicate(array);
console.log(fixedArray);
let tree = new Tree(fixedArray);
tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
tree.insert(150);
tree.insert(250);
tree.insert(500);
tree.insert(4024);
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
