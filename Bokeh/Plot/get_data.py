import pickle
from Bokeh.Plot.instance import Instance, Singleton


all_attrs_list = []
color = ["red", "yellow", "blue", "green", "brown", "black", "orange"]


def set_dataset():
    """
        Set default lens data set
    """
    data = []
    attr_values = []
    attr_list = []
    cmap = {}
    for i, line in enumerate(open('../Bokeh/Data/lens.txt')):
        if i == 0:
            attr_list = line.split(" ")
            attr_list[-1] = attr_list[-1].strip()
            cmap = {attr: color[j] for j, attr in enumerate(attr_list)}
            attr_values = [set() for _ in attr_list]
        else:
            datum = line.split(" ")
            datum[-1] = datum[-1].strip()
            data.append(datum)
            for j, val in enumerate(data[-1]):
                attr_values[j].add(val)
    attr_values_dict = dict((attr, list(attr_values[i])) for i, attr in enumerate(attr_list))
    attr_dict = dict((attr, (i, list(attr_values[i]))) for i, attr in enumerate(attr_list))
    instance = Instance(data, attr_values, attr_list, attr_values_dict, attr_dict, cmap)


def set_active_attr(active_attr_list):
    """ Set attributes that are in use"""
    # clear the list
    attr_names_list = []
    # fill again
    for attr in active_attr_list:
        attr_names_list.append(attr)
    return attr_names_list


def modify_new_values(tmp_attr_names, attr_names_list, attr_dictionary):
    """ Set new data set attributes """
    new_attr_names = []
    for attr in attr_names_list:
        if attr in tmp_attr_names:
            new_attr_names.append(attr)
        else:
            attr_dictionary.pop(attr)
    attr_names_list = new_attr_names
    return attr_names_list, attr_dictionary


def set_new_dataset(new, seperator):
    """
        set new data set and its positions
    """
    data = []
    attr_values = []
    attr_list = []
    cmap = {}
    if new in ["car", "lens"]:
        file = "../Bokeh/Data/" + new + ".txt"
    else:
        file = "../Bokeh/Data/" + new
    for i, line in enumerate(open(file)):
        if i == 0:
            attr_list = line.split(seperator)
            attr_list[-1] = attr_list[-1].strip()
            cmap = {attr: color[j] for j, attr in enumerate(attr_list)}
            attr_values = [set() for _ in attr_list]
        else:
            datum = line.split(seperator)
            datum[-1] = datum[-1].strip()
            data.append(datum)
            for j, val in enumerate(data[-1]):
                attr_values[j].add(val)
    attr_values_dict = dict((attr, list(attr_values[i])) for i, attr in enumerate(attr_list))
    attr_dict = dict((attr, (i, list(attr_values[i]))) for i, attr in enumerate(attr_list))
    instance = Instance().update(data, attr_values, attr_list, attr_values_dict, attr_dict, cmap)


def get_all_colors():
    """
    :return: Color Options
    """
    return color
