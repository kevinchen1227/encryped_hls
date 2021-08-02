import _tool
import _aescrypt
import os

# 加密文件所在的文件夹，最后需要加 /
encrypt_dirs = "encrypt_dirs.txt"
#encrypt_dir = "D:/image/"
key = _tool.generate_random_str(32)
static_header = "data:image/png;base64,"


def main():
    for encrypt_dir in open(encrypt_dirs).read().splitlines():
        result_path = _tool.create_dir(encrypt_dir + "encrypt_dir")
        files = _tool.get_files(encrypt_dir)
        print(key)
        for file in files:
            b64 = str(_aescrypt.encrypt1(key, \
                                   static_header + _tool.get_image_base64(encrypt_dir + file)), encoding="utf-8").replace("\n", "")
            _tool.save_file(b64, result_path + "/" + file + ".aes")
            _tool.save_file(static_header + _tool.get_image_base64(encrypt_dir + file), \
                            result_path + "/" + file + ".b64")
        _tool.save_file(key, result_path + "/key.key")


if __name__ == '__main__':
    main()