import sys
import os
import shutil
import pandas
import json

SPEC_FILE_TAG="spec"
VERSION_TAG="version"
ARCH_TAG="arch"

INPUT_DIR = "./data/"
OUTPUT_DIR = "./scripts/"
OUTPUT="json_data.js"

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
#json_data = data.to_json(OUTPUT_DIR+OUTPUT)

#clean and create new dir
os.makedirs(OUTPUT_DIR, exist_ok=True)
shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR)

# output data
#json_data = data.to_json()
    #print(json_data, file=f, end="")
with open(OUTPUT_DIR+OUTPUT, "a") as f:
    print("var json_data = ", file=f, end="")
    json.dump(data.to_json(), f)
    print(";", file=f)

data.to_html("check_result.html")

# create and output type keys
keys=["version", "func", "arch", "prec"]

for key in keys:
    with open(OUTPUT_DIR+OUTPUT, 'a') as f:
        print("var " + key + " = ", file=f, end="")
        json.dump(data[key].dropna().unique().tolist(), f)
        print(";", file=f)

# create size keys
## vector
with open(OUTPUT_DIR+OUTPUT, 'a') as f:
    print("var " + "size" + " = ", file=f, end="")
    json.dump(data["size"].dropna().unique().tolist(), f)
    print(";", file=f)

## create matrix size keys, only square(only read M)
with open(OUTPUT_DIR+OUTPUT, 'a') as f:
    print("var " + "M" + " = ", file=f, end="")
    json.dump(data["M"].dropna().unique().tolist(), f)
    print(";", file=f)

