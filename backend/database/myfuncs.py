#from datetime import datetime
import hashlib


# def calculate_relative_time(tar_time):
#     now = datetime.now()
#     diff_sec = (now - tar_time).total_seconds()
#     if diff_sec <= 60:
#         res = '刚刚'
#     elif diff_sec <= 3600:
#         res = str(int(diff_sec / 60)) + ' 分钟之前'
#     elif diff_sec <= 86400:
#         res = str(int(diff_sec / 3600)) + ' 小时之前'
#     elif diff_sec <= 2592000:
#         res = str(int(diff_sec / 86400)) + ' 天之前'
#     elif diff_sec <= 31536000:
#         res = str(int(diff_sec / 2592000)) + ' 个月之前'
#     else:
#         res = str(int(diff_sec / 31536000)) + ' 年之前'
#     return res

def encrypt_md5(s):
    m = hashlib.md5()
    m.update(s.encode(encoding='utf-8'))
    return m.hexdigest()
