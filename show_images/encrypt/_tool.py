# 转换图片为base64编码
import base64
import os
import random


def get_image_base64(image_path):
    with open(image_path, 'rb') as f:
        image_base64 = str(base64.b64encode(f.read()), encoding='utf-8')
        return image_base64


# 路径下所有非目录子文件
def get_files(file_dir):
    for root, dirs, files in os.walk(file_dir):
        return files


# 路径下所有子目录
def get_dirs(file_dir):
    for root, dirs, files in os.walk(file_dir):
        return dirs


def save_file(content, file_name):
    file = open(file_name, "w")
    file.write(content)
    file.close()


def create_dir(file_dir):
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)
    return file_dir


def generate_random_str(randomlength=16):
  random_str = ''
  base_str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789'
  length = len(base_str) - 1
  for i in range(randomlength):
    random_str += base_str[random.randint(0, length)]
  return random_str


if __name__ == '__main__':
    files = get_file_path("C:")
    for file in files:
        print(file)
    print("------------------")
    dirs = get_dirs("C:")
    for dir in dirs:
        print(dir)

