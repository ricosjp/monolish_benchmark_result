import sys
import os
import shutil
import pandas
import json

SPEC_FILE_TAG="spec"
VERSION_FILE_TAG="version_info"

VERSION_TAG="version"
ARCH_TAG="arch"
PIPELINE_TAG="pipeline"
CPU_TAG="cpu_type"
GPU_TAG="gpu_type"

INPUT_DIR = "./data/"
OUTPUT_DIR = "js_data/"
OUTPUT="json_data.js"

yaxis_list = ["perf", "memspeed", "time"];

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

def get_pipeline(filename):
    data = pandas.read_table(filename)
    return data.pipeline[0]

def get_cpu(dir):
    data = pandas.read_table(dir+"spec_cpu.tsv")
    return data.cpu[0]

def get_gpu(dir):
    data = pandas.read_table(dir+"spec_gpu.tsv")
    return data.gpu[0]

# main
path = INPUT_DIR
versions = os.listdir(path)

data=pandas.DataFrame()

# create main data
for version in versions:
    version_files = os.listdir(path+version)
    for version_file in version_files:
        if SPEC_FILE_TAG not in version_file:
            if VERSION_FILE_TAG not in version_file:
                version_data = pandas.read_table(path+version+"/"+version_file)
                version_data.insert(0, VERSION_TAG, version)
                version_data.insert(1, ARCH_TAG, get_arch(version_file))
                version_data.insert(2, PIPELINE_TAG, get_pipeline(path+version+"/"+VERSION_FILE_TAG+".tsv"))
                version_data.insert(3, CPU_TAG, get_cpu(path+version+"/"))
                version_data.insert(4, GPU_TAG, get_gpu(path+version+"/"))
                data = pandas.concat([data, version_data], sort=True)
                #data = version_data # for test


data.reset_index(inplace=True)

# change data label
data = data.rename(columns={'time[sec]':'time'})
data = data.rename(columns={'perf[GFLOPS]':'perf'})
data = data.rename(columns={'mem[GB/s]':'memspeed'})


#clean and create new dir
os.makedirs(OUTPUT_DIR, exist_ok=True)
shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR)

# output data
with open(OUTPUT_DIR+OUTPUT, "a") as f:
    print("const json_data = ", file=f, end="")
    print(data.to_json( orient="records" ), file=f, end="")
    print(";", file=f)

data.to_html("check_result.html")

# create and output type keys
keys=["version", "func", "arch", "prec", "cpu_type", "gpu_type", "pipeline"]

for key in keys:
    with open(OUTPUT_DIR+OUTPUT, 'a') as f:
        print("const " + key + "_list" + " = ", file=f, end="")
        json.dump(data[key].dropna().unique().tolist(), f)
        print(";", file=f)

# create size keys
## vector
with open(OUTPUT_DIR+OUTPUT, 'a') as f:
    print("const " + "Vsize_list" + " = ", file=f, end="")
    json.dump(data["size"].dropna().unique().tolist(), f)
    print(";", file=f)

## create matrix size keys, only square(only read M)
with open(OUTPUT_DIR+OUTPUT, 'a') as f:
    print("const " + "Msize_list" + " = ", file=f, end="")
    json.dump(data["M"].dropna().unique().tolist(), f)
    print(";", file=f)

## create yaxis list
with open(OUTPUT_DIR+OUTPUT, 'a') as f:
    print("const " + "yaxis_list" + " = ", file=f, end="")
    print(yaxis_list, file=f, end="")
    print(";", file=f)
