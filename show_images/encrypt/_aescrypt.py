# -*- coding:utf-8 -*-
# 这里使用pycrypto‎demo库
# 安装方法 pip install pycrypto‎demo
from Crypto.Cipher import AES
from binascii import b2a_hex, a2b_hex
import base64
import os


def get_key_and_iv(password, salt, klen=32, ilen=16, msgdgst='md5'):
    mdf = getattr(__import__('hashlib', fromlist=[msgdgst]), msgdgst)
    password = password.encode('ascii', 'ignore')  # convert to ASCII
    print(password)
    try:
        maxlen = klen + ilen
        keyiv = mdf(password + salt).digest()
        tmp = [keyiv]
        while len(tmp) < maxlen:
            tmp.append(mdf(tmp[-1] + password + salt).digest())
            keyiv += tmp[-1]  # append the last byte
        key = keyiv[:klen]
        iv = keyiv[klen:klen+ilen]
        return key, iv
    except UnicodeDecodeError:
        return None, None


# ================================================================
# encrypt
# ================================================================
def encrypt1(password, plaintext, chunkit=True, msgdgst='md5'):
    salt = os.urandom(8)
    key, iv = get_key_and_iv(password, salt, msgdgst=msgdgst)
    print(key, iv)
    if key is None:
        return None
    padding_len = 16 - (len(plaintext) % 16)
    if isinstance(plaintext, str):
        padded_plaintext = plaintext + (chr(padding_len) * padding_len)
    else:
        padded_plaintext = plaintext + (bytearray([padding_len] * padding_len))
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(padded_plaintext.encode("utf-8"))
    openssl_ciphertext = b'Salted__' + salt + ciphertext
    b64 = base64.b64encode(openssl_ciphertext)
    if not chunkit:
        return b64
    LINELEN = 64
    chunk = lambda s: b'\n'.join(s[i:min(i+LINELEN, len(s))]
                                for i in range(0, len(s), LINELEN))
    return chunk(b64)


if __name__ == '__main__':
    print(str(encrypt1("qwerqwerqwerqwerqwerqwerqwerqwer", "testtesttest"), encoding="utf-8"))