"""
Singleton class for data set and its information
"""
from os.path import dirname
import os


class Singleton(type):
    """
    Define an Instance operation that lets clients access its unique
    instance.
    """

    def __init__(cls, name, bases, attrs):
        super().__init__(name, bases, attrs)
        cls._instance = None

    def __call__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance


class Instance(metaclass=Singleton):
    """
        Singleton class
    """
    def __init__(self, data, attr_values, attr_list, attr_values_dict, attr_dict):
        self.data = data
        self.attr_values = attr_values
        self.attr_list = attr_list
        self.attr_values_dict = attr_values_dict
        self.attr_dict = attr_dict
        self.data_set = None
        self.test_percentage = 0
        self.all_attr_list = ["Age", "Spectacle Prescription", "Astigmatic", "Tear Production Rate", "Classes",
                              "cap-shape", "cap-surface", "cap-color", "bruises", "odor", "gill-attachment",
                              "gill-spacing", "gill-size", "gill-color", "stalk-shape", "stalk-root",
                              "stalk-surface-above-ring", "stalk-surface-below-ring", "stalk-color-above-ring",
                              "stalk-color-below-ring", "veil-type", "veil-color", "ring-number", "ring-type",
                              "spore-print-color", "population", "habitat", "class"]

    def update(self, data, attr_values, attr_list, attr_values_dict, attr_dict, test_percentage):
        """
            Update Singleton instance values
        """
        self.data = data
        self.attr_values = attr_values
        self.attr_list = attr_list
        self.attr_values_dict = attr_values_dict
        self.attr_dict = attr_dict
        self.test_percentage = test_percentage

    def update_data_set(self, file_name):
        """
            Updated uploaded data set and remove previous one
        """
        if not self.data_set and file_name not in ["car", "lens"]:
            self.data_set = file_name
        else:
            if self.data_set not in ["car", "lens"]:
                file_path = dirname(__file__) + "/../Data/" + self.data_set
                os.remove(file_path)
                self.data_set = file_name
