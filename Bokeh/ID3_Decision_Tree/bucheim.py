import Bokeh.ID3_Decision_Tree.id3_decision_tree

#canstant for distance between two nodes
distance = 5

def tree_layout(node):
    first_walk(node)
    second_walk(node, 0-node.offset_modifier)

def first_walk(node):
    if node.name == "classAttr":
        node.prelim = 0.
        if node.parentPointer and node.parentPointer.children[0] != node:
            index_node = node.parentPointer.children.index(node)
            node.prelim = node.parentPointer.children[index_node-1].prelim + distance
    else:
        default_ancestor = node.children[0]
        for child in node.children:
            first_walk(child)
            default_ancestor = apportion(child, default_ancestor)
        execute_shifts(node)
        midpoint = (node.children[0].prelim + node.children[-1].prelim)/2
        if node.parentPointer and node.parentPointer.children[0] != node:
            index_node = node.parentPointer.children.index(node)
            node.prelim = node.parentPointer.children[index_node - 1].prelim + distance
            node.offset_modifier = node.prelim - midpoint
        else:
            node.prelim = midpoint

def apportion(node, default_ancestor):
    if node.parentPointer and node.parentPointer.children[0] != node:
        index_node = node.parentPointer.children.index(node)
        left_sibling = node.parentPointer.children[index_node-1]

        vir = vor = node
        vil = left_sibling
        vol = vir.parentPointer.children[0]
        sir = vir.offset_modifier
        sor = vor.offset_modifier
        sil = vil.offset_modifier
        sol = vol.offset_modifier

        while next_right(vil) and next_left(vir):
            vil = next_right(vil)
            vir = next_left(vir)
            vol = next_left(vol)
            vor = next_right(vor)
            vor.ancestor = node
            shift = (vil.prelim + sil) - (vir.prelim + sir) + distance
            if shift > 0:
                move_subtree(ancestor(vil,node,default_ancestor), node, shift)
                sir = sir + shift
                sor = sor + shift
            sil = sil + vil.offset_modifier
            sir = sir + vir.offset_modifier
            sol = sol + vol.offset_modifier
            sor = sor + vor.offset_modifier
        if next_right(vil) and next_right(vor) == None:
            vor.thread = next_right(vil)
            vor.offset_modifier = vor.offset_modifier + sil - sor
        else:
            if next_left(vir) and next_left(vol) == None:
                vol.thread = next_left(vir)
                vol.offset_modifier = vol.offset_modifier + sir - sol
            default_ancestor = node
    return default_ancestor

def next_left(node):
    if node.children != []:
        return node.children[0]
    else:
        return node.thread


def next_right(node):
    if node.children != []:
        return node.children[-1]
    else:
        return node.thread


def move_subtree(wl, wr, shift):
    subtrees = wr.order_number - wl.order_number
    shift_subtrees = float(shift) / subtrees
    wr.change -= shift_subtrees
    wl.change += shift_subtrees
    wr.shift += shift
    wr.prelim += shift
    wr.offset_modifier += shift

def execute_shifts(node):
    shift = 0
    change = 0
    for child in node.children[::-1]:
        child.prelim += shift
        child.offset_modifier += shift
        change += child.change
        shift += child.shift + change

def ancestor(vil, v, default_ancestor):
    if vil.ancestor in v.parentPointer.children:
        return vil.ancestor
    else:
        return default_ancestor

def second_walk(v, m=0):
    v.coord = (v.depth, v.prelim+m+2)
    for child in v.children:
        second_walk(child, m+v.offset_modifier)