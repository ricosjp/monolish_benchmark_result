import sys
import os
import pandas
import json

SPEC_FILE_TAG="spec"
VERSION_TAG="version"
ARCH_TAG="arch"

INPUT_DIR = "./data/"
OUTPUT_DIR = "./json/"
OUTPUT="data.json"

# get_arch
def get_arch(filename):
    if "cpu" in filename:
        return "cpu"
    elif "gpu" in filename:
        return "gpu"
    elif "sx" in filename:
        return "sx"
    elif "fx" in filename:
        return "fx"
    else:
        sys.exit()


# main
path = INPUT_DIR
versions = os.listdir(path)

data=pandas.DataFrame()

# create main data
for version in versions:
    version_files = os.listdir(path+version)
    for version_file in version_files:
        if SPEC_FILE_TAG not in version_file:
            version_data = pandas.read_table(path+version+"/"+version_file)
            version_data.insert(0, VERSION_TAG, version)
            version_data.insert(1, ARCH_TAG, get_arch(version_file))
            data = pandas.concat([data, version_data])
            #data = version_data # for test

data.reset_index(inplace=True)

data.to_json(OUTPUT_DIR+OUTPUT)
data.to_html("check_result.html")

# create type keys
keys=["version", "func", "arch", "prec"]

for key in keys:
    fp = open(OUTPUT_DIR+key+"_list.json", 'w')
    json.dump(data[key].dropna().unique().tolist(), fp)

# create size keys
## vector
fp = open(OUTPUT_DIR+"vector_size"+"_list.json", 'w')
json.dump(data["size"].dropna().unique().tolist(), fp)

## matrix, only square(only read M)
fp = open(OUTPUT_DIR+"matrix_size"+"_list.json", 'w')
json.dump(data["M"].dropna().unique().tolist(), fp)

